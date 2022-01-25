const addTascyBtn = document.getElementById('btn');
const descTascyInput = document.getElementById('description-task');
const toDosWrapper = document.querySelector('.content-wrapper');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

function Task(description) {
    this.description = description;
    this.completed = false;
}

const createTemplate = (task, index) => {
    return  `
    <div className="todo-item">
        <div className="description">${task.description}</div>
        <div className="bottons">
            <input className="btn-complete" type="checkbox"/>
            <button className="btn-delete">Delete</button>
        </div>
     </div>
   `
}

const fillHtmlList = () => {
    toDosWrapper.innerHTML = '';
    if (tasks.length > 0) {
        tasks.forEach((item, index) => {
            toDosWrapper.innerHTML += createTemplate(item, index);
        })
    }
}
fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))

}
addTascyBtn.addEventListener('click', () => {
    tasks.push(new Task(descTascyInput.value));
    console.log(tasks);
    updateLocal();
    fillHtmlList();
})