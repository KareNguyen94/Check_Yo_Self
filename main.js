var taskItemInput = document.getElementById("aside-task-item-input-js");
var addTaskButton = document.getElementById("aside-plus-button-js");
var taskItemParent = document.getElementById("aside-section-task-items-js");
var taskTitleInput = document.getElementById("aside-task-title-input-js");
var makeTaskListButton = document.getElementById("make-task-button");
var clearAllButton = document.getElementById("clear-all-button-js");
var formField = document.getElementById("aside-task-form-js");
var toDoCardSectionParent = document.getElementById("main-taskcard-parent")
var taskCardParent = document.getElementById("taskcard-parent");
var defaultTaskCard = document.getElementById("default-todo-card");
var toDoListInstArr = [];
var leftColumnHeight = 0;
var rightColumnHeight = 0;
var lastTaskId = 0;

addTaskButton.addEventListener("click", clickAddTaskButton);
makeTaskListButton.addEventListener("click", clickMakeTaskButton);
clearAllButton.addEventListener("click", clickClearAllButton);
taskItemParent.addEventListener("click", removeTaskItem);
taskItemInput.addEventListener("keyup", togglePlusButton);
taskTitleInput.addEventListener("keyup", disableButtons);
taskCardParent.addEventListener("click", removeToDoList);
toDoCardSectionParent.addEventListener("click", clickToDoCard);

function editUrgentProperty(event) {
  var toDoListId = event.target.parentNode.parentNode.parentNode.parentNode.dataset.cardid;
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
//second for loop could not use i due to nested in other for loop so used j
function completeTask(event) {
  var taskId = event.target.parentNode.dataset.taskid;
  for (var i = 0; i < toDoListInstArr.length; i++) {
    var taskArray = toDoListInstArr[i].tasksArr;
    for (var j = 0; j < taskArray.length; j++) {
      if (taskArray[j].id.toString() === taskId) {
        taskArray[j].updateTask();
        return taskArray[j];
      }
    }
  }
}

function styleTask(event) {
  if (event.target.classList.contains("empty-circle")) {
    var taskObject = completeTask(event);
    if(taskObject.complete === true) {
      event.target.src = "assets/checkbox-active.svg";
      event.target.alt = "checked off circle";
      event.target.nextElementSibling.classList.add("completed-task");
    } else {
      event.target.src = "assets/checkbox.svg";
      event.target.alt = "empty checkbox circle";
      event.target.nextElementSibling.classList.remove("completed-task");
    }
  }
}

function clickToDoCard() {
  styleUrgentToDoList(event);
  styleTask(event);
}

function clickAddTaskButton() {
  addTaskItem(event);
  togglePlusButton();
  // disableButtons();
}

function clickMakeTaskButton() {
  removeDefaultCard();
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

function removeDefaultCard() {
  if(toDoListInstArr.length === 0)
    defaultTaskCard.remove();
}

function makeToDoList() {
  var taskDivArr = document.querySelectorAll(".select-me");
  var taskInstArray = [];
  var id = Date.now();
  for (var i = 0; i < taskDivArr.length; i++) {
    var taskcontent = taskDivArr[i].innerText;
    var task = new Task(taskcontent, lastTaskId);
    lastTaskId ++;
    taskInstArray.push(task);
  }
  var toDoList = new ToDoList(taskTitleInput.value, taskInstArray, id, false);
  toDoListInstArr.unshift(toDoList);
  var htmlToEnter = `
  <div data-cardid="${id}" class="main-taskcard-parent-div item">
    <form class="main-taskcard">
      <h2 class="form-taskcard-header">${toDoListInstArr[0].title}</h2>
      <section class="main-taskcard-section">
        ${makeTaskHtml(toDoListInstArr[0].tasksArr)}
      </section>
      <footer>
        <div class="form-footer-div urgent-div" id="urgent-div-js">
          <img class="form-taskcard-checkimg urgent-img" id="urgent-img-js" src="assets/urgent.svg" alt="non-urgent lightning bolt icon" />
          <p class="form-taskcard-todo">URGENT<p>
        </div>
        <div class="form-footer-div">
          <img class="delete-list form-taskcard-checkimg" src="assets/delete.svg" alt="delete X icon" />
          <p class="form-taskcard-todo">DELETE<p>
        </div>
      </footer>
    </form>
  </div>`;
  taskCardParent.insertAdjacentHTML('afterbegin', htmlToEnter);
  var toDoListCard = document.getElementsByClassName('item');
  var toDoListMasonry = document.querySelector(".main-taskcard-parent-div");
      for (var i = 0; i < toDoListCard.length; i++) {
          if (leftColumnHeight > rightColumnHeight) {
              rightColumnHeight += (i + 1);
              toDoListMasonry.classList.add('right');
              return;
          } else {
              leftColumnHeight += (i + 1);
              return;
          }
        }
}

function makeTaskHtml(array) {
  var taskHtml = "";
  for (var i = 0; i < array.length; i++) {
    taskHtml += `
    <div data-taskid="${array[i].id}" class="form-taskcard-div">
      <img class="form-taskcard-checkimg empty-circle" src="assets/checkbox.svg" alt="empty checkbox circle" />
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

function isolateToDoList(event) {
  var toDoListId = event.target.parentNode.parentNode.parentNode.parentNode.dataset.cardid;
  for (var i = 0; i < toDoListInstArr.length; i++) {
    if (toDoListInstArr[i].id === parseInt(toDoListId)) {
        return toDoListInstArr[i];
      }
  }
}

function isTheyDone(array) {
  return array.complete === true;
}

function removeToDoList() {
  if (event.target.classList.contains("delete-list")) {
    var toDoList = isolateToDoList(event);
    var array = toDoList.tasksArr;
    var test = array.every(isTheyDone);
    if (test === true) {
      var toDoListId = event.target.parentNode.parentNode.parentNode.parentNode.dataset.cardid;
      toDoListInstArr = toDoListInstArr.filter(function(toDoList) {
        return toDoList.id !== parseInt(toDoListId);
    });
    event.target.parentNode.parentNode.parentNode.parentNode.remove();
    }
  }
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
