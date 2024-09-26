const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

const displayTodos = () => {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const todoItem = document.createElement('li');
    
    const textNode = document.createElement('span');
    textNode.textContent = todo.text;
    
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit');
    editBtn.onclick = () => editTodo(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteTodo(index);

    todoItem.appendChild(textNode);
    todoItem.appendChild(editBtn);
    todoItem.appendChild(deleteBtn);
    
    todoList.appendChild(todoItem);
  });
};

const addTodo = () => {
  const todoText = todoInput.value.trim();
  if (todoText) {
    todos.push({ text: todoText });
    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodos();
    todoInput.value = '';
  }
};

const deleteTodo = (index) => {
  todos.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  displayTodos();
};

const editTodo = (index) => {
  const newTodo = prompt('Edit your to-do:', todos[index].text);
  if (newTodo !== null) {
    todos[index].text = newTodo.trim();
    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodos();
  }
};

addBtn.addEventListener('click', addTodo);
window.addEventListener('load', displayTodos);
