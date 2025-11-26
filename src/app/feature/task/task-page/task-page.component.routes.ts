import { Routes } from '@angular/router';
import { TaskPageComponent } from './task-page.component';

export const TASK_ROUTES: Routes = [
  {
    path: '',
    component: TaskPageComponent
    // Vous pourrez ajouter des routes enfants ici plus tard :
    // children: [
    //   { path: 'create', component: CreateTaskComponent },
    //   { path: ':id', component: TaskDetailComponent }
    // ]
  }
];