import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonService } from '../../../services/common-service';
import { map, Observable } from 'rxjs';

interface CrmCategory {
  id: number;
  name: string;
  type: string;
  slug?: string;
  prefix?: string;
}

interface ODataCollection<T> {
  value: T;
}

@Component({
  selector: 'app-crm-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  readonly types = ['HOBBIES', 'PORTFOLIO', 'SERVICES', 'BLOG'];
  readonly filters = ['ALL', ...this.types];

  modalOpen = false;
  loading = false;
  selectedType = 'ALL';

  categoriesByType: Record<string, CrmCategory[]> = {};

  readonly categoryForm = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required]
  });

  constructor(private readonly fb: FormBuilder, private readonly commonService: CommonService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  get filteredCategories(): CrmCategory[] {
    if (this.selectedType === 'ALL') {
      return Object.values(this.categoriesByType).flat();
    }
    return this.categoriesByType[this.selectedType] ?? [];
  }

  setFilter(filter: string): void {
    if (this.selectedType === filter) {
      return;
    }
    this.selectedType = filter;
    this.loadCategories(filter);
  }

  toggleModal(): void {
    this.modalOpen = !this.modalOpen;
    if (!this.modalOpen) {
      this.categoryForm.reset();
    }
  }

  submit(): void {
    if (this.categoryForm.invalid || this.loading) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    const payload = {
      name: this.categoryForm.value.name ?? '',
      type: (this.categoryForm.value.type ?? '').toUpperCase()
    };

    this.loading = true;
    this.createCategory(payload).subscribe({
      next: (category) => {
        this.mergeCategory(category);
        this.loading = false;
        this.toggleModal();
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  remove(category: CrmCategory): void {
    this.deleteCategory(category.id).subscribe(() => {
      const key = category.type.toUpperCase();
      this.categoriesByType[key] = (this.categoriesByType[key] || []).filter((item) => item.id !== category.id);
    });
  }

  private loadCategories(filter: string = 'ALL'): void {
    this.loading = true;
    const type = filter === 'ALL' ? undefined : filter;

    this.fetchCategories(type).subscribe({
      next: (list) => {
        if (type) {
          this.categoriesByType[type] = list;
        } else {
          this.categoriesByType = list.reduce<Record<string, CrmCategory[]>>((acc, item) => {
            const key = item.type.toUpperCase();
            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(item);
            return acc;
          }, {});
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  private fetchCategories(type?: string): Observable<CrmCategory[]> {
    const params: string[] = ['$orderby=created_at desc'];
    if (type && type !== 'ALL') {
      params.push(`$filter=type eq '${type}'`);
    }
    const query = `Catagories${params.length ? `?${params.join('&')}` : ''}`;
    return this.commonService.get<ODataCollection<CrmCategory[]>>(query, true).pipe(map((res) => res.value || []));
  }

  private createCategory(body: { name: string; type: string }): Observable<CrmCategory> {
    return this.commonService.post<CrmCategory>('Catagories', body, true);
  }

  private deleteCategory(id: number): Observable<void> {
    return this.commonService.delete<void>(`Catagories(${id})`, null, true);
  }

  private mergeCategory(category: CrmCategory): void {
    const key = category.type.toUpperCase();
    if (!this.categoriesByType[key]) {
      this.categoriesByType[key] = [];
    }
    this.categoriesByType[key] = [category, ...this.categoriesByType[key]];
  }
}
