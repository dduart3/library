import './reset.css';
import './style.css';


const storage = (() => {
  const getLocalStorageLibrary = JSON.parse(localStorage.getItem('library'));

  const setLocalStorageLibrary = (array)=>{
    localStorage.setItem('library', JSON.stringify(array));
  }
  
  return {
    getLocalStorageLibrary, 
    setLocalStorageLibrary
  }
})();



const library = (()=>{

  const myLibrary = (storage.getLocalStorageLibrary) ? Array.from(storage.getLocalStorageLibrary) : [];
  
  
  const addBookToLibrary = (book) =>{
    const stringBook = JSON.stringify(book)
    const parsedBook = JSON.parse(stringBook);
    
    myLibrary.push(parsedBook);
    storage.setLocalStorageLibrary(myLibrary);
  }

  const deleteBookFromLibrary = (bookId)=>{
    myLibrary.splice(bookId, 1);
    storage.setLocalStorageLibrary(myLibrary);
  }

  return {
    myLibrary,
    addBookToLibrary,
    deleteBookFromLibrary
  }
})();


const displayController = (()=>{
  
  const formElement = document.querySelector('.form');

  const bookContainerElement = document.querySelector('.books-container__content');

  const displayInBody = (element) => () =>{
    document.body.appendChild(element);
  }

  const displayBooksFromLibrary = (library) =>{
    library.map(book => createHtmlBook(book));
  }

  return{
    formElement,
    displayBooksFromLibrary,
    bookContainerElement,
    displayInBody
  }
})();


function Book(id, title,author, pages, read){
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;  
}


const createBookFromForm = (submitEvent)=>{

const id = library.myLibrary.length;
const title = submitEvent.target[0].value;
const author = submitEvent.target[1].value;
const pages = submitEvent.target[2].value;
const read = submitEvent.target[3].checked;

const book = new Book(id, title, author, pages, read);

return book;
}



const callBookOptionsModal = (bookElement, bookId) => {
  
  
  
  const bookOptionsModalElement = document.createElement('div');

  const bookOptionsModalElementTitle = document.createElement('p');
  
  const bookOptionsModalElementButtons = document.createElement('div');
  
  const bookOptionsModalElementButtonsReadStatus = document.createElement('button');
  
  const bookOptionsModalElementButtonsDelete = document.createElement('button');
  
  const bookOptionsModalElementButtonsCancel = document.createElement('button');
  


  bookOptionsModalElement.classList.add('book-options-modal');

  bookOptionsModalElementTitle.classList.add('book-options-modal__title');

  bookOptionsModalElementButtons.classList.add('book-options-modal__buttons');

  bookOptionsModalElementButtonsReadStatus.classList.add('book-options-modal__buttons__read-status');

  bookOptionsModalElementButtonsDelete.classList.add('book-options-modal__buttons__delete');
  
  bookOptionsModalElementButtonsCancel.classList.add('book-options-modal__buttons__cancel');
  
  
  bookOptionsModalElementTitle.textContent ='What do you wanna do?';
  bookOptionsModalElementButtonsReadStatus.textContent = 'Change Read Status';
  bookOptionsModalElementButtonsDelete.textContent = 'Delete';
  bookOptionsModalElementButtonsCancel.textContent = 'Cancel';
  
  
  bookOptionsModalElementButtons.appendChild(bookOptionsModalElementButtonsReadStatus);
  bookOptionsModalElementButtons.appendChild(bookOptionsModalElementButtonsDelete);
  
  bookOptionsModalElement.appendChild(bookOptionsModalElementTitle);
  bookOptionsModalElement.appendChild(bookOptionsModalElementButtons);
  bookOptionsModalElement.appendChild(bookOptionsModalElementButtonsCancel);


  const functions = optionsModalFunctions(bookElement, bookId, bookOptionsModalElement);

  bookOptionsModalElementButtonsReadStatus.addEventListener('click', functions.changeReadValue());
  bookOptionsModalElementButtonsDelete.addEventListener('click', functions.deleteBook());
  bookOptionsModalElementButtonsCancel.addEventListener('click', functions.closeModal());
  
  
  return {
    bookOptionsModalElement,
    bookOptionsModalElementButtonsReadStatus,
    bookOptionsModalElementButtonsDelete,
    bookOptionsModalElementButtonsCancel
  }
}



const optionsModalFunctions = (bookElement, bookId , bookOptionsModalElement) =>{
  
  const myLibrary = library.myLibrary;
  
  const bookFromLibrary = myLibrary[bookId];
  
  
  const toggleReadValue = (bookFromLibrary, bookElement) =>{
  const bookElementCoverRead = bookElement.querySelector('.book__cover__read');

  if(bookFromLibrary.read===true) {
    bookFromLibrary.read = false;

    bookElementCoverRead.classList.replace('read', 'not-read');
    bookElementCoverRead.textContent = 'Not Read';
  }else{
    bookFromLibrary.read = true;

    bookElementCoverRead.classList.replace('not-read', 'read');
    bookElementCoverRead.textContent = 'Read';

  }
}
  
  
  const changeReadValue = () => (e) =>{
    e.preventDefault();
    toggleReadValue(bookFromLibrary, bookElement);
    storage.setLocalStorageLibrary(myLibrary)
    bookOptionsModalElement.remove();
    }
  
  
  
  const deleteBook = () => (e) =>{
    e.preventDefault();
    bookElement.remove();
    library.deleteBookFromLibrary(bookId)
    bookOptionsModalElement.remove();
    }
  
  
  const closeModal = () => (e) =>{
    e.preventDefault();
    bookOptionsModalElement.remove();
   }
  

   return{
     changeReadValue,
     deleteBook,
     closeModal
   }
  }
  



const bookElement = (book)=>{

  const isReadValueTrue = () => (book.read === true) ? true : false;

  
  const setBookElementCoverReadContent = () => {
    (isReadValueTrue()) ? bookElementCoverRead.textContent = "Read" : bookElementCoverRead.textContent ="Not read";    
  }

  
  const setBookElementCoverReadClass = () => {
    (isReadValueTrue()) ? bookElementCoverRead.classList.add('read') :  bookElementCoverRead.classList.add('not-read')
  }

  
  const bookElement = document.createElement('div');
  const bookElementCover = document.createElement('div');
  const bookElementCoverTitle = document.createElement('p');
  const bookElementCoverAuthor = document.createElement('p');
  const bookElementCoverPages = document.createElement('p');
  const bookElementCoverRead = document.createElement('p');


  bookElement.setAttribute('id', book.id);


  bookElement.classList.add('book');
  bookElementCover.classList.add('book__cover');
  bookElementCoverTitle.classList.add('book__cover__title');
  bookElementCoverAuthor.classList.add('book__cover__author');
  bookElementCoverPages.classList.add('book__cover__pages');

  
  bookElementCoverRead.classList.add('book__cover__read');


  setBookElementCoverReadClass();
  setBookElementCoverReadContent();


  bookElementCoverTitle.textContent = book.title;
  bookElementCoverAuthor.textContent = book.author;
  bookElementCoverPages.textContent =  `${book.pages} pages`;


  bookElementCover.appendChild(bookElementCoverTitle);
  bookElementCover.appendChild(bookElementCoverAuthor);
  bookElementCover.appendChild(bookElementCoverPages);
  bookElementCover.appendChild(bookElementCoverRead);


  bookElement.appendChild(bookElementCover);

  return bookElement;
}


function createHtmlBook(book){
  const bookContainerElement = displayController.bookContainerElement;
  const displayBook = (bookElement) => bookContainerElement.appendChild(bookElement);
  
  const bookElem = bookElement(book);
  const bookId = bookElem.getAttribute('id');
  
  displayBook(bookElem);
  
  
  
  const optionsModal= callBookOptionsModal(bookElem, bookId);

  const displayInBody = displayController.displayInBody(optionsModal.bookOptionsModalElement)
  
  bookElem.addEventListener('click', displayInBody); 
}



const formController = () =>{
  const formElement = displayController.formElement;


  const createBook = (e) =>{
      e.preventDefault();
    
      const book = createBookFromForm(e);
      
      library.addBookToLibrary(book);
    
      createHtmlBook(book);
      
      formElement.reset();
  }
  
formElement.addEventListener('submit', createBook);
}



displayController.displayBooksFromLibrary(library.myLibrary);

formController();

