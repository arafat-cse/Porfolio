import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';

@Component({
  selector: 'app-rich-text-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, AngularEditorModule],
  template: `
    <angular-editor
      [(ngModel)]="value"
      [placeholder]="placeholder"
      [config]="editorConfig"
      [disabled]="disabled"
      (ngModelChange)="handleChange($event)"
      (blur)="onTouched()"
    ></angular-editor>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      angular-editor ::ng-deep .angular-editor-toolbar {
        border-radius: 0.75rem 0.75rem 0 0;
      }
      angular-editor ::ng-deep .angular-editor-textarea {
        min-height: 280px;
        border-radius: 0 0 0.75rem 0.75rem;
      }
    `
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RichTextEditorComponent),
      multi: true
    }
  ]
})
export class RichTextEditorComponent implements ControlValueAccessor {
  @Input() placeholder = 'Start writing...';

  value = '';
  disabled = false;

  readonly editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '350px',
    minHeight: '250px',
    enableToolbar: true,
    showToolbar: true,
    toolbarHiddenButtons: [['insertImage', 'insertVideo']],
    defaultFontName: 'Inter',
    placeholder: this.placeholder
  };

  private onChange: (value: string) => void = () => {};
  private onTouchedCallback: () => void = () => {};

  writeValue(val: string | null): void {
    this.value = val || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleChange(value: string): void {
    this.value = value;
    this.onChange(value);
  }

  onTouched(): void {
    this.onTouchedCallback();
  }
}
