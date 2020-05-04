function Book({ title, author, pages, hasRead = false }) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

Book.prototype.info = function() {
  return `${this.title} by ${this.author}. ${this.pages} pages. This book has${this.hasRead ? '' : ' not'} been read.`;
}

Book.prototype.toggleRead = function() {
  this.hasRead = !this.hasRead;
}

function addBookToLibrary(book) {
  myLibrary.push(new Book(book));  
  storeLibrary();
}

function removeBookFromLibrary(index) {
  myLibrary = myLibrary.filter((book, i) => i !== +index);
}

function removeBookButton(event) {
  removeBookFromLibrary(event.target.parentNode.getAttribute('data-index'));
  storeLibrary();
}

function clearLibraryList(libraryList) {
  while (libraryList.hasChildNodes()) {
    libraryList.removeChild(libraryList.lastChild);
  }
}

function createBookCard(book, index) {
  const bookCard = document.createElement('div');
  const removeBtn = document.createElement('button');
  const title = document.createElement('span');
  const author = document.createElement('span');
  const pages = document.createElement('span');
  const readTag = document.createElement('button');

  removeBtn.innerHTML = '&times;';
  removeBtn.setAttribute('type', 'button');
  removeBtn.classList.add('book-card__btn-remove');
  removeBtn.addEventListener('click', removeBookButton)

  title.textContent = book.title;
  title.classList.add('book-card__title');

  author.textContent = `${book.author}`;
  author.classList.add('book-card__author');

  pages.textContent = `${book.pages} pages`;
  pages.classList.add('book-card__pages');

  readTag.setAttribute('type', 'button');
  readTag.classList.add('book-card__read-tag');
  if (book.hasRead) {
    readTag.classList.add('book-card__read-tag--read');
    readTag.textContent = 'Read';
  } else {
    readTag.classList.add('book-card__read-tag--not-read');
    readTag.textContent = 'Not Read';
  }
  readTag.addEventListener('click', toggleReadButton);

  bookCard.setAttribute('data-index', index);
  bookCard.append(removeBtn, title, author, pages, readTag);
  bookCard.classList.add('book-card');
  return bookCard;
}

function addBookFromForm() {
  const title = document.querySelector('#ftitle').value;
  const author = document.querySelector('#fauthor').value;
  const pages = document.querySelector('#flength').value;
  const hasRead = document.querySelector('#fread').checked;
  
  addBookToLibrary({
    title: title,
    author: author,
    pages: pages,
    hasRead: hasRead
  });
  
  storeLibrary();
}

function toggleReadButton(event) {
  const index = Number(event.target.parentNode.getAttribute('data-index'));
  myLibrary[index].toggleRead();
  storeLibrary();
}

function render(library) {
  const libraryList = document.querySelector('.library');
  clearLibraryList(libraryList);

  library.forEach((book, index) => {
    const bookCard = createBookCard(book, index);
    libraryList.append(bookCard);
  })
}

function storeLibrary() {
  localStorage.setItem('library', JSON.stringify(myLibrary));
  loadLibrary();
}

function loadLibrary() {
  if (!localStorage.length) return;

  const storedLibrary = JSON.parse(localStorage.getItem('library'));
  myLibrary = storedLibrary.map(book => new Book(book));
  render(myLibrary);
}

let myLibrary = [];

if (!localStorage.length) {
  
  addBookToLibrary({
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    pages: 265,
  });
  addBookToLibrary({
    title: 'The Way of Kings',
    author: 'Brandon Sanderson',
    pages: 1007,
  });
  addBookToLibrary({
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    pages: 662,
    hasRead: true
  });
} else {
  loadLibrary();
}

const addBookBtn = document.querySelector('.btn-add-book');
const closeFormBtn = document.querySelector('.btn-close');
const formAddBookBtn = document.querySelector('.form-add-book__btn');

addBookBtn.addEventListener('click', () => {
  const popupForm = document.querySelector('.form-popup');
  popupForm.style.display = "block";
  addBookBtn.style.display = "none";
});

closeFormBtn.addEventListener('click', () => {
  const popupForm = document.querySelector('.form-popup');
  popupForm.style.display = "none";
  addBookBtn.style.display = "block";
});

formAddBookBtn.addEventListener('click', () => {
  const popupForm = document.querySelector('.form-popup');
  addBookFromForm();
  popupForm.style.display = "none";
  addBookBtn.style.display = "block";
});