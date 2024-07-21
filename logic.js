let inputBox = document.getElementById('input-field');
let addButton = document.getElementById('add-button');
let itemsContainer = document.getElementById('items-list');

addButton.addEventListener('click', itemAdd);
inputBox.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    itemAdd();
  }
});

// No need to query all items initially, handle them during addition
itemsContainer.addEventListener('click', handleItemClick); // Event delegation for clicks

function itemAdd() {
  if (inputBox.value === '') {
    alert("Write something first");
  } else {
    let newLI = document.createElement('li');
    newLI.id='item';
    newLI.innerHTML = `
      <button id="left">
        <img src="empty-circle.svg" alt="empty-circle" id="check-button">
      </button>
      <p> ${inputBox.value}</p>
      <button id="right">
        <img src="x.svg" alt="remove-icon" id="remove-icon">
      </button>
    `;
    itemsContainer.appendChild(newLI);
    inputBox.value = '';
  }
  saveData();
}

function handleItemClick(event) {
  const clickedElement = event.target; // Get the element that was clicked

  // Check if clicked element is the "remove-icon" or its child image
  if (clickedElement.matches('#remove-icon img') || clickedElement.id === 'remove-icon') {
    const audioRemove=new Audio("delete.mp3");
    audioRemove.play();
    const listItem = clickedElement.closest('li'); // Get the parent LI element
    listItem.remove(); // Remove the entire list item
    saveData();
  }

//   if (clickedElement.matches('#check-button img') || clickedElement.id==='check-button'){
//     const listItem=clickedElement.closest('li');
//     listItem.querySelector('#check-button').src='tick-circle.svg';
//     listItem.querySelector('p').style.textDecoration='line-through';
//     saveData();
//   }
    if (clickedElement.matches('#check-button img') || clickedElement.id === 'check-button') {
        const audio = new Audio("done.mp3"); // Replace with your sound file path
        const listItem = clickedElement.closest('li');
        const checkButton = listItem.querySelector('#check-button');
        const paragraph = listItem.querySelector('p');

        if (checkButton.src.includes('tick-circle.svg')) {
        // Currently checked, change to empty circle
            checkButton.src = 'empty-circle.svg';
            paragraph.style.textDecoration = 'none';
        } else {
        // Currently not checked, change to tick circle
            checkButton.src = 'tick-circle.svg';
            audio.play();
            paragraph.style.textDecoration = 'line-through';
        }
    }
}


function saveData(){
    localStorage.setItem("data",itemsContainer.innerHTML);
}
function showTask(){
    itemsContainer.innerHTML=localStorage.getItem("data");
}
showTask();