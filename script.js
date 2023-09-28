const inputBox = document.querySelector('#input-box');
const listItems = document.querySelector('.list-items');
const addButton = document.querySelector('.add-btn');
const listButton = document.querySelector('.list-item-btn');
const list = document.querySelector('span');


addButton.addEventListener('click', () => {
    const inputValue = inputBox.value;
    listItems.insertAdjacentHTML('beforeend', 
    `
    <li class="todo-list">
        <span>${inputValue}</span>
        <button class="list-item-btn" onclick="this.parentNode.remove();">x</button>
    </li>
    `);

    inputBox.value = '';
    inputBox.blur();
    saveData();
});

inputBox.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        addButton.click();
    }
});


listItems.addEventListener('click', (event) => {
    if(event.target.tagName === "LI") {
        event.target.classList.toggle('checked');
        saveData();
    } else if(event.target.className === 'list-item-btn') {
        event.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem('data', listItems.innerHTML);
}

function showTask() {
    listItems.innerHTML = localStorage.getItem('data');
}

showTask();






