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
    <div class="ModalWinMain">
        <div class="ModalInputHolder">
            <header class="ModalWinHeader">
                <div class="ModalWinClose">
                    <span data-testid="CloseIcon" data-vc="icon-CloseIcon" aria-hidden="true" class="_1e0c1o8l _1o9zidpf _vyfuvuon _vwz4kb7n _1szv15vq _1tly15vq _rzyw1osq _17jb1osq _1ksvoz0e _3se1x1jp _re2rglyw _1veoyfq0 _1kg81r31 _jcxd1r8n _gq0g1onz _1trkwc43" style="--icon-primary-color: var(--ds-text-accent-gray-bolder, #172B4D); --icon-secondary-color: inherit;"><svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z" fill="currentColor"></path></svg></span>
                </div>
            </header>
            <section>
                <textarea id="ModalInputName"></textarea>
            </section>
            <div>
                <p class="ModalText">Описание</p> 
                <textarea id="ModalInputMainInfo"></textarea>
            </div>
        </div>
        <div class="ModalActionsHolder">
            <div id="ModalOk">Ok</div>
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
                alert("название")
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

createtodo.textContent = "+ добавить колонку";
todoListHolder.append (createtodo);
let createTodoColumnInputValue = ""
// это функция заменяет "добавить колонку" на 2 дива куда нужно вписать название и после оно примется
function createTodoColumn(){
    return new Promise((resolve) => {
    createtodo.classList.add('editing');
    createtodo.innerHTML = `
    <div>
        <textarea placeholder="Введите название" class="CreateColumInput"></textarea>
        <div class="CreateColumAcept">Принять</div>
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
        createtodo.textContent = "+ добавить колонку";
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

        formAcept.addEventListener ('click',  function() {
            AddTodoCard.textContent = "+ создать карточку"
            AddTodoCard.className = "AddTodoCard"
        })
    })

        //берет значения  и создает карточки

        formAcept.addEventListener ('click', function() {
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
            })
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






    //сборка
    todo.append(todoname, todoSetting);
    todoListHolder.append(todo);
    //обнуление инпута
    

    todoListHolder.append (createtodo);
});





