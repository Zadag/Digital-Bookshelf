const newBookButton = document.querySelector('#add-book')
const bookshelfContainer = document.querySelector('.bookshelf-container');
const submitButton = document.querySelector('#submit');
const cancelButton = document.querySelector('#cancel');
const modalContainer = document.getElementById('modal-container');
const modalTitle = document.querySelector('#book-title');
const modalAuthor = document.querySelector('#book-author');
const modalPages = document.querySelector('#book-pages');
const modalIsRead = document.querySelector('#book-read');
const allBooks = document.getElementsByClassName('book');


let theCollection = [];
let storedArray = [];

//Remove all book cards from the DOM. This prevents duplicate books.
function clearDom(){
    Array.from(allBooks).forEach(book => {
        book.remove();
    });
}

//Saves the array of books to local storage.
function saveTheCollection(){
    localStorage.setItem('storedArray', JSON.stringify(theCollection));
}

function parseTheCollection(){
    let books = localStorage.getItem('storedArray');
    books = JSON.parse(books);
    theCollection = books;    
}

function Book(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

}

function resetModal(){
    modalContainer.style.display = 'none';
    modalTitle.value = "";
    modalAuthor.value = "";
    modalPages.value = "";
    modalIsRead.checked = false;
}

//Builds a card to display information about the book object.
function createDomElements(){
    let i = 0;
    theCollection.forEach(book => {
        book.index = i;
        const cardDiv = document.createElement('div');
		const titleDiv = document.createElement('div');
		const authorDiv = document.createElement('div');
		const pagesDiv = document.createElement('div');
        const bookButtonsDiv = document.createElement('div');			
        const readButton = document.createElement('button');
        const removeButton = document.createElement('button');			
        const cardButtonsDiv = document.createElement('div');
        cardDiv.classList.add('book');
		titleDiv.classList.add('info');
		titleDiv.setAttribute('id', 'title');
		authorDiv.classList.add('info');
		authorDiv.setAttribute('id', 'author');
		pagesDiv.classList.add('info');
		pagesDiv.setAttribute('id', 'pages');
		titleDiv.classList.add('info');
		titleDiv.setAttribute('id', 'title');
		cardButtonsDiv.classList.add('book-buttons');
        readButton.setAttribute('class', 'is-read');
        readButton.setAttribute('dataAttribute', i);
        removeButton.setAttribute('class', 'delete');
        removeButton.setAttribute('dataAttribute', i);
        bookshelfContainer.appendChild(cardDiv);
        cardDiv.appendChild(titleDiv);
        cardDiv.appendChild(authorDiv);
        cardDiv.appendChild(pagesDiv);
        cardDiv.appendChild(cardButtonsDiv);
        cardButtonsDiv.appendChild(readButton);
		cardButtonsDiv.appendChild(removeButton);
        titleDiv.innerHTML = book.title;
        authorDiv.innerHTML = book.author;
        pagesDiv.innerHTML = book.pages + ' pages';
        i++;
        
        if(book.isRead === true) {
        	readButton.innerHTML = "Read";
        }else readButton.innerHTML = "Not Read";
        removeButton.innerHTML = "Remove";
    });
    saveTheCollection();
}

newBookButton.addEventListener('click', () => {
    modalContainer.style.display = "inline-block"; 
})

cancelButton.addEventListener('click', () => {
    resetModal();
})

//Checks to see if all inputs are valid and creates a new book object.
submitButton.addEventListener('click', () =>{
    if(modalTitle.value === ''|| modalAuthor.value === '' || modalPages.value === ''){
        resetModal();
        return
    }

    let readOrNot;
    if (modalIsRead.checked === true){
        readOrNot = true;
    }else readOrNot = false;

    let book = new Book(modalTitle.value, modalAuthor.value, modalPages.value, readOrNot);
    theCollection.push(book);
    clearDom();
    createDomElements();
    addEventListenerToBooks();
    resetModal();
})

function addEventListenerToBooks() {
    const readButtons = document.querySelectorAll('.is-read');
    const deleteButtons = document.querySelectorAll('.delete');

    readButtons.forEach((book) =>{
        theCollection.forEach(bookObj => {
            book.addEventListener(('click'), (e) => {
                if(bookObj.index == book.getAttribute('dataAttribute')){
                    if(bookObj.isRead === true){
                        bookObj.isRead = false;
                    }else bookObj.isRead = true;
                }
                clearDom();
                createDomElements();
                addEventListenerToBooks();
            })
        })
    })

    deleteButtons.forEach((book) =>{
        book.addEventListener(('click'), () =>{
            theCollection.forEach((bookObj) => {
                if(bookObj.index == book.getAttribute('dataAttribute')){
                    theCollection.splice(bookObj.index, 1);
                    clearDom();
                    createDomElements();
                    addEventListenerToBooks();
                    
                }
            })
        })
    })
}

function restoreThePage(){
    parseTheCollection();
    createDomElements();
    addEventListenerToBooks();
}
restoreThePage();