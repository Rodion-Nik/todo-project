const AddDiv = document.querySelector('#AddDiv')
const TodoInput = document.querySelector('#todoInput')
const todoListHolder = document.querySelector('#todoListHolder')

let formText = ""



//тут значения из ModalWin
let ModalInputNameValue;
let ModalInputMainInfoValue; 
let modalCheck = true
// устаревшая функция, мб использую потом
function ModalWin() {
    return new Promise(function(resolve) {
        // Просто структура модального окна
    modalCheck = true
    const modal = document.createElement('div')
    modal.innerHTML = `
    <div class="ModalInputHolder">
    <div class="ModalWinMain">
        <header class="ModalWinHeader">
        <div class="ModalTitle"></div>
        <button class="ModalWinClose" type="button">✕</button>
        </header>

        <div class="ModalBody">
        <div class="ModalField">
            <label class="ModalLabel" for="ModalInputName">Titel</label>
            <textarea id="ModalInputName"></textarea>
        </div>

        <div class="ModalField">
            <label class="ModalLabel" for="ModalInputMainInfo">Beschreibung</label>
            <textarea id="ModalInputMainInfo"></textarea>
        </div>
        </div>

        <div class="ModalActionsHolder">
        <button id="ModalOk" type="button">Speichern</button>
        </div>
    </div>
    </div>`;

    document.body.append(modal);
    // объявление всех элементов
    const ModalInputName = document.querySelector('#ModalInputName')
    const ModalInputMainInfo = document.querySelector('#ModalInputMainInfo')
    const ModalOk = document.querySelector('#ModalOk')

    ModalInputMainInfo.addEventListener("input", () => {
        const maxHeight = 200;

        ModalInputMainInfo.style.height = "auto";

        if (ModalInputMainInfo.scrollHeight > maxHeight) {
            ModalInputMainInfo.style.height = maxHeight + "px";
            ModalInputMainInfo.style.overflowY = "auto"; // включаем скролл
        } else {
            ModalInputMainInfo.style.height = ModalInputMainInfo.scrollHeight + "px";
            ModalInputMainInfo.style.overflowY = "hidden"; // отключаем скролл
        }
    });
    
    ModalInputName.addEventListener("input", () => {
        const maxHeight = 300;

        ModalInputName.style.height = "auto";

        if (ModalInputName.scrollHeight > maxHeight) {
            ModalInputName.style.height = maxHeight + "px";
            ModalInputName.style.overflowY = "auto"; // включаем скролл
        } else {
            ModalInputName.style.height = ModalInputName.scrollHeight + "px";
            ModalInputName.style.overflowY = "hidden"; // отключаем скролл
        }
    });

    ModalInputName.value = ModalInputNameValue || "";
    ModalInputMainInfo.value = ModalInputMainInfoValue || "";

    //логика кнопки ок а точнее задание значений из input и удаления modal
    ModalOk.addEventListener('click', function() {
        ModalInputMainInfoValue = ModalInputMainInfo.value
        ModalInputNameValue = ModalInputName.value

        if ( ModalInputNameValue.trim().length === 0){
                
            } else {
                modal.remove();
                resolve();
            }
    })
    //кнопка закрытия modal окна
    const ModalWinClose = modal.querySelector('.ModalWinClose') 
    ModalWinClose.addEventListener('click', function() {
        modal.remove()
        modalCheck = false
        resolve();
    })
    })
}



const createtodo = document.createElement('div');
createtodo.className="createtodo";

createtodo.textContent = "+ Liste hinzufügen";
todoListHolder.append (createtodo);
let createTodoColumnInputValue = ""
// это функция заменяет "добавить колонку" на 2 дива куда нужно вписать название и после оно примется
function createTodoColumn(){
    return new Promise((resolve) => {
    createtodo.classList.add('editing');
    createtodo.innerHTML = `
    <div>
        <textarea placeholder="Titel eingeben" class="CreateColumInput"></textarea>
        <div class="CreateColumAcept">Bestätigen</div>
    </div>
    `
    const createTodoColumnInput =  createtodo.querySelector(".CreateColumInput")
    createTodoColumnInput.addEventListener("input", () => {
    createTodoColumnInput.style.height = "auto";           // сбрасываем высоту
    createTodoColumnInput.style.height = createTodoColumnInput.scrollHeight + "px"; // устанавливаем нужную
    })
    const CreateColumAcept = createtodo.querySelector('.CreateColumAcept')
    CreateColumAcept.addEventListener ('click', function (e) {
        e.stopPropagation(); 

        createTodoColumnInputValue = createTodoColumnInput.value
        
        if (createTodoColumnInputValue.trim().length >= 1 ) {
        createtodo.classList.remove("editing");
        createtodo.innerHTML = ``
        createtodo.className = "createtodo";
        createtodo.textContent = "+ Liste hinzufügen";
        resolve(createTodoColumnInputValue);}
        
    })}) 

}

createtodo.addEventListener('click', async function()  {
; 

    if (createtodo.classList.contains('editing')) return; 
    await createTodoColumn();

    // основной todo div 
    const todo = document.createElement('div');
    todo.className = "todo"

    //тоже самое что и в карточке только для колонки
    
    
    //карточка "создать карточку"
    const AddTodoCard = document.createElement('div')
    AddTodoCard.textContent = "+ Karte hinzufügen"
    AddTodoCard.className = "AddTodoCard"

    //имя основного блока
    const todoname = document.createElement('div');
    todoname.className ="todoname"
    todoname.textContent = createTodoColumnInputValue
    todoname.append(AddTodoCard)

    const form = document.createElement('div')
    form.innerHTML = `
        <div>
            <textarea placeholder="Titel eingeben" class="formInput"></textarea>
            <div class="formAcept">Bestätigen</div>
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

        formAcept.addEventListener ('click',  function() {
            AddTodoCard.textContent = "+ Karte hinzufügen"
            AddTodoCard.className = "AddTodoCard"
        })
    })

        //берет значения  и создает карточки
        
        formAcept.addEventListener ('click', function() {
            console.log('123');
            if ( formInputValue.value.trim().length === 0){
            } else {
            const todoAddDiv = document.createElement('div');
            formText = formInputValue.value
            todoAddDiv.innerHTML = `
            <div class = 'todoAddedDiv'>
                <div class="CloseAddedDiv">X</div>
                <div class="AddedDivText"></div>
                
            </div>`;
            const AddedDivText = todoAddDiv.querySelector(".AddedDivText")
            AddedDivText.textContent = formText

            //описание
            AddedDivText.dataset.description = "";
            

            
            const CloseAddedDiv = todoAddDiv.querySelector(".CloseAddedDiv")
            CloseAddedDiv.addEventListener ('click', function() {
                todoAddDiv.remove()
            }) 


            todoname.appendChild(todoAddDiv)
            todoname.append(AddTodoCard)
            AddedDivText.addEventListener ('click', async function() {
                ModalInputNameValue = AddedDivText.textContent
                ModalInputMainInfoValue = AddedDivText.dataset.description || ""
                await ModalWin()
                AddedDivText.textContent = ModalInputNameValue
                AddedDivText.dataset.description = ModalInputMainInfoValue
            })}
            });

        
    //троеточие в котором можно будет добавить или удалить 
    let todoSettingCheck = false
    const todoSetting = document.createElement('div')
    todoSetting.textContent = "..."
    todoSetting.className = "todoSetting"

    todoSetting.addEventListener('click', function(e) {
        const settingList = document.createElement('div')

        if (todoSettingCheck == false) {
        settingList.className = "SettingList"
        settingList.innerHTML = `
        <div class="SettingHolder">
            <div class="todoDelete">Karte löschen</div>
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






    //сборка
    todo.append(todoname, todoSetting);
    todoListHolder.append(todo);
    //обнуление инпута
    

    todoListHolder.append (createtodo);
});





