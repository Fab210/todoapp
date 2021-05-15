//
// ─── VARIABLES ──────────────────────────────────────────────────────────────────
//
let allTasks = [];
const form = document.getElementById('form');
const todoText = document.getElementById('todoText');
const ul = document.getElementById('todoList');
let taskid = 0

//
// ─── FUNCTIONS ──────────────────────────────────────────────────────────────────
//  
getTodolistLocalstorage();


//
// ─── RENDER TASKS FROM LOCALSTORAGE ─────────────────────────────────────────────
//
function getTodolistLocalstorage() {
    allTasks = JSON.parse(window.localStorage.getItem('todoList'));
    debugger
    if (allTasks != null) {
        for (let i = 0; i < allTasks.length; i++) {

            const li = document.createElement('li')

            li.setAttribute("id", allTasks[i].id);
            li.setAttribute("class", 'list-group-item d-flex justify-content-between align-items-center')

            const btn = document.createElement('button')
            btn.setAttribute("class", 'btn btn-danger')
            btn.innerHTML = "<i class='bi bi-trash'></i>";
            btn.onclick = function () {
                deleteTask(allTasks[i].id)
            }
            li.appendChild(document.createTextNode(allTasks[i].text))
            li.appendChild(btn)

            ul.appendChild(li);
            taskid = taskid + 1
        }
    } else {
        allTasks = []
        return;
    }
}


//
// ─── SUBMIT TODO TASK ───────────────────────────────────────────────────────────
//
form.addEventListener('submit', event => {
    // prevent reloading page on submit
    event.preventDefault();

    const obj = {
        text: '',
        id: taskid
    };
    obj.text = todoText.value.trim();
    // input must not be empty
    if (obj.text == '') {
        return;
    }
    // search highest id on array to add a new task with new highest id
    if (allTasks.length > 0) {
        const maxId = allTasks.reduce(
            (max, Tasks) => (Tasks.id > max ? Tasks.id : max),
            allTasks[0].id
        );
        obj.id = maxId + 1
    } else {
        obj.id = 0
    }
    // add task in task Array
    allTasks.push(obj)
    // save tasks on localstorage
    window.localStorage.setItem('todoList', JSON.stringify(allTasks));
    // reset input value
    todoText.value = ''

    //create li and button element to add on list
    const li = document.createElement('li')

    li.setAttribute("id", obj.id);
    li.setAttribute("class", 'list-group-item d-flex justify-content-between align-items-center')

    const btn = document.createElement('button')
    btn.setAttribute("class", 'btn btn-danger')
    btn.innerHTML = "<i class='bi bi-trash'></i>";
    btn.onclick = function () {
        deleteTask(obj.id)
    }
    li.appendChild(document.createTextNode(obj.text))
    li.appendChild(btn)

    ul.appendChild(li);
    taskid = taskid + 1
})


//
// ─── DELETE SPECIFIC TASK ───────────────────────────────────────────────────────
//
function deleteTask(id) {
    document.getElementById(id).remove();
    allTasks = JSON.parse(window.localStorage.getItem('todoList'));
    for (let i = 0; i < allTasks.length; i++) {
        if (id === allTasks[i].id) {
            allTasks.splice(i, 1)
        };
    }
    window.localStorage.setItem('todoList', JSON.stringify(allTasks));
}