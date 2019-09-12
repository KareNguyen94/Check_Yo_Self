var clearAllButton = document.getElementById("clear-all-button-js");
var defaultTaskCard = document.getElementById("default-todo-card");
var formField = document.getElementById("aside-task-form-js");
var headerSearchInput = document.getElementById("header-search");
var makeTaskListButton = document.getElementById("make-task-button");
var plusButton = document.getElementById("aside-plus-button-js");
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

plusButton.addEventListener("click", clickPlusButton);
makeTaskListButton.addEventListener("click", clickMakeTaskButton);
clearAllButton.addEventListener("click", clickClearAllButton);
taskItemParent.addEventListener("click", removeTaskItem);
headerSearchInput.addEventListener('keyup', replaceToDoLists);
taskItemInput.addEventListener("keyup", togglePlusButton);
taskTitleInput.addEventListener("keyup", disableButtons);
taskCardParent.addEventListener("click", removeToDoList);
toDoCardSectionParent.addEventListener("click", clickToDoCard);
window.addEventListener("load", onPageLoad);

function clickPlusButton() {
  addTaskItem(event);
  togglePlusButton();
  disableButtons();
}

function clickMakeTaskButton() {
  initialInstantiation();
  removeDefaultCard();
  createToDoListCard(toDoListInstArr);
  clearField(event);
  disableButtons();
  removeChildren(taskItemParent);
}

function clickClearAllButton() {
  clearField(event);
  removeChildren(taskItemParent);
  togglePlusButton();
}

function clickToDoCard() {
  styleUrgentToDoList(event);
  styleTask(event);
}


function onPageLoad() {
if("toDoListLS" in localStorage) {
  reInstantiation();
  removeDefaultCard();
  createToDoListCard(toDoListInstArr);
  addUrgentStyleOnReload();
  addCompleteStyleOnReload();
  }
}

function searchForTitle() {
  var temporarySearchArray = [];
  var newTempArray = temporarySearchArray.concat(toDoListInstArr);
  var newfilteredArray = newTempArray.filter(function(array) {
    return array.title === headerSearchInput.value;
  });
  createToDoListCard(newfilteredArray);
  addUrgentStyleOnReload();
  addCompleteStyleOnReload();
}

function replaceToDoLists() {
  for (var i = 0; i < toDoListInstArr.length; i++) {
    console.log(toDoListInstArr[i].title);
    if(toDoListInstArr[i].title === headerSearchInput.value) {
          searchForTitle();
          return;
    } else {
          createToDoListCard(toDoListInstArr);
          addUrgentStyleOnReload();
          addCompleteStyleOnReload();
    }
  }
}

function styleUrgentToDoList(event) {
  if (event.target.classList.contains("urgent-img")) {
    var object = editUrgentProperty(event);
    if (object.urgent === true) {
      addUrgentStyle(event, event.target);
    } else {
      removeUrgentStyle(event, event.target);
    }
  }
}

function editUrgentProperty(event) {
  var toDoListId =
    event.target.parentNode.parentNode.parentNode.parentNode.dataset.cardid;
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
        var cardId =
          urgentImg[j].parentNode.parentNode.parentNode.parentNode.dataset.cardid;
        if (toDoListInstArr[i].id === cardId) {
          addUrgentStyle(event, urgentImg[j]);
        }
      }
    }
  }
}

function addUrgentStyle(event, whichElement) {
  whichElement.src = "assets/urgent-active.svg";
  whichElement.alt = "urgent lightning bolt icon";
  whichElement.parentNode.parentNode.parentNode.classList.add("urgent-card");
  whichElement.parentNode.classList.add("urgent-text");
  whichElement.parentNode.parentNode.previousElementSibling.classList.add("urgent-border");
  whichElement.parentNode.nextElementSibling.classList.add("delete-text-urgent");
}

function removeUrgentStyle(event, whichElement) {
  whichElement.src = "assets/urgent.svg";
  whichElement.alt = "non-urgent lightning bolt icon";
  whichElement.parentNode.parentNode.parentNode.classList.remove("urgent-card");
  whichElement.parentNode.classList.remove("urgent-text");
  whichElement.parentNode.parentNode.previousElementSibling.classList.remove("urgent-border");
  whichElement.parentNode.nextElementSibling.classList.remove("delete-text-urgent");
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
            addCompleteStyle(event, completeTaskImg[k]);
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
      addCompleteStyle(event, event.target);
    } else {
      removeCompleteStyle(event, event.target);
    }
  }
}

function addCompleteStyle(event, whichElement) {
  whichElement.src = "assets/checkbox-active.svg";
  whichElement.alt = "checked off circle";
  whichElement.nextElementSibling.classList.add("completed-task");
}

function removeCompleteStyle(event, whichElement) {
  whichElement.src = "assets/checkbox.svg";
  whichElement.alt = "empty checkbox circle";
  whichElement.nextElementSibling.classList.remove("completed-task");
}

function isolateToDoList(event) {
  var toDoListId =
    event.target.parentNode.parentNode.parentNode.parentNode.dataset.cardid;
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
      var toDoListId =
        event.target.parentNode.parentNode.parentNode.parentNode.dataset.cardid;
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

function createToDoListCard(array) {
  removeChildren(taskCardParent);
  for (var i = 0; i < array.length; i++) {
    var htmlToEnter = `
      <div data-cardid="${array[i].id}"
        class="main-taskcard-parent-div item">
        <form class="main-taskcard" id="todolist-form">
          <h2 class="form-taskcard-header">${array[i].title}</h2>
          <section class="main-taskcard-section" id="form-todolist-section">
            ${makeTaskHtml(array[i].tasksArr)}
          </section>
          <footer>
            <div class="form-footer-div urgent-div" id="urgent-div-js">
              <img class="form-taskcard-checkimg urgent-img" id="urgent-img-js"
                src="assets/urgent.svg" alt="non-urgent lightning bolt icon" />
              <p class="form-taskcard-todo">URGENT<p>
            </div>
            <div class="form-footer-div" id="form-todolist-div">
              <img class="delete-list form-taskcard-checkimg"
                src="assets/delete.svg" alt="delete X icon" />
              <p class="form-taskcard-todo delete">DELETE<p>
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
        <img class="form-taskcard-checkimg empty-circle" src="assets/checkbox.svg"
          alt="empty checkbox circle" />
        <p class="form-taskcard-firsttodo">${array[i].content}<p>
      </div>`;
  }
  return taskHtml;
}

function addTaskItem(event) {
  event.preventDefault();
  taskItemParent.innerHTML +=  `
    <div class="select-me aside-added-task-box">
      <img src="assets/delete.svg" alt="delete X icon"
        class="aside-added-task-icon-x" />
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
    plusButton.classList.remove("disabled-button");
    plusButton.disabled = false;
  } else {
    plusButton.classList.add("disabled-button");
    plusButton.disabled = true;
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
