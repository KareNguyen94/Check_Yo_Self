class ToDoList {
  constructor(title, tasksArr, id, urgent) {
    this.title = title;
    this.tasksArr = tasksArr || [];
    this.id = id || Date.now();
    this.urgent = urgent || false;
  }

  updateToDo() {
    this.urgent = !this.urgent;
  }
}

// there is no way for a user to pass through
// urgent as an argument so should we remove that?
// and just build it as a hard coded parameter?
