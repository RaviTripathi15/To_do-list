const addTodoBtn = document.getElementById("addTodoBtn")
const inputTag = document.getElementById("todoInput")
const todoListUl = document.getElementById("todoList")

let todoText; //This should be populated when the user clicks on add button  
let todos = [];
let todosString = localStorage.getItem("todos")
// if we have todos in the localstorage we will read it 
if (todosString) {
    todos = JSON.parse(todosString)
}


const populateTodos = ()=> {
    let string = ""
    for(const todo of todos) {
        string += `<li id="todo-${todo.id}" class="todo-item ${todo.isCompleted? "completed" : ""}">
        <input title="text" type="checkbox" class="todo-checkbox" ${todo.isCompleted? "checked" : ""} >
        <span class="todo-text">${todo.title}</span>
        <button class="delete-btn">×</button>
        </li>`
    }
    todoListUl.innerHTML = string

//handle the delete buttons 
  let deleteBtns = document.querySelectorAll(".delete-btn")

deleteBtns.forEach((element)=> {
 element.addEventListener("click", (e)=> {
     console.log(e.target.parentNode.id)
     todos = todos.filter((todo)=> {
        return ("todo-" + todo.id) !== e.target.parentNode.id
    })
    localStorage.setItem("todos", JSON.stringify(todos))
    populateTodos()
 })
})
}


addTodoBtn.addEventListener("click", ()=> {
      
    inputTag.value = ""
    if (todoText.trim().length < 4) {
        alert("you cannot add a todo that small")
        return
    }
    let todo = {
       id:"todo-" + Date.now(), 
       title: todoText,
       isCompleted: false    
    }

    todos.push(todo)
    // todo = todo.map((todo) => {
    //     return{...todo, id: i}
    // })

    localStorage.setItem("todos", JSON.stringify(todos))
    populateTodos()
})

populateTodos()

const todoCheckboxes = document.querySelectorAll(".todo-checkbox")

todoCheckboxes.forEach((element)=> {
    element.addEventListener("click", (e)=>{
    if (e.target.checked) {
        element.parentNode.classList.add("completed")
        console.log(element.parentNode.id)
        // grab this todo from todos array and update the todos array to set this todos isCompleted attributes as true 
         todos = todos.map(todo =>{

            if ("todo-"+ todo.id == element.parentNode.id) {
                return {...todo, isCompleted: true}
            }else{
              
                return todo
            }
         })
        
         localStorage.setItem("todos", JSON.stringify(todos))
    }
    else {
        element.parentNode.classList.remove("completed")
               // grab this todo from todos array and update the todos array to set this todos isCompleted attributes as true 
         todos = todos.map(todo =>{
          
            if ("todo-"+ todo.id == element.parentNode.id) {
                return {...todo, isCompleted: false}
            }else{        
                return todo
            }
         })
      
         localStorage.setItem("todos", JSON.stringify(todos))
    }         
    })
})



