let allTasks = [];
const form = document.getElementById('form');
const todoText = document.getElementById('todoText');
const ul = document.getElementById('todoList');
let taskid = 0

form.addEventListener('submit',event => {
    event.preventDefault();
    const obj = {
        text:'',
        id:taskid
    };
    obj.text = todoText.value.trim();
    obj.id= taskid
    allTasks.push(obj)
    const li = document.createElement('li')

    li.setAttribute("id", 'task' + obj.id);
    const btn = document.createElement('button')
    
    btn.innerHTML = "CLICK ME";
    btn.onclick = function(){
        deleteTask(obj.id)
    }
    li.appendChild(document.createTextNode(obj.text))
    li.appendChild(btn)
    
    ul.appendChild(li);
    taskid = taskid + 1

})

function deleteTask(id){
    document.getElementById("task"+ id).remove();
}
