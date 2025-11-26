import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class TaskService {
  private tasks = [
    { id: 1, title: 'Task 1', description: 'Description for Task 1' },
    { id: 2, title: 'Task 2', description: 'Description for Task 2' },
    { id: 3, title: 'Task 3', description: 'Description for Task 3' }
  ];

  getTasks() {
    return of(this.tasks).pipe(delay(1000)); 
  }

  private taskSubject = new BehaviorSubject(this.tasks);
  tasks$ = this.taskSubject.asObservable();
  
  addTask(task: { title: string; description: string }) {
    const newTask = { id: Date.now(), title: task.title, description: task.description };
    this.tasks = [...this.tasks, newTask];
    this.taskSubject.next(this.tasks);
  }
}
