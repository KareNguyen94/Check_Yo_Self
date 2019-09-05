var taskItemInput = document.getElementById("aside-task-item-input-js");
var addTaskButton = document.getElementById("aside-plus-button-js");
var taskItemParent = document.getElementById("aside-section-task-items-js");
var taskTitleInput = document.getElementById("aside-task-title-input-js");
var makeTaskListButton = document.getElementById("make-task-button");
// var taskCardParent = document.getElementById("main-taskcard-parent");
var taskItemsArr = [];
var clearAllButton = document.getElementById("clear-all-button-js");
var formField = document.getElementById("aside-task-form-js");
var cardCount = 0;
var taskCardParent1 = document.getElementById("taskcard-parent1");
var taskCardParent2 = document.getElementById("taskcard-parent2");


addTaskButton.addEventListener("click", clickAddTaskButton);
makeTaskListButton.addEventListener("click", clickMakeTaskButton);
clearAllButton.addEventListener("click", clickClearAllButton);
taskItemParent.addEventListener("click", removeTaskItem);
taskItemInput.addEventListener("keyup", togglePlusButton);
taskTitleInput.addEventListener("keyup", disableButtons);

function clickAddTaskButton() {
  addTaskItem(event);
  togglePlusButton();
  disableButtons();
}

function clickMakeTaskButton() {
  grabTaskDivs();
  addTaskList(event);
  clearField(event);
  disableButtons();
  removeAllTaskItems();
}

function clickClearAllButton() {
  clearField(event);
  removeAllTaskItems();
  togglePlusButton();
  emptyTaskItemsArr();
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

function emptyTaskItemsArr() {
  for (var i = 0; i < taskItemsArr.length; i++) {
    taskItemsArr.splice(0, taskItemsArr.length);
  }
}

function grabTaskDivs() {
  var taskDivArr = document.querySelectorAll(".select-me");
  var taskJustTextArr = [];
  for (var i = 0; i < taskDivArr.length; i++) {
    var task = new Task(taskDivArr[i].innerText, Date.now());
    taskJustTextArr.push(task.content);
  }
}

function addTaskList(event) {
  event.preventDefault();
  var taskInfo = "";
  for (var i = 0; i < taskItemsArr.length; i++) {
    taskInfo += taskItemsArr[i];
  }
  var htmlToEnter = `
  <div class="main-taskcard-parent-div">
    <form class="main-taskcard">
      <h2 class="form-taskcard-header">${taskTitleInput.value}</h2>
      <section class="main-taskcard-section">
        ${taskInfo}
      </section>
      <footer>
        <div class="form-footer-div">
          <img class="form-taskcard-checkimg" src="assets/urgent.svg" alt="lightning bolt icon" />
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
  taskItemsArr.splice(0, i);
  //if this element contains a class of Num then array.splice(num, 1)
}

function addTaskItem(event) {
  event.preventDefault();
  taskItemParent.innerHTML +=  `
      <div class="select-me aside-added-task-box">
        <img src="assets/delete.svg" alt="delete X icon" class="aside-added-task-icon-x" />
        <p id="task-text">${taskItemInput.value}</p>
      </div>`;
  // taskItemsArr.push(`<div class="form-taskcard-div">
  //   <img class="form-taskcard-checkimg" src="assets/checkbox.svg" alt="empty checkbox circle" />
  //   <p class="form-taskcard-firsttodo">${taskItemInput.value}<p>
  // </div>`);
  taskItemInput.value = "";
  // write new function DRY
}

function removeTaskItem(event) {
  if (event.target.classList.contains("aside-added-task-icon-x")) {
    event.target.parentNode.remove();
    taskItemsArr.shift();
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
  if (taskTitleInput.value.length > 0) {
    button.classList.remove("disabled-button");
    button.disabled = false;
  } else {
    button.classList.add("disabled-button");
    button.disabled = true;
  }
}
// && taskItemsArr.length > 0
