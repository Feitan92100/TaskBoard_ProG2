import { AsyncPipe } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  tasks$!: ReturnType<TaskService['getTasks']>;
  counter: number = 0;
  private intervalId: any;

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.tasks$;
  }

  onAddTask(title: string, description: string) {
  if (title.trim() && description.trim()) {
    this.taskService.addTask({ title, description });
  }
}

  ngOnInit() {
    console.log('HomeComponent initialized');
    this.intervalId = setInterval(() => {
      this.counter++;
    }, 500);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}