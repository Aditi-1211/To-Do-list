function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = taskText;

  // Make task editable on double-click
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
      if (e.key === "Enter") {
        input.blur();
      }
    };
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = function () {
    li.remove();
  };

  li.appendChild(span);
  li.appendChild(deleteBtn);
  document.getElementById("taskList").appendChild(li);
  taskInput.value = "";
}
