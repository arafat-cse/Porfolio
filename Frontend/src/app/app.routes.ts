import { Routes } from '@angular/router';
import { PublicPageComponent } from './component/ui/public-page/public-page.component';
import { BlogDetailComponent } from './component/ui/blog-detail/blog-detail.component';

export const routes: Routes = [
  { path: '', component: PublicPageComponent },
  { path: 'blog/:id', component: BlogDetailComponent },
  { path: '**', redirectTo: '' }
];
