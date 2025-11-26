import { AsyncPipe } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.css'
})
export class TaskPageComponent {
  
  tasks$!: ReturnType<TaskService['getTasks']>;

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.tasks$;
  }

  onAddTask(title: string, description: string) {
    if (title.trim() && description.trim()) {
      this.taskService.addTask({ title, description });
    }
  }
}
