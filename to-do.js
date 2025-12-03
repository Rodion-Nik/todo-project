const AddDiv = document.querySelector('#AddDiv')
const TodoInput = document.querySelector('#todoInput')
const todoListHolder = document.querySelector('#todoListHolder')

//тут значения из ModalWin
let ModalInputNameValue;
let ModalInputDateValue; 
let ModalInputMainInfoValue; 

function ModalWin() {
    return new Promise(function(resolve) {
        // Просто структура модального окна
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
    // объявление всех элементов
    const ModalInputName = document.querySelector('#ModalInputName')
    const ModalInputDate = document.querySelector('#ModalInputDate')
    const ModalInputMainInfo = document.querySelector('#ModalInputMainInfo')
    const ModalOk = document.querySelector('#ModalOk')
    const ModalClose = document.querySelector('#ModalClose')

    //логика кнопки ок а точнее задание значений из input и удаления modal
    ModalOk.addEventListener('click', function() {
        ModalInputNameValue = ModalInputName.value
        ModalInputDateValue = ModalInputDate.value
        ModalInputMainInfoValue = ModalInputMainInfo.value
        if (ModalInputNameValue.trim().length === 0) {
        ModalInputNameValue = " "
    }  
        if (ModalInputDateValue.trim().length === 0 || 
        ModalInputMainInfoValue.trim().length === 0){
        alert("введите дату и описание")
            } else {
                modal.remove();
                resolve();
            }
    })
    //кнопка закрытия modal окна
    ModalClose.addEventListener('click', function() {
        modal.remove()
        ModalInputNameValue = ""
        ModalInputDateValue = ""
        ModalInputMainInfoValue = ""
        resolve();
    })
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
    todoAdd.addEventListener ('click',async function() {
        await ModalWin();
        
        const todoAddDiv = document.createElement('div');
        todoAddDiv.innerHTML = `
        <div class = 'todoAddedDiv'>
            <p class="TackName"></p>
            <p class="TackDate"></p>
            <p class="TackText"></p>
        </div>
        `;
        todoname.appendChild(todoAddDiv)
        const TackName = todoAddDiv.querySelector('.TackName')
        const TackDate = todoAddDiv.querySelector('.TackDate')
        const TackText = todoAddDiv.querySelector('.TackText')

        TackName.textContent = ModalInputNameValue;
        TackDate.textContent = ModalInputDateValue;
        TackText.textContent = ModalInputMainInfoValue;



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





