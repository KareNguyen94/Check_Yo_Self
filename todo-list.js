class ToDoList {
  constructor(title, tasksArr, id, urgent) {
    this.title = title;
    this.tasksArr = tasksArr || [];
    this.id = id || Date.now();
    this.urgent = urgent || false;
  }

  updateToDo() {
    this.urgent = !this.urgent;
    // update this.urgent to true
  }

}

// module.exports = ToDoList;

// there is no way for a user to pass through
// urgent as an argument so shoudl we remove that?
// and just build it as a hard coded parameter?
