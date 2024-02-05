// Document elements in variables 
const itemInput = document.getElementById('item-input')
const itemForm = document.getElementById('item-form')
const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear'); 
const filter = document.getElementById('filter')
const formBtn = itemForm.querySelector('button')
let isEditMode = false; 

// Functions to be called 
function displayItems() {
    const itemsFromStorage = getItemsFromStorage(); 
    itemsFromStorage.forEach(item => addItemToDom(item))
    checkUI(); 
}

// Add Item to List 
function onAddItemSubmit(e) {
    e.preventDefault(); 
    const newItem = itemInput.value; 

    // Validate Input 
    if (newItem === '') {
        alert('Please add value')
        return; 
    } 

    // Check for Edit Mode
    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode'); 
        removeItemFromStorage(itemToEdit.textContent); 
        itemToEdit.classList.remove('edit-mode'); 
        itemToEdit.remove(); 
        isEditMode = false; 
    } else {
        if (checkIfItemExists(newItem)) {
            alert('Oops! You already have that')
            return;
        }
    }

    // Create item DOM element
    addItemToDom(newItem)
    checkUI(); 

    // Add item to local storage
    addItemToStorage(newItem); 

    // Clear Item Input
    itemInput.value = ''; 
}

function addItemToDom(item) {
    // Create List Item 
    const li = document.createElement('li'); 
    const button = document.createElement('button')
    const icon = document.createElement('i')

    li.textContent = item; 
    button.className = "remove-item btn-link text-red"; 
    icon.className = "fa-solid fa-xmark"; 

    button.appendChild(icon); 
    li.appendChild(button); 

    // Add li to the Dom
    itemList.appendChild(li); 
}

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage(); 

    // Add new item to arr 
    itemsFromStorage.push(item); 

    // Convert to JSON string and set to local storage 
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function getItemsFromStorage() {
    let itemsFromStorage; 

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = []; 
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage; 
}

function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        deleteItem(e.target.parentElement.parentElement)
    } else {
        editItem(e.target); 
    }
}

function editItem(item) {
    isEditMode = true; 

    itemList
        .querySelectorAll('li')
        .forEach((i) => i.classList.remove('edit-mode'))

    item.className = 'edit-mode'
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item'; 
    formBtn.style.backgroundColor = '#228B22'
    itemInput.value = item.textContent; 

}

// Click on X icon to delete list items 
    // Event Delegation 
function deleteItem(item) {
    if (confirm('Are you sure you want to remove?')) {
        item.remove(); 

        // Remove Item from storage 
        removeItemFromStorage(item.textContent);

        checkUI(); 
    }
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage(); 

    // Filter out item to be removed 
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item); 

    // Re-set to localstorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage)); 
}

// Click on 'Clear All' to delete all items 
function deleteAll(e) {
    if (confirm('Are you sure you want to clear all?')) {
        itemList.innerHTML = '' // don't use remove or it will remove entire list HTML
    }

    // Clear from local storage 
    localStorage.removeItem('items'); 

    checkUI(); 
}

// Hide Filter Items and Clear All Btn if no li 
function checkUI() {
    itemInput.value = ''; 

    if (itemList.childElementCount == 0) {
        filter.style.display = 'none'
        clearBtn.style.display = 'none'
    } else {
        filter.style.display = 'block'
        clearBtn.style.display = 'block'
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item'; 
    formBtn.style.backgroundColor = '#333'

    isEditMode = false; 

}

// Filter Items 
function filterItems(e) {
    const listItems = document.querySelectorAll('li')
    const text = e.target.value.toLowerCase(); 
    listItems.forEach((item) => {
        const itemName = item.innerText.toLowerCase(); 
        if (itemName.indexOf(text) != -1) {
            item.style.display = 'flex'
        } else item.style.display = 'none'
    })
}

// Check if Item Exists
function checkIfItemExists(item) {
    const itemsFromStorage = getItemsFromStorage(); 
    return itemsFromStorage.includes(item); 
}

// Initialize app 
function init() {
    itemForm.addEventListener('submit', onAddItemSubmit)
    itemList.addEventListener('click', onClickItem)
    // itemList.addEventListener('click', checkUI)
    clearBtn.addEventListener('click', deleteAll)
    clearBtn.addEventListener('click', checkUI)
    filter.addEventListener('input', filterItems)
    document.addEventListener('DOMContentLoaded', displayItems)

    checkUI(); 
}

init(); 