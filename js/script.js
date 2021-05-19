//
// ─── VARIABLES ──────────────────────────────────────────────────────────────────
//
let allTasks = [];
const form = document.getElementById('form');
const todoText = document.getElementById('todoText');
const tasksDiv = document.getElementById('todoList');
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

    if (allTasks != null) {
        for (let i = 0; i < allTasks.length; i++) {

            const div = document.createElement('div')
            const btn = document.createElement('button')
            const checkbox = document.createElement('input')
            const label = document.createElement('label')


            div.setAttribute("id", allTasks[i].id);
            div.setAttribute("class", 'align-items-center paperStyle clearfix')


            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("id", "checkbox" + allTasks[i].id);

            checkbox.onclick = function () {
                const divElem = document.getElementById("checkbox" + allTasks[i].id).checked;
                //obj.checked = liElem

                allTasks = JSON.parse(window.localStorage.getItem('todoList'));
                

                allTasks[i].checked = divElem

                window.localStorage.setItem('todoList', JSON.stringify(allTasks));
            }

            label.htmlFor =  "checkbox" + allTasks[i].id ;
            label.innerHTML = allTasks[i].text;
            //
            // ─── DOMCONTENTLOADED TO LOAD CHECKBOX INTO DOM AFTER ITS CREATED 
            //https://stackoverflow.com/questions/45873747/typeerror-cannot-set-property-checked-of-null-for-checkbox
            document.addEventListener("DOMContentLoaded", function () {
                document.getElementById("checkbox" + allTasks[i].id).checked = allTasks[i].checked
            });

           
            btn.setAttribute("class", 'btn btn-danger')
            btn.innerHTML = "<i class='bi bi-trash'></i>";
            let idtodelete = allTasks[i].id 
            btn.onclick = function () {
                debugger
                deleteTask(idtodelete)
            }
            div.appendChild(checkbox)
            div.appendChild(label)
            div.appendChild(btn)

            tasksDiv.appendChild(div);
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
        id: taskid,
        checked: false,
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
    const div = document.createElement('div')
    const btn = document.createElement('button')
    const checkbox = document.createElement('input')
    const label = document.createElement('label')
 
    div.setAttribute("id", obj.id);
    div.setAttribute("class", 'align-items-center paperStyle clearfix ')

    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", "checkbox" + obj.id);
    checkbox.onclick = function () {
        const divElem = document.getElementById("checkbox" + obj.id).checked;

        allTasks = JSON.parse(window.localStorage.getItem('todoList'));
        for (let i = 0; i < allTasks.length; i++) {
            if (obj.id === allTasks[i].id) {
                allTasks[i].checked = divElem
            };
        }
        window.localStorage.setItem('todoList', JSON.stringify(allTasks));
    }

    label.htmlFor =  "checkbox" + obj.id ;
    label.innerHTML = obj.text;

    btn.setAttribute("class", 'btn btn-danger')
    btn.innerHTML = "<i class='bi bi-trash'></i>";
    btn.onclick = function () {
        deleteTask(obj.id)
    }
    div.appendChild(checkbox)
    div.appendChild(label)
    div.appendChild(btn)

    tasksDiv.appendChild(div);
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