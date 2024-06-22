import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() update = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<number>();

  editMode = false;
  editedTitle = '';

  toggleCompleted(): void {
    this.task.completed = !this.task.completed;
    this.update.emit(this.task);
  }

  enterEditMode(): void {
    this.editMode = true;
    this.editedTitle = this.task.title;
  }

  saveEdit(): void {
    if (this.editedTitle.trim()) {
      this.task.title = this.editedTitle;
      this.update.emit(this.task);
      this.editMode = false;
    }
  }

  cancelEdit(): void {
    this.editMode = false;
  }

  deleteTask(): void {
    this.delete.emit(this.task.id);
  }
}
