const AddDiv = document.querySelector('#AddDiv')
const TodoInput = document.querySelector('#todoInput')

AddDiv.addEventListener('click', function()  {
    // основной div который подсасывает текст из input 
    const todo = document.createElement('div');
    let text = TodoInput.value
    todo.className = "todo todoItem"
    todo.textContent = text;
    var test

    // кнопка для удаления
    const todoDel = document.createElement('div')
    todoDel.className = 'todoDel todoItem';
    todoDel.textContent = 'Del'

    const todoAdd = document.createElement('div')
    todoAdd.textContent ='1232'
    todoAdd.addEventListener ('click', () => {

        const todoAddDiv = document.createElement('div');
        todoAddDiv.className = 'todoAddDiv'
        todo.appendChild(todoAddDiv)



    });



    // при клике удаляет сам себя
    todoDel.addEventListener('click', () => {
        todo.remove();
    });


    //сборка
    todo.append(todoAdd, todoDel);
    const todoHolder = document.querySelector('#todoHolder')
    todoHolder.append(todo);

    //обнуление инпута
    TodoInput.value = '';

});



