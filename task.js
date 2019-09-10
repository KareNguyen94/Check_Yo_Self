class Task {
  constructor(content, id) {
    this.content = content;
    this.complete = false;
    this.id = "task-" + id.toString();
  }
  updateTask() {
  this.complete = !this.complete;
  }
}
