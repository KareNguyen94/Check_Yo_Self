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
var taskInstArr = [];
var toDoListInstArr = [];
var onDeckUrgentImgSrc = "assets/urgent-active.svg";
var toDoCardSectionParent = document.getElementById("main-taskcard-parent")

addTaskButton.addEventListener("click", clickAddTaskButton);
makeTaskListButton.addEventListener("click", clickMakeTaskButton);
clearAllButton.addEventListener("click", clickClearAllButton);
taskItemParent.addEventListener("click", removeTaskItem);
taskItemInput.addEventListener("keyup", togglePlusButton);
taskTitleInput.addEventListener("keyup", disableButtons);
toDoCardSectionParent.addEventListener("click", toggleUrgentImg);

// this will happen when user clicks on the img or area the img lives in
// if this happens on event.target - the parent would need to be the main section
// since it already exists on the dom right?

function toggleUrgentImg(event) {
  console.log(event);
  console.log(event.target.firstChild);

  // if (event.target.id === "urgent-icon" && onDeckUrgentImgSrc === "assets/urgent-active.svg") {
  // if (toDoList.urgent === false) {but how will it know which toDoList instantiation?
  if (event.target.closest(".urgent-icon")) {
    console.log(event.target.closest(".urgent-icon"));
    event.target.closest("#urgent-img").src = "assets/urgent-active.svg";
    event.target.closest("#urgent-img").alt = "lightning bolt icon urgent active state";
    styleUrgentState();
    // event.target.closest("#urgent-img").id = "urgent-active-img";
    event.target.closest(".urgent-icon").classList.replace("urgent-icon", "urgent-active-icon");
    console.log(event.target.closest(".urgent-active-icon"));
    // event.target.src = "assets/urgent-active.svg";
    // event.target.alt = "Urgent Icon Active State";
  } else if (event.target.closest(".urgent-active-icon")) {
      event.target.closest("#urgent-img").src = "assets/urgent.svg";
      event.target.closest("#urgent-img").alt = "lightning bolt icon non-urgent state";
      unStyleUrgentState();
      // event.target.closest("#urgent-active-img").id = "urgent-img";
      event.target.closest(".urgent-active-icon").classList.replace("urgent-active-icon", "urgent-icon");
  }
}

function styleUrgentState() {
  event.target.closest(".urgent-icon").classList.add("urgent-text");
  event.target.closest("#main-taskcard-js").classList.add("urgent-card");
  // event.target.closest("#anything-js").classList.add("urgent-border");
}

function unStyleUrgentState() {
  event.target.closest(".urgent-active-icon").classList.remove("urgent-text");
  event.target.closest("#main-taskcard-js").classList.remove("urgent-card");
  // event.target.closest("#anything-js").classList.remove("urgent-border");
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
  <div class="main-taskcard-parent-div">
    <form class="main-taskcard" id="main-taskcard-js">
      <h2 class="form-taskcard-header">${toDoList.title}</h2>
      <section class="main-taskcard-section" id="anything-js">
        ${makeTaskHtml(taskJustTextArr)}
      </section>
      <footer>
        <div class="form-footer-div urgent-icon" id="urgent-icon-js">
          <img class="form-taskcard-checkimg" id="urgent-img" src="assets/urgent.svg" alt="lightning bolt icon" />
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
      <p class="form-taskcard-firsttodo">${array[i]}<p>
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
