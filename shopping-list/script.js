const itemInput = document.getElementById('item-input')
const itemForm = document.getElementById('item-form')
const itemList = document.getElementById('item-list')

// Functions to be called 
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
    itemList.appendChild(li); 

    // Clear Item Input
    itemInput.value = ''; 
}

// Event Listeners to call functions
itemForm.addEventListener('submit', addItem)