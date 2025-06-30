function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  const li = document.createElement("li");
  li.dataset.status = "active";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.onchange = function () {
    li.dataset.status = checkbox.checked ? "completed" : "active";
    updateTaskCount();
    applyFilter(currentFilter);
  };

  const span = document.createElement("span");
  span.textContent = taskText;
  span.ondblclick = function () {
    const input = document.createElement("input");
    input.type = "text";
    input.value = span.textContent;
    input.className = "edit-input";
    li.replaceChild(input, span);
    input.focus();

    input.onblur = function () {
      span.textContent = input.value.trim() || "Untitled Task";
      li.replaceChild(span, input);
    };

    input.onkeydown = function (e) {
      if (e.key === "Enter") input.blur();
    };
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = function () {
    li.remove();
    updateTaskCount();
  };

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  document.getElementById("taskList").appendChild(li);
  taskInput.value = "";
  updateTaskCount();
}

function updateTaskCount() {
  const tasks = document.querySelectorAll("#taskList li");
  const remaining = [...tasks].filter(li => li.dataset.status === "active").length;
  document.getElementById("taskCount").innerHTML = `<strong>${remaining} task${remaining !== 1 ? "s" : ""} remaining</strong>`;
}

let currentFilter = "all";

function filterTasks(filter) {
  currentFilter = filter;
  const tasks = document.querySelectorAll("#taskList li");
  tasks.forEach(li => {
    if (filter === "all") {
      li.style.display = "flex";
    } else if (filter === "active") {
      li.style.display = li.dataset.status === "active" ? "flex" : "none";
    } else if (filter === "completed") {
      li.style.display = li.dataset.status === "completed" ? "flex" : "none";
    }
  });
}
