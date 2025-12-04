const AddDiv = document.querySelector('#AddDiv')
const TodoInput = document.querySelector('#todoInput')
const todoListHolder = document.querySelector('#todoListHolder')

//тут значения из ModalWin
let ModalInputNameValue;
let ModalInputDateValue; 
let ModalInputMainInfoValue; 

let modalCheck = true

function ModalWin() {
    return new Promise(function(resolve) {
        // Просто структура модального окна
    modalCheck = true
    const modal = document.createElement('div')
    modal.innerHTML = `
    <div class="ModalWinMain">
        <div class="ModalInputHolder">
            <p class="ModalText">Введите название (опцеонально)</p> 
            <input id="ModalInputName">
            <p class="ModalText">Введите дату</p> 
            <input id="ModalInputDate">
            <p class="ModalText">Описание</p> 
            <input id="ModalInputMainInfo">
        </div>
        <div class="ModalActionsHolder">
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
        modalCheck = false
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

    //троеточие в котором можно будет добавить или удалить 
    let todoSettingCheck = false
    const todoSetting = document.createElement('div')
    
    todoSetting.className = "todoSetting"
    todoSetting.addEventListener('click', function() {
        if (todoSettingCheck == false) {
        const settingList = document.createElement('div')
        settingList.className = "SettingList"
        settingList.innerHTML = `
        <div class="SettingHolder">
            <div class="todoCreate">Add</div>
            <div class="todoDelete">Del</div>
        </div>
        `
        todoSetting.append(settingList)
        todoSettingCheck = true

        
        //берет значения из модалки и создает карточки
        const todoCreate = todoSetting.querySelector(".todoCreate")
        todoCreate.addEventListener ('click',async function() {
            await ModalWin();
            const todoAddDiv = document.createElement('div');
            todoAddDiv.innerHTML = `
            <div class = 'todoAddedDiv'>
                <p class="TackName"></p>
                <p class="TackDate"></p>
                <p class="TackText"></p>
                <div class="CloseAddedDiv">X</div>
            </div>
            `;
            todoname.appendChild(todoAddDiv)
            const TackName = todoAddDiv.querySelector('.TackName')
            const TackDate = todoAddDiv.querySelector('.TackDate')
            const TackText = todoAddDiv.querySelector('.TackText')

            TackName.textContent = ModalInputNameValue;
            TackDate.textContent = ModalInputDateValue;
            TackText.textContent = ModalInputMainInfoValue;
            if (modalCheck == false) {
                todoAddDiv.remove()
            }
            
            const CloseAddedDiv = todoAddDiv.querySelector(".CloseAddedDiv")
            CloseAddedDiv.addEventListener ('click', function() {
                todoAddDiv.remove()
            })
            
        });



        //логика кнопки удаления
        const todoDelete = todoSetting.querySelector(".todoDelete") 
        todoDelete.addEventListener('click', function() {
            todo.remove();
        });

        //закрытие 
        }  else {
            const SettingList = todoSetting.querySelector('.SettingList')
            SettingList.remove()
            todoSettingCheck = false
        }});
    


    //сборка
    todo.append(todoname, todoSetting);
    todoListHolder.append(todo);

    //обнуление инпута
    TodoInput.value = '';

});





