function Book({ title, author, pages, hasRead = false }) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

Book.prototype.info = function() {
  return `${this.title} by ${this.author}. ${this.pages} pages. This book has${this.hasRead ? '' : ' not'} been read.`;
}

// class Book {
//   constructor({ title, author, pages, hasRead = false }) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.hasRead = hasRead;
//   }

//   info() {
//     return `${this.title} by ${this.author}. ${this.pages} pages. This book has${this.hasRead ? '' : ' not'} been read.`;
//   }
// }

function addBookToLibrary(book) {
  myLibrary.push(new Book(book));
}

function render(library) {
  const libraryList = document.querySelector('.library');

  library.forEach(book => {
    const bookCard = document.createElement('div');
    const title = document.createElement('span');
    const info = document.createElement('div');
    const author = document.createElement('span');
    const pages = document.createElement('span');

    title.textContent = book.title;
    title.classList.add('book-card__title');
    author.textContent = `By ${book.author}`;
    author.classList.add('book-card__author');
    pages.textContent = `${book.pages} pages`;
    pages.classList.add('book-card__pages');
    info.classList.add('book-card__info');
    info.append(author, pages);
    bookCard.append(title, info);
    bookCard.classList.add('book-card');
    libraryList.append(bookCard);
  })
}

let myLibrary = [];

addBookToLibrary({
  title: 'The Hobbit',
  author: 'J.R.R. Tolkien',
  pages: 265,
});
addBookToLibrary({
  title: 'The Way of Kings',
  author: 'Brandon Snaderson',
  pages: 1007,
});
addBookToLibrary({
  title: 'The Name of the Wind',
  author: 'Patrick Rothfuss',
  pages: 662,
});

render(myLibrary);

