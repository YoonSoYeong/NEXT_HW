const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const contentInput = document.getElementById('content');

function submitAddTodo(event) {
    event.preventDefault();
    const todo = contentInput.value;
    if (todo) {
        const todoItem = {
            id: Date.now(),
            content: todo,
        };
        paintTodo(todoItem);
        contentInput.value = '';
        updateLocalStorage();
    }
}

function paintTodo(todoItem) {
    var li = document.createElement('li');
    var span = document.createElement('span');
    var btn = document.createElement('button');
    span.innerText = todoItem.content;
    btn.innerText = 'x';
    btn.addEventListener('click', () => {
        li.remove();
        updateLocalStorage();
    });
    li.appendChild(span);
    li.appendChild(btn);
    li.id = todoItem.id; // Assign the id to the list item
    todoList.appendChild(li);
}

function updateLocalStorage() {
    const todos = [];
    const items = todoList.querySelectorAll('li');
    items.forEach((item) => {
        const todoItem = {
            id: item.id,
            content: item.querySelector('span').innerText,
        };
        todos.push(todoItem);
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach((todoItem) => {
        paintTodo(todoItem);
    });
}

// 폼의 submit 이벤트에 submitAddTodo 함수 연결
todoForm.addEventListener('submit', submitAddTodo);

// 페이지가 로드될 때 저장된 할 일 목록을 불러옴
window.addEventListener('load', loadTodos);
