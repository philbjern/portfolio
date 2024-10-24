class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  toggleIsRead() {
    this.isRead = !this.isRead;
    return this.isRead;
  }

  setCoverImageURL(url) {
    this.coverImageURL = url;
  }
}

const book1 = new Book(
  "The Fellowship of the Ring",
  "J.R.R. Tolkien",
  448,
  true
);
const book2 = new Book("The Hobbit", "J.R.R. Tolkien", 284, true);

const book3 = new Book(
  "Harry Potter i Kamień Filozoficzny",
  "J.K. Rowling",
  328,
  false
);

// let library = [book1, book2, book3];
let library = loadBooksFromLocalStorage();

function addBookToLibrary(book) {
  library.push(book);
}

function deleteBookFromLibrary(index) {
  library.splice(index, 1);
}

function createBookCardElement(book, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-index", index);
  if (book.isRead) {
    card.classList.toggle("read");
  }

  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");

  const heading = document.createElement("h2");
  heading.classList.add("card-title");
  heading.textContent = book.title;
  cardInfo.appendChild(heading);

  const author = document.createElement("p");
  author.textContent = book.author;
  cardInfo.appendChild(author);

  const pages = document.createElement("p");
  pages.textContent = book.pages;
  cardInfo.appendChild(pages);

  card.appendChild(cardInfo);

  const cardControls = document.createElement("div");
  cardControls.classList.add("card-controls");

  const toggleReadButton = document.createElement("button");
  toggleReadButton.classList.toggle("btn");
  if (book.isRead) {
    toggleReadButton.classList.toggle("btn-muted");
  }
  toggleReadButton.textContent = book.isRead ? "Not Read" : "Read";
  toggleReadButton.addEventListener("click", handleClickToggleRead);
  toggleReadButton.setAttribute("data-index", index);
  cardControls.appendChild(toggleReadButton);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn");
  deleteButton.classList.add("btn-danger");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", handleClickDeleteBook);
  deleteButton.setAttribute("data-index", index);
  cardControls.appendChild(deleteButton);

  card.appendChild(cardControls);

  return card;
}

function handleClickToggleRead(e) {
  const index = e.target.dataset.index;

  let isRead = library[index].toggleIsRead();

  const card = document.querySelector(`.card[data-index="${index}"]`);
  card.classList.toggle("read");

  const toggleButton = document.querySelector(`.btn[data-index="${index}"]`);
  toggleButton.classList.toggle("btn-muted");
  toggleButton.textContent = isRead ? "Not Read" : "Read";
}

function handleClickDeleteBook(e) {
  const index = e.target.dataset.index;
  deleteBookFromLibrary(index);
  updateCards();
}

function updateCards() {
  const cardsContainer = document.querySelector(".cards");

  if (library.length === 0) {
    cardsContainer.textContent = "No books, try adding some";
  } else {
    cardsContainer.textContent = "";
    for (let i = 0; i < library.length; i++) {
      cardsContainer.appendChild(createBookCardElement(library[i], i));
    }
    console.log(library);
    saveBooksToLocalStorage(library);
  }
}

const newBookModal = document.querySelector(".add-book-modal-wrapper");

function init() {
  newBookModal.classList.toggle("hide");
  updateCards();
}

init();

// Modal
const title = document.querySelector("#title-input");
const author = document.querySelector("#author-input");
const pages = document.querySelector("#pages-input");

const openModalButton = document.querySelector("#new-book-btn");
openModalButton.addEventListener("click", (e) => {
  newBookModal.classList.toggle("hide");

  title.value = "";
  author.value = "";
  pages.value = "";
});

const exitModalButton = document.querySelector("#exit-modal");
exitModalButton.addEventListener("click", (e) => {
  e.preventDefault();
  newBookModal.classList.toggle("hide");
});

const confirmBookAdd = document.querySelector("#add-book-confirm");
confirmBookAdd.addEventListener("click", (e) => {
  e.preventDefault();

  const newBook = new Book(title.value, author.value, pages.value, false);

  addBookToLibrary(newBook);
  updateCards();
  newBookModal.classList.toggle("hide");
});

// Local Storage
function loadBooksFromLocalStorage() {
  let library = JSON.parse(localStorage.getItem("library"));
  if (library == null) {
    library = [];
  } else {
    library.forEach(function (item) {
      item.toggleIsRead = function () {
        this.isRead = !this.isRead;
        return this.isRead;
      };
    });
  }
  return library;
}

function saveBooksToLocalStorage(library) {
  localStorage.setItem("library", JSON.stringify(library));
}
