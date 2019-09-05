var taskItemInput = document.getElementById("aside-task-item-input-js");
var addTaskButton = document.getElementById("aside-plus-button-js");
var taskItemParent = document.getElementById("aside-section-task-items-js");
var taskTitleInput = document.getElementById("aside-task-title-input-js");
var makeTaskListButton = document.getElementById("make-task-button");
var taskCardParent = document.getElementById("main-taskcard-parent");
var taskItemsArr = [];
var clearAllButton = document.getElementById("clear-all-button-js");
var formField = document.getElementById("aside-task-form-js");

addTaskButton.addEventListener("click", addTaskItem);
taskItemParent.addEventListener("click", removeTaskItem);
taskItemInput.addEventListener("keyup", toggleButton);
makeTaskListButton.addEventListener("click", addTaskList);
clearAllButton.addEventListener("click", clearField);


function clearField(event) {
  event.preventDefault();
  formField.reset();
  toggleButton();

}

function addTaskList(event) {
  event.preventDefault();
  var taskInfo = "";
  for (var i = 0; i < taskItemsArr.length; i++) {
    taskInfo += taskItemsArr[i];
  }
  taskCardParent.insertAdjacentHTML('afterbegin', `
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
  </div>`)

  taskItemsArr.splice(0, i);
  clearField(event);
}

function addTaskItem(event) {
  event.preventDefault();
  taskItemParent.innerHTML +=  `<div class="aside-added-task-box">
      <img src="assets/delete.svg" alt="delete X icon" class="aside-added-task-icon-x" />
      <p>${taskItemInput.value}</p>
      </div>`
  taskItemsArr.push(`<div class="form-taskcard-div">
    <img class="form-taskcard-checkimg" src="assets/checkbox.svg" alt="empty checkbox circle" />
    <p class="form-taskcard-firsttodo">${taskItemInput.value}<p>
  </div>`);
  console.log(taskItemsArr);
  taskItemInput.value = "";
  toggleButton();
  // write new function DRY
}

function removeTaskItem(event) {
  if (event.target.classList.contains("aside-added-task-icon-x"))
    event.target.parentNode.remove();
}

function toggleButton() {
  if (taskItemInput.value !== "") {
    addTaskButton.classList.remove("disabled-button");
    addTaskButton.disabled = false;
  } else {
    addTaskButton.classList.add("disabled-button");
    addTaskButton.disabled = true;
  }
}
