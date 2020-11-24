const shelfContainer = document.querySelector('.bookshelf-container');
const newBookButton = document.querySelector('#add-book')
const bookshelfContainer = document.querySelector('.bookshelf-container');
const cardDiv = document.createElement('div');
const readButton = document.createElement('button');
const infoDiv = document.createElement('div');
const cardButtonsDiv = document.createElement('div');
cardDiv.classList.add('book');
infoDiv.classList.add('info')
cardButtonsDiv.classList.add('book-buttons');


let theCollection = [];


function Book(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

}

const theHobbit = new Book("The Hobbit", "JRR Tolkein", "200", true);
const theKiteRunner = new Book("The Kite Runner", "Some guy", "360", true);

theCollection.push(theHobbit);
theCollection.push(theKiteRunner);
console.log(theCollection);

function addBookToLibrary(){
    theCollection.forEach(book => { 
        bookshelfContainer.appendChild(cardDiv);

    });
}
addBookToLibrary();

newBookButton.addEventListener('click', () => {
    
})