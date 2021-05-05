import './style.css';
const $form = document.querySelector('.form');
const $bookContainer = document.querySelector('.books-container__content');

const getStorage = JSON.parse(localStorage.getItem('library'));

const setStorage = (array)=>{
  localStorage.setItem('library', JSON.stringify(array));
}

const myLibrary = (getStorage) ? Array.from(getStorage) : [];


const addBookToLibrary = (book) =>{
  const stringBook = JSON.stringify(book)
  const parsedBook = JSON.parse(stringBook);
  
  myLibrary.push(parsedBook);
  setStorage(myLibrary);
}


function Book(id, title,author, pages, read) {

  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;  
}


function BookOptionsModal(){

  this.$bookOptionsModal = document.createElement('div');
  this.$bookOptionsModalTitle = document.createElement('p');
  this.$bookOptionsModalButtons = document.createElement('div');
  this.$bookOptionsModalButtonsReadStatus = document.createElement('button');
  this.$bookOptionsModalButtonsDelete = document.createElement('button');
  this.$bookOptionsModalButtonsCancel = document.createElement('button');
  
  
  this.$bookOptionsModal.classList.add('book-options-modal');
  this.$bookOptionsModalTitle.classList.add('book-options-modal__title');
  this.$bookOptionsModalButtons.classList.add('book-options-modal__buttons');
  this.$bookOptionsModalButtonsReadStatus.classList.add('book-options-modal__buttons__read-status');
  this.$bookOptionsModalButtonsDelete.classList.add('book-options-modal__buttons__delete');
  this.$bookOptionsModalButtonsCancel.classList.add('book-options-modal__buttons__cancel');
  
  
  
  this.$bookOptionsModalTitle.textContent ='What do you wanna do?';
  this.$bookOptionsModalButtonsReadStatus.textContent = 'Change Read Status';
  this.$bookOptionsModalButtonsDelete.textContent = 'Delete';
  this.$bookOptionsModalButtonsCancel.textContent = 'Cancel';
  
  
  
  this.$bookOptionsModalButtons.appendChild(this.$bookOptionsModalButtonsReadStatus);
  this.$bookOptionsModalButtons.appendChild(this.$bookOptionsModalButtonsDelete);
  
  
  this.$bookOptionsModal.appendChild(this.$bookOptionsModalTitle);
  this.$bookOptionsModal.appendChild(this.$bookOptionsModalButtons);
  this.$bookOptionsModal.appendChild(this.$bookOptionsModalButtonsCancel);
  
  
  document.body.appendChild(this.$bookOptionsModal);
}


function createHtmlBook(book){

  const isReadValueTrue = () =>{
    return (book.read === true) ? true : false;
  }
  
  const setReadContentValue = () => {
    return (isReadValueTrue()) ? "Read" : "Not read";    
  }

  const setReadClass = () => {
    (isReadValueTrue()) ? $bookCoverRead.classList.add('read') :  $bookCoverRead.classList.add('not-read')
  }

  
  const $book = document.createElement('div');
  const $bookCover = document.createElement('div');
  const $bookCoverTitle = document.createElement('p');
  const $bookCoverAuthor = document.createElement('p');
  const $bookCoverPages = document.createElement('p');
  const $bookCoverRead = document.createElement('p');

  $book.setAttribute('id', book.id);

  $book.classList.add('book');
  $bookCover.classList.add('book__cover');
  $bookCoverTitle.classList.add('book__cover__title');
  $bookCoverAuthor.classList.add('book__cover__author');
  $bookCoverPages.classList.add('book__cover__pages');
  $bookCoverRead.classList.add('book__cover__read');
  
  setReadClass();
  setReadContentValue();

  $bookCoverTitle.textContent = book.title;
  $bookCoverAuthor.textContent = book.author;
  $bookCoverPages.textContent =  `${book.pages} pages`;
  $bookCoverRead.textContent = setReadContentValue();


  $bookCover.appendChild($bookCoverTitle);
  $bookCover.appendChild($bookCoverAuthor);
  $bookCover.appendChild($bookCoverPages);
  $bookCover.appendChild($bookCoverRead);

  $book.appendChild($bookCover);

  $bookContainer.appendChild($book);


  $book.addEventListener('click', (e)=>{
    e.preventDefault();

    const id = $book.getAttribute('id');

    const bookStorageValue = myLibrary[id];

    const bookOptionsModal = new BookOptionsModal();

    bookOptionsModal.$bookOptionsModalButtonsReadStatus.addEventListener('click', (e)=>{
      e.preventDefault();

      if(bookStorageValue.read===true) {
      
        bookStorageValue.read = false;  
        $bookCoverRead.classList.replace('read', 'not-read');
        $bookCoverRead.textContent = 'Not Read';
      
      }else{

        bookStorageValue.read = true;
        $bookCoverRead.classList.replace('not-read', 'read');
        $bookCoverRead.textContent = 'Read';

      }

      setStorage(myLibrary);

      bookOptionsModal.$bookOptionsModal.remove();
    })

    bookOptionsModal.$bookOptionsModalButtonsDelete.addEventListener('click', (e)=>{
      e.preventDefault();
      myLibrary.splice(id, 1);
      $book.remove();
      setStorage(myLibrary);
      bookOptionsModal.$bookOptionsModal.remove();
    })

    bookOptionsModal.$bookOptionsModalButtonsCancel.addEventListener('click', (e)=>{
      e.preventDefault();
      bookOptionsModal.$bookOptionsModal.remove();
    })

  })
}


const createBookFromForm = (submitEvent)=>{

  const id = myLibrary.length;
  const title = submitEvent.target[0].value;
  const author = submitEvent.target[1].value;
  const pages = submitEvent.target[2].value;
  const read = submitEvent.target[3].checked;

  const book = new Book(id, title, author, pages, read);
  
  return book;
}



$form.addEventListener('submit', (e)=>{
  e.preventDefault();

  const book = createBookFromForm(e);
  
  addBookToLibrary(book);

  createHtmlBook(book);
  
  $form.reset();
})

myLibrary.map(book => createHtmlBook(book));