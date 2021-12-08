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
}