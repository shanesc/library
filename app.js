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

console.log(myLibrary);