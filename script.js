// UI vars
const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;  

/// Call Load items
loadItems();

// Call event Listeners
eventListeners();

function eventListeners() {
    //submit event
    form.addEventListener('submit', addNewItem);

    // delete an item
    taskList.addEventListener('click',deleteItem);


    // delete all items
    btnDeleteAll.addEventListener('click',deleteAllItems);
}

function loadItems(){

    items = getItemsFromLS();
    items.forEach(function(item){
        createItem(item);
    })
}

// Get item from Local Storage
function getItemsFromLS(){
    if(localStorage.getItem('items') === null){
        items = [];
    }
    else 
    {
        items = JSON.parse(localStorage.getItem('items'));
        
    }
    return items;
}

// Set item to local storage
function setItemToLS(text){
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}

// delete item form LS
function deleteItemFromLS(text){

    items = getItemsFromLS();
    items.forEach(function(item,index){
        if(item == text){
            items.splice(index,1);
        }
        
    });
    localStorage.setItem('items',JSON.stringify(items));
}

function createItem(text){
    
    // create new li
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));


    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href','#');
    a.innerHTML = '<i class="fas fa-times"></li>';

    // add a to li 
    li.appendChild(a);

    // add li to ul
    taskList.appendChild(li);
}

// add new item
function addNewItem(e) {

    if (input.value === '') {
        alert('Yeni bir görev giriniz !!');
    }

    //create item from input
    createItem(input.value);

    //save to LS
    setItemToLS(input.value);

    //clear input
    input.value = '';

    e.preventDefault();

}

//delete an item
function deleteItem(e){
    
   
        if(e.target.className === 'fas fa-times'){
           
            if(confirm('Eminmisin ?'))
            {
            e.target.parentElement.parentElement.remove();

            // delete item from LS
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
            }
        }
    
    e.preventDefault();
}

// delete all items
function deleteAllItems(e){
   
   //taskList.innerHTML = '';

    if(confirm('Are you sure ?')){

       while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
       } 
       localStorage.clear();
    }
    e.preventDefault();

}

