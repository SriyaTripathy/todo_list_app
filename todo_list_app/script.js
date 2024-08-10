let todos = JSON.parse(localStorage.getItem("todos")) || [];
const todoList = document.querySelector("#todo-list");

const addTodoForm = document.querySelector("#add-todo-form");

addTodoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const todo = {
    content: e.target.elements.content.value,
    completed: false,
    createdAt: new Date().getTime(),
  };

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));

  // Reset the form
  e.target.reset();

  displayTodos();
});

displayTodos();

function displayTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    input.type = "checkbox";
    input.checked = todo.completed;
    span.classList.add("inner-circle");
    content.classList.add("todo-content");
    actions.classList.add("actions");
    editBtn.classList.add("edit");
    deleteBtn.classList.add("delete");

    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
    editBtn.innerHTML = "Edit";
    deleteBtn.innerHTML = "Delete";

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);

    if (todo.completed) {
      todoItem.classList.add("completed");
    }

    input.addEventListener("change", (e) => {
      todo.completed = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

      if (todo.completed) {
        todoItem.classList.add("completed");
      } else {
        todoItem.classList.remove("completed");
      }

      // displayTodos();
    });

    editBtn.addEventListener("click", (e) => {
      const input = content.querySelector("input");
      input.removeAttribute("readonly");
      input.focus();
      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        todo.content = e.target.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        // displayTodos();
      });
    });

    deleteBtn.addEventListener("click", (e) => {
      todos = todos.filter((t) => t != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      displayTodos();
    });
  });
}
