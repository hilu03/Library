const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const book1 = new Book("Name of the Book", "Name of author", 200, "read");
const book2 = new Book("Name of the Book", "Name of author", 200, "unread");
const book3 = new Book("Name of the Book", "Name of author", 200, "read");

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

function displayBook() {
  const container = document.querySelector(".book-container");
  let html = "";
  myLibrary.forEach((book, index) => {
    html +=
      ` <div class="card">
          <div class="icon-container">
            <img src="book_icon.png" class="icon">
          </div>
          <div class="title">${book.title}</div>
          <div class="author">Author: ${book.author}</div>
          <div class="last-row">
            <div class="pages">${book.pages} pages</div>
            <div class="read">${book.read}</div>  
          </div>
          <button class="remove" data-id="${index}">Remove</button>
        </div>
      `;
  });
  container.innerHTML = html;

  const removeButtons = document.querySelectorAll(".remove");
  removeButtons.forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.id);
      myLibrary.splice(index, 1);
      displayBook();
    });
  });
}

displayBook();

const dialog = document.querySelector("dialog");
const showForm = document.querySelector(".show-form");
const addButton = document.querySelector(".add");

showForm.addEventListener("click", () => {
  dialog.showModal();
});

addButton.addEventListener("click", (e) => {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const page = document.querySelector("#page").value;
  const status = document.querySelector("input[name=status]:checked").value;
  const book = new Book(title, author, page, status);
  addBookToLibrary(book);
  e.preventDefault();
  dialog.close();
  displayBook();
});

