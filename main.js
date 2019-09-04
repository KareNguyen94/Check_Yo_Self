var taskItemInput = document.getElementById("aside-task-item-input-js");
var addTaskButton = document.getElementById("aside-plus-button-js");
var taskItemParent = document.getElementById("aside-section-task-items-js");

addTaskButton.addEventListener("click", addTaskItem);
taskItemParent.addEventListener("click", removeTaskItem);
taskItemInput.addEventListener("keyup", toggleButton);

function addTaskItem(event) {
  event.preventDefault();
  taskItemParent.innerHTML +=  `<div class="aside-added-task-box">
      <img src="assets/delete.svg" alt="delete X icon" class="aside-added-task-icon-x" />
      <p>${taskItemInput.value}</p>
      </div>`
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
