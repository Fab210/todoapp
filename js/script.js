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

    if (allTasks != null) {
        for (let i = 0; i < allTasks.length; i++) {

            const li = document.createElement('li')
            const btn = document.createElement('button')
            const checkbox = document.createElement('input')


            li.setAttribute("id", allTasks[i].id);
            li.setAttribute("class", 'list-group-item d-flex justify-content-between align-items-center')


            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("id", "checkbox" + allTasks[i].id);

            checkbox.onclick = function () {
                const liElem = document.getElementById("checkbox" + allTasks[i].id).checked;
                //obj.checked = liElem

                allTasks = JSON.parse(window.localStorage.getItem('todoList'));
                

                allTasks[i].checked = liElem

                window.localStorage.setItem('todoList', JSON.stringify(allTasks));
                //const selectedCheckbox = liElem.querySelector('input[type=checkbox]')

                //liElem.checked = true



            }
            //
            // ─── DOMCONTENTLOADED TO LOAD CHECKBOX INTO DOM AFTER ITS CREATED 
            //https://stackoverflow.com/questions/45873747/typeerror-cannot-set-property-checked-of-null-for-checkbox
            document.addEventListener("DOMContentLoaded", function () {
                document.getElementById("checkbox" + allTasks[i].id).checked = allTasks[i].checked
            });
            
            btn.setAttribute("class", 'btn btn-danger')
            btn.innerHTML = "<i class='bi bi-trash'></i>";
            btn.onclick = function () {
                deleteTask(allTasks[i].id)
            }
            li.appendChild(checkbox)
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
    const li = document.createElement('li')
    const btn = document.createElement('button')
    const checkbox = document.createElement('input')


    li.setAttribute("id", obj.id);
    li.setAttribute("class", 'list-group-item d-flex justify-content-between align-items-center')


    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", "checkbox" + obj.id);
    checkbox.onclick = function () {
        const liElem = document.getElementById("checkbox" + obj.id).checked;
        //obj.checked = liElem

        allTasks = JSON.parse(window.localStorage.getItem('todoList'));
        debugger
        for (let i = 0; i < allTasks.length; i++) {
            if (obj.id === allTasks[i].id) {
                allTasks[i].checked = liElem
            };
        }
        window.localStorage.setItem('todoList', JSON.stringify(allTasks));
        //const selectedCheckbox = liElem.querySelector('input[type=checkbox]')

        //liElem.checked = true



    }
    btn.setAttribute("class", 'btn btn-danger')
    btn.innerHTML = "<i class='bi bi-trash'></i>";
    btn.onclick = function () {
        deleteTask(obj.id)
    }
    li.appendChild(checkbox)
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