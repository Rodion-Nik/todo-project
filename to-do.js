const AddDiv = document.querySelector('#AddDiv')
const TodoInput = document.querySelector('#todoInput')

AddDiv.addEventListener('click', function()  {
    // основной todo div 
    const todo = document.createElement('div');
    todo.className = "todo todoItem"



    // text из input
    let text = TodoInput.value
    const todoname = document.createElement('div');
    todoname.textContent = text



    // кнопка для удаления
    const todoDel = document.createElement('div')
    todoDel.className = 'todoDel todoItem';
    todoDel.textContent = 'Del'

    const todoAdd = document.createElement('div')
    todoAdd.textContent ='add'
    todoAdd.className = "todoAdd"
    todoAdd.addEventListener ('click', () => {

        const todoAddDiv = document.createElement('div');
        todoAddDiv.className = 'todoAddedDiv'
        todoname.appendChild(todoAddDiv)



    });



    // при клике удаляет сам себя
    todoDel.addEventListener('click', () => {
        todo.remove();
    });


    //сборка
    todo.append(todoname, todoAdd, todoDel);
    const todoHolder = document.querySelector('#todoHolder')
    todoHolder.append(todo);

    //обнуление инпута
    TodoInput.value = '';

});



