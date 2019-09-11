class Task {
  constructor(content, id, complete) {
    this.content = content;
    this.complete = complete || false;
    this.id = "task-" + id.toString();
  }
  updateTask() {
  this.complete = !this.complete;
  }
}
