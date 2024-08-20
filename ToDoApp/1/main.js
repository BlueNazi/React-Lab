document.addEventListener('DOMContentLoaded', function() {
    const todoList = document.getElementById('todo-list');
    const newTodoInput = document.getElementById('new-todo');
    const itemsLeft = document.getElementById('items-left');
    const clearCompletedBtn = document.getElementById('clear-completed');
    const filterButtons = document.querySelectorAll('nav button');
    
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function renderTodos(filter = 'all') {
        todoList.innerHTML = '';
        let filteredTodos = todos.filter(todo => {
            if (filter === 'active') return !todo.completed;
            if (filter === 'completed') return todo.completed;
            return true;
        });

        filteredTodos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = todo.completed ? 'completed' : '';
            li.setAttribute('draggable', true);

            li.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                <span>${todo.text}</span>
                <button class="delete-btn">&times;</button>
            `;

            li.querySelector('input').addEventListener('click', () => {
                todo.completed = !todo.completed;
                updateTodos();
            });

            li.querySelector('.delete-btn').addEventListener('click', () => {
                todos.splice(index, 1);
                updateTodos();
            });

            
            li.addEventListener('dragstart', () => {
                li.classList.add('dragging');
                li.dataset.index = index;
            });

            
            li.addEventListener('dragover', (e) => {
                e.preventDefault();
                const draggingItem = document.querySelector('.dragging');
                const siblings = [...todoList.querySelectorAll('li:not(.dragging)')];
                const nextSibling = siblings.find(sibling => {
                    return e.clientY <= sibling.getBoundingClientRect().top + sibling.getBoundingClientRect().height / 2;
                });

                todoList.insertBefore(draggingItem, nextSibling);
            });

            
            li.addEventListener('drop', () => {
                li.classList.remove('dragging');
                const draggingIndex = parseInt(document.querySelector('.dragging').dataset.index);
                const droppedIndex = [...todoList.children].indexOf(li);

                todos.splice(droppedIndex, 0, todos.splice(draggingIndex, 1)[0]);

                updateTodos();
            });

            todoList.appendChild(li);
        });

        itemsLeft.textContent = `${todos.filter(todo => !todo.completed).length} items left`;
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function updateTodos() {
        renderTodos(document.querySelector('nav button.active').id);
    }

    newTodoInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && newTodoInput.value.trim()) {
            todos.push({ text: newTodoInput.value.trim(), completed: false });
            newTodoInput.value = '';
            updateTodos();
        }
    });

    clearCompletedBtn.addEventListener('click', function() {
        todos = todos.filter(todo => !todo.completed);
        updateTodos();
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderTodos(button.id);
        });
    });

    renderTodos();
});