const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');

const bestDirectors = [
    'Steven Spielberg',
    'Alfred Hitchcock',
    'Stanley Kubrick',
    'Quentin Tarantino',
    'Tim Burton',
    'Francis Ford Coppola',
    'Martin Scorsese',
    'William Friedkin',
    'Brian De Palma',
    'George Lucas'
];

//Store listItems
const listItems = [];

let dragStartIndex;

createList();

//Insert list items into DOM
function createList() {
    [...bestDirectors] //copied array
        .map(a => ({ value: a, sort: Math.random() })) //changed to the object with a value and sort
        .sort((a, b) => a.sort - b.sort) // sorted
        .map(a => a.value) // turned back to an array of strings
        .forEach((person, index) => {
            const listItem = document.createElement('li'); //created list item
            listItem.setAttribute('data-index', index); //setting attribute

            listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>
        </div>
        `;

            listItems.push(listItem);

            draggableList.appendChild(listItem);
        });

    addEventListeners();
}

function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index'); //('+' makes it a number)
}

function dragEnter() {
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

//Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

//Check the order of list items
function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();

        if (personName !== bestDirectors[index]) {
            listItem.classList.add('wrong')
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart); //('a', and when 'a' happens i call function dragStart)
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}

check.addEventListener('click', checkOrder);
