const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let editTarget = null;

const addTodo = () => {
  const inputText = inputBox.value.trim();
  if (inputText === "") {
    alert("Please enter a task!");
    return;
  }

  if (addBtn.innerText === "Update") {
    editTarget.querySelector('p').innerText = inputText;
    updateLocalTodo(editTarget.dataset.oldValue, inputText);
    addBtn.innerText = "Add Task";
    inputBox.value = "";
    editTarget = null;
    return;
  }

  createTodoElement(inputText);
  saveLocalTodo(inputText);
  inputBox.value = "";
};

const createTodoElement = (text) => {
  const li = document.createElement("li");
  li.setAttribute("data-old-value", text);

  const p = document.createElement("p");
  p.innerText = text;
  p.addEventListener("click", () => {
    li.classList.toggle("done");
  });
  li.appendChild(p);

  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.classList.add("btn", "editBtn");
  editBtn.addEventListener("click", () => {
    inputBox.value = p.innerText;
    inputBox.focus();
    addBtn.innerText = "Update";
    editTarget = li;
  });
  li.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.classList.add("btn", "deleteBtn");
  deleteBtn.addEventListener("click", () => {
    todoList.removeChild(li);
    deleteLocalTodo(p.innerText);
  });
  li.appendChild(deleteBtn);

  todoList.appendChild(li);
};

const saveLocalTodo = (todo) => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const updateLocalTodo = (oldText, newText) => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  const index = todos.indexOf(oldText);
  if (index !== -1) {
    todos[index] = newText;
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};

const deleteLocalTodo = (text) => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos = todos.filter(todo => todo !== text);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const loadTodos = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach(todo => createTodoElement(todo));
};

addBtn.addEventListener("click", addTodo);
document.addEventListener("DOMContentLoaded", loadTodos);
