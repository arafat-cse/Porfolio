import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from '@services/common-service';
import { forkJoin, of, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

interface AboutRecord {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  skills?: string[];
  stats?: Stat[];
}

interface ExperienceRecord {
  startDate?: string;
  endDate?: string;
  position?: string;
  company?: string;
  description?: string;
  skills?: string[];
}

interface Stat {
  value: string;
  label: string;
}

type StatIcon = 'code' | 'coffee' | 'award' | 'calendar';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.scss'
})
export class AboutSectionComponent implements OnInit, OnDestroy {
  readonly fallbackImage =
    'https://images.unsplash.com/photo-1675277714353-376f525d935a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGRldmVsb3BlcnxlbnwxfHx8fDE3NTU3NTE4NzB8MA&ixlib=rb-4.1.0&q=80&w=1080';

  readonly fallbackAbout: Required<Pick<AboutRecord, 'title' | 'subtitle' | 'description'>> = {
    title: 'About Me',
    subtitle: "I'm passionate about creating digital experiences that combine beautiful design with powerful functionality.",
    description: `With over 6 years of experience in web development, I specialize in creating modern, responsive applications that provide exceptional user experiences. My journey started with a curiosity about how websites work, and it has evolved into a passion for building digital solutions that make a real impact.

I love working with the latest technologies and frameworks, always staying up-to-date with industry trends and best practices. When I'm not coding, you can find me contributing to open-source projects, writing technical blog posts, or exploring new design trends.`
  };

  readonly fallbackTimeline: ExperienceRecord[] = [
    {
      startDate: '2024-01-01',
      endDate: '',
      position: 'Senior Developer',
      company: 'Tech Company',
      description: 'Leading frontend development and mentoring junior developers',
      skills: ['React', 'TypeScript', 'Node.js']
    },
    {
      startDate: '2022-01-01',
      endDate: '2023-12-31',
      position: 'Full Stack Developer',
      company: 'Startup Inc',
      description: 'Built scalable web applications using React and Node.js',
      skills: ['React', 'Node.js', 'Express']
    },
    {
      startDate: '2020-01-01',
      endDate: '2021-12-31',
      position: 'Frontend Developer',
      company: 'Creative Agency',
      description: 'Created engaging user interfaces and responsive designs',
      skills: ['HTML', 'CSS', 'JavaScript']
    },
    {
      startDate: '2018-01-01',
      endDate: '2019-12-31',
      position: 'Junior Developer',
      company: 'First Job',
      description: 'Started my journey in web development',
      skills: ['HTML', 'CSS']
    }
  ];

  readonly fallbackStats: Stat[] = [
    { label: 'Projects Completed', value: '50+' },
    { label: 'Cups of Coffee', value: '1000+' },
    { label: 'Awards Won', value: '5' },
    { label: 'Years Experience', value: '6+' }
  ];

  readonly statIconSet: StatIcon[] = ['code', 'coffee', 'award', 'calendar'];

  about: AboutRecord | null = null;
  timeline: ExperienceRecord[] = [];
  stats: Stat[] = [];
  isLoading = true;

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly commonService: CommonService) {}

  ngOnInit(): void {
    this.loadAboutData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get portraitSrc(): string {
    return (this.about?.image && this.about.image.trim()) || this.fallbackImage;
  }

  get sectionTitle(): string {
    return (this.about?.title?.trim() || this.fallbackAbout.title).trim();
  }

  get subtitle(): string {
    return (this.about?.subtitle?.trim() || this.fallbackAbout.subtitle).trim();
  }

  get descriptionParagraphs(): string[] {
    const text = (this.about?.description || this.fallbackAbout.description).trim();
    return text.split(/\n+/).map((paragraph) => paragraph.trim()).filter(Boolean);
  }

  get timelineToRender(): ExperienceRecord[] {
    return this.timeline.length ? this.timeline : this.fallbackTimeline;
  }

  get skillsToRender(): string[] {
    if (this.about?.skills?.length) {
      return this.about.skills;
    }

    const derived = this.timelineToRender.flatMap((experience) => experience.skills ?? []);
    return Array.from(new Set(derived)).slice(0, 12);
  }

  get statsToRender(): Stat[] {
    if (this.stats.length) {
      return this.stats;
    }

    return this.fallbackStats;
  }

  formatDateRange(experience: ExperienceRecord): string {
    const formatPart = (value?: string, fallback = 'N/A') => {
      if (!value) {
        return fallback;
      }

      const parsed = new Date(value);
      if (!Number.isNaN(parsed.valueOf())) {
        return parsed.getFullYear().toString();
      }

      const numericValue = Number(value);
      if (!Number.isNaN(numericValue)) {
        return numericValue.toString();
      }

      return value;
    };

    const startLabel = formatPart(experience.startDate);
    const endLabel = formatPart(experience.endDate, 'Present');

    if (startLabel === 'N/A' && endLabel === 'Present') {
      return 'Present';
    }

    return `${startLabel} - ${endLabel}`;
  }

  handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement | null;
    if (target && target.src !== this.fallbackImage) {
      target.src = this.fallbackImage;
    }
  }

  private loadAboutData(): void {
    this.isLoading = true;

    forkJoin({
      aboutResponse: this.commonService
        .get('Abouts?$expand=media&$orderby=created_at desc&$top=1', true)
        .pipe(catchError(() => of(null))),
      experienceResponse: this.commonService
        .get('Experiences?$orderby=start_date desc', true)
        .pipe(catchError(() => of(null)))
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ aboutResponse, experienceResponse }) => {
          const aboutItems = this.extractCollection(aboutResponse);
          this.about = aboutItems.length ? this.mapApiAbout(aboutItems[0]) : null;

          const experienceItems = this.extractCollection(experienceResponse)
            .map((item) => this.mapApiExperience(item))
            .sort((a, b) => (b.startDate || '').localeCompare(a.startDate || ''));

          this.timeline = experienceItems;
          const aboutStats = this.about?.stats?.filter((stat) => stat.label && stat.value) ?? [];
          this.stats = aboutStats.length ? aboutStats : [];
        },
        error: (error) => {
          console.error('Failed to load about section data:', error);
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  private extractCollection(response: unknown): any[] {
    if (Array.isArray((response as any)?.value)) {
      return (response as any).value;
    }

    if (Array.isArray((response as any)?.data?.value)) {
      return (response as any).data.value;
    }

    if (Array.isArray(response)) {
      return response;
    }

    return [];
  }

  private mapApiAbout(record: any): AboutRecord {
    const stats = Array.isArray(record?.stats)
      ? record.stats
          .map((stat: any) => ({
            label: stat?.label ?? stat?.Label ?? '',
            value: stat?.value ?? stat?.Value ?? ''
          }))
          .filter((stat: Stat) => stat.label && stat.value)
      : [];

    const skills = this.normalizeStringArray(record?.skills ?? record?.Skills);

    const mediaItems: any[] = record?.media ?? record?.Media ?? [];
    const mediaUrl = mediaItems.length ? mediaItems[0]?.url ?? mediaItems[0]?.src ?? mediaItems[0]?.image : undefined;

    return {
      title: record?.title ?? record?.Title,
      subtitle: record?.subtitle ?? record?.sub_title ?? record?.Subtitle,
      description: record?.description ?? record?.Description ?? '',
      image: record?.image ?? mediaUrl,
      skills,
      stats
    };
  }

  private mapApiExperience(record: any): ExperienceRecord {
    return {
      startDate: record?.start_date ?? record?.startDate,
      endDate: record?.end_date ?? record?.endDate,
      position: record?.position ?? record?.title ?? record?.role,
      company: record?.company ?? record?.organization,
      description: record?.description ?? record?.details ?? '',
      skills: this.normalizeStringArray(record?.skills ?? record?.Skills)
    };
  }

  private normalizeStringArray(value: unknown): string[] {
    if (Array.isArray(value)) {
      return value.map((item) => `${item}`.trim()).filter(Boolean);
    }

    if (typeof value === 'string') {
      return value
        .split(/,|\n/)
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [];
  }
}
