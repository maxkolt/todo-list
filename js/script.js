const addTaskBtn = document.getElementById('btn');
const descTaskInput = document.getElementById('description-task');
const toDosWrapper = document.querySelector('.content-wrapper');

let tasks; // при инициализации проверяем localStoreig и если что-то есть отправляю в масссив
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElems = [];

function Task(description) {
    this.description = description;
    this.completed = false;
}

const createTemplate = (task, index) => {
    return `
    <div class="todo-item ${task.completed ? 'checked' : ''}">
        <div class="description">${task.description}</div>
        <div class="buttons">
            <input onclick="comleteTasks(${index})" class="btn-complete" type="checkbox" ${task.completed ? 'checked' : ''}/>
            <button onclick="deleteTasks(${index})" class="btn btn-danger">Удалить</button>
        </div>
     </div>
    `
}

const filterTask = () => {
    const activeTask = tasks.length && tasks.filter(item => item.completed === false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed === true);
    tasks = [...activeTask,...completedTasks];
}

const fillHtmlList = () => {
    toDosWrapper.innerHTML = '';
    if (tasks.length > 0) {
        filterTask();
        tasks.forEach((item, index) => {
            toDosWrapper.innerHTML += createTemplate(item, index);
        });
        todoItemElems = document.querySelectorAll('.todo-item');
    }
}
fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const comleteTasks = index => {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        todoItemElems[index].classList.add('checked');
    } else {
        todoItemElems[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();
}

// по клику создаем новый обьект и предаем его в массив таскс
addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(descTaskInput.value));
    console.log(tasks);
    updateLocal();
    fillHtmlList();
    descTaskInput.value = '';
})

const deleteTasks = index => {
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
}