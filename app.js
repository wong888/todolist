document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // 从本地存储加载待办事项
    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => addTodoToDOM(todo.text, todo.completed));
    }

    // 保存待办事项到本地存储
    function saveTodos() {
        const todos = [];
        document.querySelectorAll('.todo-item').forEach(item => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            const label = item.querySelector('label');
            todos.push({
                text: label.textContent,
                completed: checkbox.checked
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // 添加待办事项到DOM
    function addTodoToDOM(text, completed = false) {
        const li = document.createElement('li');
        li.className = `todo-item ${completed ? 'completed' : ''}`;

        li.innerHTML = `
            <input type="checkbox" ${completed ? 'checked' : ''}>
            <label>${text}</label>
            <button class="delete-btn">删除</button>
        `;

        // 复选框状态变化事件
        const checkbox = li.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', function() {
            li.classList.toggle('completed', this.checked);
            saveTodos();
        });

        // 删除按钮事件
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            li.remove();
            saveTodos();
        });

        todoList.appendChild(li);
    }

    // 表单提交事件
    todoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const todoText = todoInput.value.trim();

        if (todoText !== '') {
            addTodoToDOM(todoText);
            todoInput.value = '';
            saveTodos();
        }
    });

    // 初始化加载待办事项
    loadTodos();
});