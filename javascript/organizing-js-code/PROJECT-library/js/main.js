function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.toggleIsRead = function() {
  this.isRead = !this.isRead;
}

Book.prototype.setCoverImageURL = function(url) {
  this.coverImageURL = url;
}

const book1 = new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', 448, true);
const book2 = new Book('The Hobbit', 'J.R.R. Tolkien', 284, true);

const book3 = new Book('Harry Potter i Kamień Filozoficzny', 'J.K. Rowling', 328, true);
book3.setCoverImageURL('https://ecsmedia.pl/c/harry-potter-i-kamien-filozoficzny-tom-1-b-iext81316007.jpg');


let library = [book1, book2, book3]

console.log(library)