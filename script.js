class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

class Library {
  books = [];

  constructor() {
    const book1 = new Book("Kane and Abel", "Jeffrey Archer", 695, "read");
    const book2 = new Book("Anne of Green Gables", "Lucy Maud Montgomery", 320, "read");
    const book3 = new Book("Harry Potter and the Sorcerer's Stone", "J. K. Rowling", 309, "unread");
    
    this.addBook(book1);
    this.addBook(book2);
    this.addBook(book3);
  }

  addBook(book) {
    this.books.push(book);
  }  

  displayBook() {
    const container = document.querySelector(".book-container");
    let html = "";
    this.books.forEach((book, index) => {
      html +=
        ` <div class="card ${book.status === 'read'? 'green-card': 'orange-card'}" data-id="${index}">
            <div class="icon-container">
              <img src="book_icon.png" class="icon">
            </div>
            <div class="title">${book.title}</div>
            <div class="author">Author: <em>${book.author}</em></div>
            <div class="last-row">
              <div class="pages">${book.pages} pages</div>
              <button class="${book.status}" data-id="${index}">${book.status}</button>  
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
        this.books.splice(index, 1);
        this.displayBook();
      });
    });
  
    const statusButtons = document.querySelectorAll(".last-row button");
    statusButtons.forEach((button, id) => {
      button.addEventListener("click", () => {
        const status = button.textContent;
        const index = Number(button.dataset.id);
        const card = document.querySelector(`.card[data-id="${id}"]`);
        if (status === "Read") {
          button.classList.remove("read");
          button.classList.add("unread");
          card.classList.remove("green-card");
          card.classList.add("orange-card");
          button.textContent = "Unread";
          this.books[index].status = "unread";
        }
        else {
          button.classList.remove("unread");
          button.classList.add("read");
          card.classList.remove("orange-card");
          card.classList.add("green-card");
          button.textContent = "Read";
          this.books[index].status = "read";
        }
      });
    });
  }
}

const library = new Library();
library.displayBook();

const dialog = document.querySelector("dialog");
const showForm = document.querySelector(".show-form");
const addButton = document.querySelector(".add");
const closeButton = document.querySelector(".close");
const form = document.querySelector("form");
showForm.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
});

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pageInput = document.querySelector("#page");
const statusInput = document.querySelector("input[name=status]:checked");

titleInput.addEventListener("input", () => {
  showTitleError();
});

authorInput.addEventListener("input", () => {
  showAuthorError();
});

pageInput.addEventListener("input", () => {
  showPageError();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!titleInput.validity.valid) {
    showTitleError();
  }
  else if (!authorInput.validity.valid) {
    showAuthorError();
  }
  else {
    const title = titleInput.value;
    const author = authorInput.value;
    const page = pageInput.value;
    const status = statusInput.value;
    const book = new Book(title, author, page, status);
    library.addBook(book);  
    dialog.close();
    library.displayBook();  
  }
});

function showTitleError() {
  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity("The book title is required!");
  }
  else if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity("Please enter a real book title!");
  }
  else {
    titleInput.setCustomValidity("");
  }
}

function showAuthorError() {
  if (authorInput.validity.valueMissing) {
    authorInput.setCustomValidity("The book author is required!");
  }
  else if (authorInput.validity.tooShort) {
    authorInput.setCustomValidity("Please enter a real name!");
  }
  else {
    authorInput.setCustomValidity("");
  }
}

function showPageError() {
  if (pageInput.validity.valueMissing) {
    pageInput.setCustomValidity("Please enter number of pages!");
  }
  else if (pageInput.validity.rangeUnderflow) {
    pageInput.setCustomValidity("Number of pages must be greater than 10!");
  }
  else {
    pageInput.setCustomValidity("");
  }
}
