const AddDiv = document.querySelector('#AddDiv')
const TodoInput = document.querySelector('#todoInput')
const todoListHolder = document.querySelector('#todoListHolder')

let ModalInputNameValue;
let ModalInputDateValue; 
let ModalInputMainInfoValue; 

function ModalWin() {
    const modal = document.createElement('div')
    modal.innerHTML = `
    <div class="ModalWinMain">
        <div> 123
            <p class="ModalText">Введите название (опцеонально)</p> 
            <input id="ModalInputName">
            <p class="ModalText">Введите дату</p> 
            <input id="ModalInputDate">
            <p class="ModalText">Описание</p> 
            <input id="ModalInputMainInfo">
        </div>
        <div>
            <div id="ModalOk">Ok</div>
            <div id="ModalClose">Close</div>
        </div>
    </div>`;
    document.body.append(modal);

    const ModalInputName = document.querySelector('#ModalInputName')
    const ModalInputDate = document.querySelector('#ModalInputDate')
    const ModalInputMainInfo = document.querySelector('#ModalInputMainInfo')
    const ModalOk = document.querySelector('#ModalOk')
    const ModalClose = document.querySelector('#ModalClose')


    ModalOk.addEventListener('click', function() {
        console.log('123');
        
        ModalInputNameValue = ModalInputName.value
        ModalInputDateValue = ModalInputDate.value
        ModalInputMainInfoValue = ModalInputMainInfo.value
        if (ModalInputNameValue.trim().length === 0) {
        ModalInputNameValue = ""
    }  
        if (ModalInputDateValue.trim().length === 0 || 
        ModalInputMainInfoValue.trim().length === 0){
        alert("введите дату и описание")
            } else {
                modal.remove();
            }
    })

    ModalClose.addEventListener('click', function() {
        modal.remove()
        ModalInputNameValue = ""
        ModalInputDateValue = ""
        ModalInputMainInfoValue = ""
    })

    
}


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
    todoAdd.addEventListener ('click', function() {
        ModalWin();

        const todoAddDiv = document.createElement('div');
        todoAddDiv.className = 'todoAddedDiv'
        todoname.appendChild(todoAddDiv)

        todoAddDiv.addEventListener ('click', function() {
            todoAddDiv.remove()
        })


    });



    // при клике удаляет сам себя
    todoDel.addEventListener('click', function() {
        todo.remove();
    });


    //сборка
    todo.append(todoname, todoAdd, todoDel);
    todoListHolder.append(todo);

    //обнуление инпута
    TodoInput.value = '';

});





