class Task {
  constructor(content) {
    this.content = content;
    this.id = Date.now() + this.content;
  }
}
