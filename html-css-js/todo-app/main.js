document.addEventListener("DOMContentLoaded", function () {
  const theme = document.getElementById("theme");
  const newItemInput = document.getElementById("addItem");
  const todoList = document.querySelector(".content ul");
  const itemsLeft = document.querySelector(".items-left span");
  const searchInput = document.getElementById("searchItem");

// Initialize theme based on the checkbox state
  theme.addEventListener("change", () => {
    if (theme.checked) {
      document.body.classList.add("theme-light");
      document.body.classList.remove("theme-dark");
    } else {
      document.body.classList.add("theme-dark");
      document.body.classList.remove("theme-light");
    }
  });

// Apply initial theme
  if (theme.checked) {
    document.body.classList.add("theme-light");
  } else {
    document.body.classList.add("theme-dark");
  }

  // Load stored tasks from localStorage
  loadTasks();

  // Add new task
  document.querySelector(".add-new-item span").addEventListener("click", () => {
    if (newItemInput.value.length > 0) {
      createNewTodoItem(newItemInput.value);
      newItemInput.value = "";
    }
  });
  
  // Add new task on Enter key press
  newItemInput.addEventListener("keypress", (e) => {
    if (e.charCode === 13 && newItemInput.value.length > 0) {
      createNewTodoItem(newItemInput.value);
      newItemInput.value = "";
    }
  });

  // Function to create a new to-do item
  function createNewTodoItem(text) {
    const elem = document.createElement("li");
    elem.classList.add("flex-row");

    elem.innerHTML = `
          <label class="list-item">
        <input type="checkbox" name="todoItem" ${isChecked ? "checked" : ""}>
        <span class="checkmark"></span>
        <span class="text">${text}</span>
        <select class="priority">
          <option value="low" ${priority === "low" ? "selected" : ""}>Low</option>
          <option value="medium" ${priority === "medium" ? "selected" : ""}>Medium</option>
          <option value="high" ${priority === "high" ? "selected" : ""}>High</option>
        </select>
        <button class="edit">Edit</button>
      </label>
      <span class="remove"></span>
      `;

     // Hide the item if the completed filter is selected
    if (
      document.querySelector('.filter input[type="radio"]:checked').id ===
      "completed"
    ) {
      elem.classList.add("hidden");
    }

    todoList.append(elem);
    updateItemsCount(1);

  // Save tasks to localStorage
    saveTasks();
  }

  // Update the count of items left
  function updateItemsCount(number) {
    itemsLeft.innerText = +itemsLeft.innerText + number;
  }

  // Remove a to-do item
  function removeTodoItem(elem) {
    elem.remove();
    updateItemsCount(-1);
    saveTasks();
  }

// Event listener for removing and editing tasks
  todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove")) {
      removeTodoItem(event.target.parentElement);
    }
  });
  
// Save tasks when any change occurs in the task list
  todoList.addEventListener("change", saveTasks);

// Clear completed tasks
  document.querySelector(".clear").addEventListener("click", () => {
    document
      .querySelectorAll('ul li input[type="checkbox"]:checked')
      .forEach((item) => {
        removeTodoItem(item.closest("li"));
      });
     saveTasks();
  });

// Filter tasks based on the selected filter option
  document.querySelectorAll(".filter input").forEach((radio) => {
    radio.addEventListener("change", (e) => {
      filterTodoItems(e.target.id);
    });
  });

// Search tasks based on user input
  searchInput.addEventListener("input", () => {
    searchTasks(searchInput.value);
  });
  
  // Filter to-do items based on the selected filter option
  function filterTodoItems(id) {
    const allItems = todoList.querySelectorAll("li");

    switch (id) {
      case "all":
        allItems.forEach((item) => {
          item.classList.remove("hidden");
        });
        break;
      case "active":
        allItems.forEach((item) => {
          if (item.querySelector("input").checked) {
            item.classList.add("hidden");
          } else {
            item.classList.remove("hidden");
          }
        });
        break;
      case "completed":
        allItems.forEach((item) => {
          if (item.querySelector("input").checked) {
            item.classList.remove("hidden");
          } else {
            item.classList.add("hidden");
          }
        });
        break;
      default:
        break;
    }
  }

    // Search tasks based on the query
  function searchTasks(query) {
    const allItems = todoList.querySelectorAll("li");

    allItems.forEach((item) => {
      if (item.querySelector(".text").innerText.toLowerCase().includes(query.toLowerCase())) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  }

  // Edit a to-do item
  function editTodoItem(item) {
    const textSpan = item.querySelector(".text");
    const newText = prompt("Edit task", textSpan.innerText);

    if (newText !== null) {
      textSpan.innerText = newText;
      saveTasks();
    }
  }

  // Save tasks to localStorage
  function saveTasks() {
    const tasks = [];
    todoList.querySelectorAll("li").forEach((item) => {
      const text = item.querySelector(".text").innerText;
      const isChecked = item.querySelector("input[type='checkbox']").checked;
      const priority = item.querySelector(".priority").value;

      tasks.push({ text, isChecked, priority });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Load tasks from localStorage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task) => {
      createNewTodoItem(task.text, task.priority, task.isChecked);
    });

    updateItemsCount(tasks.length);
  }
});
