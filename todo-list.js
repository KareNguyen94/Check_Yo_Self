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
  saveToStorage() {
    var globalArrToString = JSON.stringify(toDoListInstArr);
    localStorage.setItem("toDoListObj", globalArrToString);
  }
  deleteFromStorage() {

  }
}
