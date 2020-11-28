const shelfContainer = document.querySelector('.bookshelf-container');
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

const theHobbit = new Book("The Hobbit", "JRR Tolkein", "200", true);
const theKiteRunner = new Book("The Kite Runner", "Some guy", "360", true);

theCollection.push(theHobbit);
theCollection.push(theKiteRunner);

function addBookToLibrary(){
    theCollection.forEach(book => {
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
		readButton.setAttribute('id', 'is-read');
		removeButton.setAttribute('id', 'delete');
        bookshelfContainer.appendChild(cardDiv);
        cardDiv.appendChild(titleDiv);
        cardDiv.appendChild(authorDiv);
        cardDiv.appendChild(pagesDiv);
        cardDiv.appendChild(cardButtonsDiv);
        cardButtonsDiv.appendChild(readButton);
		cardButtonsDiv.appendChild(removeButton);
        titleDiv.innerHTML = book.title;
        authorDiv.innerHTML = book.author;
        pagesDiv.innerHTML = book.pages;
        
        if(book.isRead === true) {
        	readButton.innerHTML = "Read";
        }else readButton.innerHTML = "Not Read";
        removeButton.innerHTML = "Remove";
    });
}
addBookToLibrary();

newBookButton.addEventListener('click', () => {
    modalContainer.style.display = "inline-block"; 
})

cancelButton.addEventListener('click', () => {
    resetModal();
})

submitButton.addEventListener('click', () =>{
    console.log(typeof parseInt(modalPages.value))
    if(modalTitle.value === ''|| modalAuthor.value === '' || modalPages.value === '' || typeof parseInt(modalPages.value) !== 'number'){
        resetModal();
        return
    }

    let readOrNot = '';
    if (modalIsRead.checked === true){
        readOrNot = 'Read';
    }else readOrNot = 'Not read';

    theCollection.push(new Book(modalTitle.value, modalAuthor.value, modalPages.value, readOrNot));
    Array.from(allBooks).forEach(book => {
        book.remove();
    });
    addBookToLibrary();
    resetModal();
    console.log(theCollection)
})