class ToDoList {
  constructor(title, tasksArr, id, urgent) {
    this.title = title;
    this.tasksArr = tasksArr || [];
    this.id = id || Date.now();
    this.urgent = urgent || false;
  }

  updateToDo() {
    // update this.urgent to true
  }

}

// module.exports = ToDoList;
