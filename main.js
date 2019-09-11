var addTaskButton = document.getElementById("aside-plus-button-js");
var clearAllButton = document.getElementById("clear-all-button-js");
var defaultTaskCard = document.getElementById("default-todo-card");
var formField = document.getElementById("aside-task-form-js");
var makeTaskListButton = document.getElementById("make-task-button");
var taskCardParent = document.getElementById("taskcard-parent");
var taskItemInput = document.getElementById("aside-task-item-input-js");
var taskItemParent = document.getElementById("aside-section-task-items-js");
var taskTitleInput = document.getElementById("aside-task-title-input-js");
var toDoCardSectionParent = document.getElementById("main-taskcard-parent")
var toDoListInstArr = [];
var leftColumnHeight = 0;
var rightColumnHeight = 0;
var lastCardId = 0;
var lastTaskId = 0;

addTaskButton.addEventListener("click", clickAddTaskButton);
makeTaskListButton.addEventListener("click", clickMakeTaskButton);
clearAllButton.addEventListener("click", clickClearAllButton);
taskItemParent.addEventListener("click", removeTaskItem);
taskItemInput.addEventListener("keyup", togglePlusButton);
taskTitleInput.addEventListener("keyup", disableButtons);
taskCardParent.addEventListener("click", removeToDoList);
toDoCardSectionParent.addEventListener("click", clickToDoCard);
window.addEventListener("load", onPageLoad);

function clickToDoCard() {
  styleUrgentToDoList(event);
  styleTask(event);
}

function clickAddTaskButton() {
  addTaskItem(event);
  togglePlusButton();
  disableButtons();
}

function clickMakeTaskButton() {
  initialInstantiation();
  removeDefaultCard();
  createToDoListCard();
  clearField(event);
  disableButtons();
  removeChildren(taskItemParent);
}

function clickClearAllButton() {
  clearField(event);
  removeChildren(taskItemParent);
  togglePlusButton();
}

function onPageLoad() {
if("toDoListLS" in localStorage) {
  reInstantiation();
  removeDefaultCard();
  createToDoListCard();
  addUrgentStyleOnReload();
  addCompleteStyleOnReload();
  }
}

function editUrgentProperty(event) {
  var toDoListId = event.target.parentNode.parentNode.parentNode.parentNode.dataset.cardid;
  for (var i = 0; i < toDoListInstArr.length; i++) {
    if (toDoListInstArr[i].id === toDoListId) {
        toDoListInstArr[i].updateToDo();
        toDoListInstArr[i].saveToStorage(toDoListInstArr);
        return toDoListInstArr[i];
      }
  }
}

function addUrgentStyleOnReload() {
  var urgentImg = document.querySelectorAll(".urgent-img");
  for (var i = 0; i < toDoListInstArr.length; i++) {
    if (toDoListInstArr[i].urgent === true) {
      for (var j = 0; j < urgentImg.length; j++) {
        var cardId = urgentImg[j].parentNode.parentNode.parentNode.parentNode.dataset.cardid;
        if (toDoListInstArr[i].id === cardId) {
          urgentImg[j].src = "assets/urgent-active.svg";
          urgentImg[j].alt = "urgent lightning bolt icon";
          urgentImg[j].parentNode.parentNode.parentNode.classList.add("urgent-card");
          urgentImg[j].parentNode.classList.add("urgent-text");
          urgentImg[j].parentNode.parentNode.previousElementSibling.classList.add("urgent-border");
        }
      }
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

function completeTask(event) {
  var taskId = event.target.parentNode.dataset.taskid;
  for (var i = 0; i < toDoListInstArr.length; i++) {
    var tasksArray = toDoListInstArr[i].tasksArr;
    for (var j = 0; j < tasksArray.length; j++) {
      if (tasksArray[j].id.toString() === taskId) {
        tasksArray[j].updateTask();
        toDoListInstArr[i].saveToStorage(toDoListInstArr);
        return tasksArray[j];
      }
    }
  }
}

function addCompleteStyleOnReload() {
  var completeTaskImg = document.querySelectorAll(".form-taskcard-checkimg");
  for (var i = 0; i < toDoListInstArr.length; i++) {
    var tasksArray = toDoListInstArr[i].tasksArr;
    for (var j = 0; j < tasksArray.length; j++) {
      if (tasksArray[j].complete === true) {
        for (var k = 0; k < completeTaskImg.length; k++) {
          var cardId = completeTaskImg[k].parentNode.dataset.taskid;
          if (tasksArray[j].id === cardId) {
            completeTaskImg[k].src = "assets/checkbox-active.svg";
            completeTaskImg[k].alt = "checked off circle";
            completeTaskImg[k].nextElementSibling.classList.add("completed-task");
          }
        }
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

function isolateToDoList(event) {
  var toDoListId = event.target.parentNode.parentNode.parentNode.parentNode.dataset.cardid;
  for (var i = 0; i < toDoListInstArr.length; i++) {
    if (toDoListInstArr[i].id === toDoListId) {
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
        return toDoList.id !== toDoListId;
    });
    event.target.parentNode.parentNode.parentNode.parentNode.remove();
      toDoListInstArr[0].deleteFromStorage("toDoListLS");
      toDoListInstArr[0].saveToStorage(toDoListInstArr);
    }
  }
}

function removeChildren(whichSection) {
  while (whichSection.firstChild) {
    whichSection.removeChild(whichSection.firstChild);
  }
}

function clearField(event) {
  event.preventDefault();
  formField.reset();
}

function removeDefaultCard() {
  if(toDoListInstArr.length > 0)
    defaultTaskCard.remove();
}

function initialInstantiation() {
var taskDivArr = document.querySelectorAll(".select-me");
var taskInstantiations = instantiateInitialTask(taskDivArr);
instantiateCard(taskTitleInput.value, taskInstantiations);
}

function parseFromLS() {
  var getItem = localStorage.getItem("toDoListLS");
  var storageArray = JSON.parse(getItem);
  return storageArray;
}

function reInstantiation() {
    var storageArray = parseFromLS();
    console.log(storageArray);
    for (var i = 0; i < storageArray.length; i++) {
    instantiateCard(storageArray[i].title, storageArray[i].tasksArr, storageArray[i].urgent);
    }
  for (var i = 0; i < toDoListInstArr.length; i++) {
    var tasksArray = toDoListInstArr[i].tasksArr;
    toDoListInstArr[i].tasksArr = reInstantiateTask(tasksArray);
  }
}

function instantiateInitialTask(array) {
  var taskInstArray = [];
  for (var i = 0; i < array.length; i++) {
    var taskcontent = array[i].innerText;
    var task = new Task(taskcontent, lastTaskId);
    lastTaskId ++;
    taskInstArray.push(task);
  }
  return taskInstArray;
}

function reInstantiateTask(array) {
  var taskInstArray = [];
  for (var i = 0; i < array.length; i++) {
    var taskcontent = array[i].content;
    var taskComplete = array[i].complete;
    var task = new Task(taskcontent, lastTaskId, taskComplete);
    lastTaskId ++;
    taskInstArray.push(task);
  }
  return taskInstArray;
}

  function instantiateCard(title, tasks, urgent) {
  var toDoList = new ToDoList(title, tasks, lastCardId, urgent);
  toDoListInstArr.push(toDoList);
  toDoList.saveToStorage(toDoListInstArr);
  lastCardId ++;
}

function createToDoListCard() {
  removeChildren(taskCardParent);
  for (var i = 0; i < toDoListInstArr.length; i++) {
  var htmlToEnter = `
  <div data-cardid="${toDoListInstArr[i].id}" class="main-taskcard-parent-div item">
    <form class="main-taskcard" id="todolist-form">
      <h2 class="form-taskcard-header">${toDoListInstArr[i].title}</h2>
      <section class="main-taskcard-section" id="form-todolist-section">
        ${makeTaskHtml(toDoListInstArr[i].tasksArr)}
      </section>
      <footer>
        <div class="form-footer-div urgent-div" id="urgent-div-js">
          <img class="form-taskcard-checkimg urgent-img" id="urgent-img-js" src="assets/urgent.svg" alt="non-urgent lightning bolt icon" />
          <p class="form-taskcard-todo">URGENT<p>
        </div>
        <div class="form-footer-div" id="form-todolist-div">
          <img class="delete-list form-taskcard-checkimg" src="assets/delete.svg" alt="delete X icon" />
          <p class="form-taskcard-todo">DELETE<p>
        </div>
      </footer>
    </form>
  </div>`;
  taskCardParent.insertAdjacentHTML('afterbegin', htmlToEnter);
  runMasonryLayout();
  }
}

function runMasonryLayout() {
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
