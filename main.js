var taskItemInput = document.getElementById("aside-task-item-input-js");
var addTaskButton = document.getElementById("aside-plus-button-js");
var taskItemParent = document.getElementById("aside-section-task-items-js");
var taskTitleInput = document.getElementById("aside-task-title-input-js");
var makeTaskListButton = document.getElementById("make-task-button");
var clearAllButton = document.getElementById("clear-all-button-js");
var formField = document.getElementById("aside-task-form-js");
var taskCardParent1 = document.getElementById("taskcard-parent1");
var taskCardParent2 = document.getElementById("taskcard-parent2");
var defaultTaskCard = document.getElementById("default-todo-card");
var taskInstArr = [];
var toDoListInstArr = [];
var leftColumnHeight = 0;
var rightColumnHeight = 0;

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
  var taskJustTextArr = [];
  for (var i = 0; i < taskDivArr.length; i++) {
    var taskcontent = taskDivArr[i].innerText;
    var task = new Task(taskcontent, Date.now());
    taskInstArr.push(task);
    taskJustTextArr.push(task.content);
  }
  var toDoList = new ToDoList(taskTitleInput.value, taskJustTextArr, Date.now(), false);
  toDoListInstArr.push(toDoList);
  var htmlToEnter = `
  <div class="main-taskcard-parent-div item">
    <form class="main-taskcard">
      <h2 class="form-taskcard-header">${toDoList.title}</h2>
      <section class="main-taskcard-section">
        ${makeTaskHtml(taskJustTextArr)}
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
  taskCardParent1.insertAdjacentHTML('afterbegin', htmlToEnter);
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
    <div class="form-taskcard-div">
      <img class="form-taskcard-checkimg" src="assets/checkbox.svg" alt="empty checkbox circle" />
      <p class="form-taskcard-firsttodo">${array[i]}<p>
    </div>`;
  }
  return taskHtml;
}

// var left_column_height = 0;
// var right_column_height = 0;
// var items = querySelectorAll('.item');
// for (var i = 0; i < items.length; i++) {
//
//     /* this is purely to show vaird heights, the content would create the height...
//     begin fpo: */
//     items.eq(i).height(Math.floor(Math.random() * 100) + 10);
//     /* end fpo: */
//
//     if (left_column_height > right_column_height) {
//         right_column_height+= items.eq(i).addClass('right').outerHeight(true);
//     } else {
//         left_column_height+= items.eq(i).outerHeight(true);
//
//     }
// }

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
