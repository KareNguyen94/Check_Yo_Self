var taskItemInput = document.getElementById("aside-task-item-input-js");
var addTaskButton = document.getElementById("aside-plus-button-js");
var taskItemParent = document.getElementById("aside-section-task-items-js");

addTaskButton.addEventListener("click", addTaskItem);
taskItemParent.addEventListener("click", removeTaskItem);

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
