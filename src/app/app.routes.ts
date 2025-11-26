import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { 
    path: 'about', 
    loadChildren: () => import('./feature/about/about-page/about-page.component.routes').then(m => m.ABOUT_ROUTES)
  },
  { 
    path: 'task', 
    loadChildren: () => import('./feature/task/task-page/task-page.component.routes').then(m => m.TASK_ROUTES)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];