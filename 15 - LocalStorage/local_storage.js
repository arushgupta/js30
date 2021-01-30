const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
    // prevents the submission of the form from refreshing the page
    e.preventDefault();
    // we can use 'this' because it is going to be the form that returns on submit
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text, // shorthand for text: text,
        done: false
    };
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
          <li>
              <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
              <label for="item${i}">${plate.text}</label>
          </li>
        `;
    }).join('');
}

// event delegation
function toggleDone(e) {
    if (!e.target.matches('input')) return; //skip event unless it's an input
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
populateList(items, itemsList);
