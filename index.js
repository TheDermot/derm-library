const myLibrary = [];

const addBook = document.getElementById("add-book");
const bookModal = document.getElementById("add-book-modal");
const closeModal = document.querySelector(".close");
const searchAddBook = document.getElementById("search-add-form");
const addBookForm = document.getElementById("book-form");
const bookDisplay = document.querySelector(".book-display");

const searchBook = async function (text) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${text}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw Error(response.status);
  }
  const data = await response.json();
  results = data;
  console.log(data)
  return data;
};
//book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
//create book
function addBooktoLibrary(bookData) {
  console.log(bookData);
  myLibrary.push(
    new Book(
      bookData.title,
      bookData.author,
      bookData.page_number,
      bookData.read_check
    )
  );
  let div = document.createElement("div");
  div.classList.add("book");
  div.textContent = bookData.title;
  bookDisplay.appendChild(div);
}

addBook.addEventListener("click", (e) => {
  bookModal.style.display = "block";
});
closeModal.addEventListener("click", (e) => {
  bookModal.style.display = "none";
});
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const bookData = new FormData(e.target);
  const bookDataValues = Object.fromEntries(bookData);
  console.log(bookDataValues);
  addBooktoLibrary(bookDataValues);
});
searchAddBook.addEventListener("submit", (e) => {
  e.preventDefault();
  const bookData = new FormData(e.target);
  const bookDataValues = Object.fromEntries(bookData);
  console.log(bookDataValues.add_search_title);
  searchBook(bookDataValues.add_search_title);
});
