// Document elements in variables 
const itemInput = document.getElementById('item-input')
const itemForm = document.getElementById('item-form')
const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear'); 
const filter = document.getElementById('filter')

// Functions to be called 
// Add Item to List 
function addItem(e) {
    e.preventDefault(); 
    const newItem = itemInput.value; 

    // Validate Input 
    if (newItem === '') {
        alert('Please add value')
        return; 
    } 

    // Create List Item 
    const li = document.createElement('li'); 
    const button = document.createElement('button')
    const icon = document.createElement('i')

    li.textContent = newItem; 
    button.className = "remove-item btn-link text-red"; 
    icon.className = "fa-solid fa-xmark"; 

    button.appendChild(icon); 
    li.appendChild(button); 

    // Add li to the Dom
    itemList.appendChild(li); 
    checkUI(); 

    // Clear Item Input
    itemInput.value = ''; 
}

// Click on X icon to delete list items 
    // Event Delegation 
function deleteItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (confirm('Are you sure you want to remove?')) {
            e.target.parentElement.parentElement.remove()
        }  
    }
}

// Click on 'Clear All' to delete all items 
function deleteAll(e) {
    if (confirm('Are you sure you want to clear all?')) {
        itemList.innerHTML = '' // don't use remove or it will remove entire list HTML
    }
}

// Hide Filter Items and Clear All Btn if no li 
function checkUI() {
    if (itemList.childElementCount == 0) {
        filter.style.display = 'none'
        clearBtn.style.display = 'none'
    } else {
        filter.style.display = 'block'
        clearBtn.style.display = 'block'
    }
}

// Filter Items 



// Event Listeners to call functions
itemForm.addEventListener('submit', addItem)
itemList.addEventListener('click', deleteItem)
itemList.addEventListener('click', checkUI)
clearBtn.addEventListener('click', deleteAll)
clearBtn.addEventListener('click', checkUI)

checkUI(); 