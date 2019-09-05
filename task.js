class Task {
  constuctor(content, id) {
    this.content = content;
    this.id = id || Date.now();
  }
}
