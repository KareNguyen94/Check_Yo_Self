class ToDoList {
  constructor(title, tasksArr, id, urgent) {
    this.title = title;
    this.tasksArr = tasksArr || [];
    this.id = id || Date.now();
    this.urgent = urgent || false;
  }
  makeTaskHtml() {
    var taskHtml = "";
    for (var i = 0; i < this.tasksArr.length; i++) {
      taskHtml += `
      <div class="form-taskcard-div">
        <img class="form-taskcard-checkimg" src="assets/checkbox.svg" alt="empty checkbox circle" />
        <p class="form-taskcard-firsttodo">${this.tasksArr[i]}<p>
      </div>`;
    }
    return taskHtml;
  }
}

// module.exports = ToDoList;
