import { Routes } from '@angular/router';
import { PublicPageComponent } from './component/ui/public-page/public-page.component';
import { BlogDetailComponent } from './component/ui/blog-detail/blog-detail.component';
import { CrmLoginComponent } from './component/crm/login/crm-login.component';
import { CrmLayoutComponent } from './component/crm/layout/crm-layout.component';
import { DashboardOverviewComponent } from './component/crm/dashboard-overview/dashboard-overview.component';
import { HeroFormComponent } from './component/crm/hero-form/hero-form.component';
import { AboutFormComponent } from './component/crm/about-form/about-form.component';
import { PortfolioFormComponent } from './component/crm/portfolio-form/portfolio-form.component';
import { BlogFormComponent } from './component/crm/blog-form/blog-form.component';
import { HobbiesFormComponent } from './component/crm/hobbies-form/hobbies-form.component';
import { TestimonialsFormComponent } from './component/crm/testimonials-form/testimonials-form.component';
import { ContactFormComponent } from './component/crm/contact-form/contact-form.component';
import { CategoriesComponent } from './component/crm/categories/categories.component';
import { crmAuthGuard } from './services/auth-service/crm-auth.guard';

export const routes: Routes = [
  { path: '', component: PublicPageComponent },
  { path: 'blog/:id', component: BlogDetailComponent },
  { path: 'crm', component: CrmLoginComponent },
  {
    path: 'crm/dashboard',
    component: CrmLayoutComponent,
    canActivate: [crmAuthGuard],
    children: [
      { path: '', component: DashboardOverviewComponent },
      { path: 'hero', component: HeroFormComponent },
      { path: 'about', component: AboutFormComponent },
      { path: 'portfolio', component: PortfolioFormComponent },
      { path: 'hobbies', component: HobbiesFormComponent },
      { path: 'blog', component: BlogFormComponent },
      { path: 'testimonials', component: TestimonialsFormComponent },
      { path: 'contact', component: ContactFormComponent },
      { path: 'categories', component: CategoriesComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
