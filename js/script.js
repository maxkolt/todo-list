const addTascyBtn = document.getElementById('btn');
const descTascyInput = document.getElementById('description-task');
const toDosWrapper = document.querySelector('.content-wrapper');

let tasks;
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
            <button onclick="deleteTasks(${index})" class="btn-delete">Delete</button>
        </div>
     </div>
   `
}

const fillHtmlList = () => {
    toDosWrapper.innerHTML = '';
    if (tasks.length > 0) {
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

addTascyBtn.addEventListener('click', () => {
    tasks.push(new Task(descTascyInput.value));
    console.log(tasks);
    updateLocal();
    fillHtmlList();
    descTascyInput.value = '';
})

const deleteTasks = index => {

}