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

showForm.addEventListener("click", () => {
  dialog.showModal();
});

addButton.addEventListener("click", (e) => {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const page = document.querySelector("#page").value;
  const status = document.querySelector("input[name=status]:checked").value;
  const book = new Book(title, author, page, status);
  library.addBook(book);
  e.preventDefault();
  dialog.close();
  library.displayBook();
});

