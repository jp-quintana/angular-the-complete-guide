import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');

  // following code only creates instance within this single class (NewTaskComponent) and is not shared with other components
  // private tasksService: TasksService;
  // constructor() {
  //   this.tasksService = new TasksService();
  // }

  // correct alternative
  // private tasksService: TasksService;
  // constructor(tService: TasksService) {
  //   this.tasksService = tService;
  // }

  // shorter alternative
  // constructor(private tasksService: TasksService) {}

  // inject alternative
  tasksService = inject(TasksService);

  onAddTask(title: string, description: string) {
    this.tasksService.addTask({ title, description });
    this.formEl()?.nativeElement.reset();
  }
}
