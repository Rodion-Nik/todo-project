const AddDiv = document.querySelector('#AddDiv')
const TodoInput = document.querySelector('#todoInput')
const todoListHolder = document.querySelector('#todoListHolder')

let formText = ""

//тут значения из ModalWin
let ModalInputNameValue;
let ModalInputDateValue; 
let ModalInputMainInfoValue; 
let modalCheck = true
// устаревшая функция, мб использую потом
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


const createtodo = document.createElement('div');
createtodo.className="createtodo";
createtodo.textContent = "+ добавить колонку";
todoListHolder.append (createtodo);
let createTodoColumnInputValue = ""
function createTodoColumn(){
    createtodo.classList.add('editing');
    createtodo.innerHTML = `
    <div>
        <textarea placeholder="Введите название" class="CreateColumInput"></textarea>
        <div class="CreateColumAcept">Принять</div>
    </div>
    `
    const createTodoColumnInput =  createtodo.querySelector(".CreateColumInput")
    

    const CreateColumAcept = createtodo.querySelector('.CreateColumAcept')
    CreateColumAcept.addEventListener ('click', function (e) {
        e.stopPropagation(); 
        createTodoColumnInputValue = createTodoColumnInput.value
        createtodo.classList.remove("editing");
        createtodo.innerHTML = ``
        createtodo.className = "createtodo";
        createtodo.textContent = "+ добавить колонку";

    })

}

createtodo.addEventListener('click', function(ee)  {
     ee.stopPropagation(); 

    if (createtodo.classList.contains('editing')) return;
    createTodoColumn();
    // основной todo div 
    const todo = document.createElement('div');
    todo.className = "todo"

    //тоже самое что и в карточке только для колонки
    
    
    // text из input
    
    
    
    //карточка "создать карточку"
    const AddTodoCard = document.createElement('div')
    AddTodoCard.textContent = "+ создать карточку"
    AddTodoCard.className = "AddTodoCard"

    //имя основного блока
    const todoname = document.createElement('div');
    todoname.className ="todoname"
    todoname.textContent = createTodoColumnInputValue
    todoname.append(AddTodoCard)


    const form = document.createElement('div')
    form.innerHTML = `
        <div>
            <textarea placeholder="Введите название" class="formInput"></textarea>
            <div class="formAcept">Принять</div>
        </div>
        `

    
    const formInputValue = form.querySelector(".formInput")
    formInputValue.addEventListener("input", () => {
        formInputValue.style.height = "auto";           // сбрасываем высоту
    formInputValue.style.height = formInputValue.scrollHeight + "px"; // устанавливаем нужную
    });
    const formAcept = form.querySelector(".formAcept")
    AddTodoCard.addEventListener('click', function() {        
        AddTodoCard.textContent = ""
        AddTodoCard.className=""
        form.addEventListener('click', function(e) {
            e.stopPropagation(); 
        });
        AddTodoCard.append(form)



        formAcept.addEventListener ('click', async function() {
            
            
            
            AddTodoCard.textContent = "+ создать карточку"
            AddTodoCard.className = "AddTodoCard"
            

        })


    })

    //троеточие в котором можно будет добавить или удалить 
    let todoSettingCheck = false
    const todoSetting = document.createElement('div')
    todoSetting.textContent = "..."
    todoSetting.className = "todoSetting"
    todoSetting.addEventListener('click', function() {
        if (todoSettingCheck == false) {
        const settingList = document.createElement('div')
        settingList.className = "SettingList"
        settingList.innerHTML = `
        <div class="SettingHolder">
            <div class="todoDelete">Del</div>
        </div>`
        todoSetting.append(settingList)
        todoSettingCheck = true
        //логика кнопки удаления
            const todoDelete = settingList.querySelector(".todoDelete") 
            todoDelete.addEventListener('click', function() {
            todo.remove();
        });
                //закрытие 
        }  else {
            const SettingList = todoSetting.querySelector('.SettingList')
            SettingList.remove()
            todoSettingCheck = false
        }});

        


        //берет значения из модалки и создает карточки

        formAcept.addEventListener ('click', function() {
            const todoAddDiv = document.createElement('div');
            console.log('form acept');
            formText = formInputValue.value
            todoAddDiv.innerHTML = `
            <div class = 'todoAddedDiv'>
                <div class="CloseAddedDiv">X</div>
                <div class="AddedDivText"></div>
                
            </div>`;
            const AddedDivText = todoAddDiv.querySelector(".AddedDivText")
            AddedDivText.textContent = formText

            
            const CloseAddedDiv = todoAddDiv.querySelector(".CloseAddedDiv")
            CloseAddedDiv.addEventListener ('click', function() {
                todoAddDiv.remove()
            }) 


            todoname.appendChild(todoAddDiv)
            todoname.append(AddTodoCard)

            

            });






    //сборка
    todo.append(todoname, todoSetting);
    todoListHolder.append(todo);
    //обнуление инпута
    TodoInput.value = '';
    

    todoListHolder.append (createtodo);
});





