var taskItemInput = document.getElementById("aside-task-item-input-js");
var addTaskButton = document.getElementById("aside-plus-button-js");
var taskItemParent = document.getElementById("aside-section-task-items-js");
var taskTitleInput = document.getElementById("aside-task-title-input-js");
var makeTaskListButton = document.getElementById("make-task-button");
var clearAllButton = document.getElementById("clear-all-button-js");
var formField = document.getElementById("aside-task-form-js");
var cardCount = 0;
var taskCardParent1 = document.getElementById("taskcard-parent1");
var taskCardParent2 = document.getElementById("taskcard-parent2");
var toDoListInstArr = [];
var toDoCardSectionParent = document.getElementById("main-taskcard-parent")

addTaskButton.addEventListener("click", clickAddTaskButton);
makeTaskListButton.addEventListener("click", clickMakeTaskButton);
clearAllButton.addEventListener("click", clickClearAllButton);
taskItemParent.addEventListener("click", removeTaskItem);
taskItemInput.addEventListener("keyup", togglePlusButton);
taskTitleInput.addEventListener("keyup", disableButtons);
toDoCardSectionParent.addEventListener("click", styleUrgentToDoList);

function editUrgentProperty(event) {
  var toDoListId = event.target.parentNode.parentNode.parentNode.parentNode.id;
  for (var i = 0; i < toDoListInstArr.length; i++) {
    if (toDoListInstArr[i].id === parseInt(toDoListId)) {
        toDoListInstArr[i].updateToDo();
        return toDoListInstArr[i];
      }
  }
}

function styleUrgentToDoList(event) {
  if (event.target.classList.contains("urgent-img")) {
  var object = editUrgentProperty(event);
  if (object.urgent === true) {
      event.target.src = "assets/urgent-active.svg";
      event.target.alt = "urgent lightning bolt icon";
      event.target.parentNode.parentNode.parentNode.classList.add("urgent-card");
      event.target.parentNode.classList.add("urgent-text");
      event.target.parentNode.parentNode.previousElementSibling.classList.add("urgent-border");
    } else {
      event.target.src = "assets/urgent.svg";
      event.target.alt = "non-urgent lightning bolt icon";
      event.target.parentNode.parentNode.parentNode.classList.remove("urgent-card");
      event.target.parentNode.classList.remove("urgent-text");
      event.target.parentNode.parentNode.previousElementSibling.classList.remove("urgent-border");
    }
  }
}

function clickAddTaskButton() {
  addTaskItem(event);
  togglePlusButton();
  disableButtons();
}

function clickMakeTaskButton() {
  makeToDoList();
  clearField(event);
  disableButtons();
  removeAllTaskItems();
}

function clickClearAllButton() {
  clearField(event);
  removeAllTaskItems();
  togglePlusButton();
}

function removeAllTaskItems() {
  while (taskItemParent.firstChild) {
    taskItemParent.removeChild(taskItemParent.firstChild);
  }
}

function clearField(event) {
  event.preventDefault();
  formField.reset();
}

function makeToDoList() {
  var taskDivArr = document.querySelectorAll(".select-me");
  var taskInstArr = [];
  var id = Date.now();
  for (var i = 0; i < taskDivArr.length; i++) {
    var taskcontent = taskDivArr[i].innerText;
    var task = new Task(taskcontent, id);
    taskInstArr.push(task);
  }
  var toDoList = new ToDoList(taskTitleInput.value, taskInstArr, id, false);
  toDoListInstArr.unshift(toDoList);
  var htmlToEnter = `
  <div id="${id}" class="main-taskcard-parent-div">
    <form class="main-taskcard" id="main-taskcard-js">
      <h2 class="form-taskcard-header">${toDoListInstArr[0].title}</h2>
      <section class="main-taskcard-section" id="anything-js">
        ${makeTaskHtml(toDoListInstArr[0].tasksArr)}
      </section>
      <footer>
        <div class="form-footer-div urgent-div" id="urgent-div-js">
          <img class="form-taskcard-checkimg urgent-img" id="urgent-img-js" src="assets/urgent.svg" alt="non-urgent lightning bolt icon" />
          <p class="form-taskcard-todo">URGENT<p>
        </div>
        <div class="form-footer-div">
          <img class="form-taskcard-checkimg" src="assets/delete.svg" alt="delete X icon" />
          <p class="form-taskcard-todo">DELETE<p>
        </div>
      </footer>
    </form>
  </div>`;
  cardCount += 1;
  var evenOdd = cardCount % 2;
  if (evenOdd === 1) {
    taskCardParent1.insertAdjacentHTML('afterbegin', htmlToEnter);
  } else {
    taskCardParent2.insertAdjacentHTML('afterbegin', htmlToEnter);
  }
}
//refactoring this function to be a method in the class that uses toDoList.tasksArr in place of
//passing a parameter then call toDoList.makeTaskHtml() in the HTML block above. bc we are passing
//taskJustTextArr in as tasksArr when instantiating

function makeTaskHtml(array) {
  var taskHtml = "";
  for (var i = 0; i < array.length; i++) {
    taskHtml += `
    <div class="form-taskcard-div">
      <img class="form-taskcard-checkimg" src="assets/checkbox.svg" alt="empty checkbox circle" />
      <p class="form-taskcard-firsttodo">${array[i].content}<p>
    </div>`;
  }
  return taskHtml;
}

function addTaskItem(event) {
  event.preventDefault();
  taskItemParent.innerHTML +=  `
      <div class="select-me aside-added-task-box">
        <img src="assets/delete.svg" alt="delete X icon" class="aside-added-task-icon-x" />
        <p id="task-text">${taskItemInput.value}</p>
      </div>`;
  taskItemInput.value = "";
  disableButtons();
}

function removeTaskItem(event) {
  if (event.target.classList.contains("aside-added-task-icon-x")) {
    event.target.parentNode.remove();
    disableButtons();
  }
}

function togglePlusButton() {
  if (taskItemInput.value !== "") {
    addTaskButton.classList.remove("disabled-button");
    addTaskButton.disabled = false;
  } else {
    addTaskButton.classList.add("disabled-button");
    addTaskButton.disabled = true;
  }
}

function disableButtons() {
  toggleButtons(makeTaskListButton);
  toggleButtons(clearAllButton);
}

function toggleButtons(button) {
  if (taskTitleInput.value.length > 0 && document.getElementsByClassName('select-me').length > 0) {
    button.classList.remove("disabled-button");
    button.disabled = false;
  } else {
    button.classList.add("disabled-button");
    button.disabled = true;
  }
}
