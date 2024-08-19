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

const book1 = new Book("Name of the Book", "Name of author", 200, false);
const book2 = new Book("Name of the Book", "Name of author", 200, false);
const book3 = new Book("Name of the Book", "Name of author", 200, false);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

function displayBook() {
  const container = document.querySelector(".book-container");
  let html = "";
  myLibrary.forEach(book => {
    html +=
      ` <div class="card">
          <div class="icon-container">
            <img src="book_icon.png" class="icon">
          </div>
          <div class="title">${book.title}</div>
          <div class="author">Author: ${book.author}</div>
          <div class="last-row">
            <div class="pages">${book.pages} pages</div>
            <div class="read">${book.read? "Read": "Unread"}</div>  
          </div>
        </div>
      `;
  });
  container.innerHTML = html;
}

displayBook();

const dialog = document.querySelector("dialog");
const showForm = document.querySelector(".show-form");

showForm.addEventListener("click", () => {
  dialog.showModal();
});

