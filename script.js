document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTask");
  const taskItems = document.getElementById("taskItems");
  const completeSpan = document.getElementById("complete");
  const incompleteSpan = document.getElementById("Incomplete");

  function updateStatus() {
    const tasks = document.querySelectorAll(
      "#taskItems li input[type='checkbox']"
    );
    let completeCount = 0;
    let incompleteCount = 0;

    tasks.forEach((task) => {
      if (task.checked) {
        completeCount++;
      } else {
        incompleteCount++;
      }
    });

    completeSpan.textContent = completeCount;
    incompleteSpan.textContent = incompleteCount;
  }

  function deleteTask(event) {
    const taskItem = event.target.parentElement;
    taskItems.removeChild(taskItem);
    updateStatus();
  }

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.addEventListener("change", updateStatus);

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-task");

      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fas", "fa-trash-alt");
      deleteButton.appendChild(deleteIcon);

      deleteButton.addEventListener("click", deleteTask);

      li.appendChild(checkbox);
      li.appendChild(document.createTextNode(" " + taskText));
      li.appendChild(deleteButton);
      taskItems.appendChild(li);

      taskInput.value = "";
      updateStatus();
    }
  }

  addTaskButton.addEventListener("click", addTask);

  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });

  const initialTasks = document.querySelectorAll(
    "#taskItems li input[type='checkbox']"
  );
  initialTasks.forEach((task) => {
    task.addEventListener("change", updateStatus);
  });

  updateStatus();
});
