const myLibrary = [];

const addBook = document.getElementById("add-book");
const bookModal = document.getElementById("add-book-modal");
const searchResultModal = document.getElementById("search-result-modal");
const closeModal = document.querySelector(".close");
const searchModalClose = document.getElementById("search-modal-close");
const searchModalImg = document.getElementById("search-modal-img");
const searchModalTitle = document.getElementById("search-modal-title");
const searchModalAuthor = document.getElementById("search-modal-author");
const searchAddBook = document.getElementById("search-add-form");
const addBookForm = document.getElementById("book-form");
const bookDisplay = document.querySelector(".book-display");
//search modal buttons
const viewMore = document.querySelector(".view-more");
const submitBook = document.querySelector(".submit-book");

//book count
let bookCount = 0; //change when using local

const searchBook = async function (text) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${text}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw Error(response.status);
  }
  const data = await response.json();
  results = data;
  console.log(data);
  return data;
};
//book constructor
function Book(title, author, pages, read, img) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.img = img;
}
//create book
function addBooktoLibrary(bookData) {
  console.log(bookData);
  myLibrary.push(
    new Book(
      bookData.title,
      bookData.author,
      bookData.page_number,
      bookData.read_check,
      bookData.img_url
    )
  );
  bookCount++;

  //main book card
  let div = document.createElement("div");
  div.setAttribute("book-number", bookCount);
  div.classList.add("book");

  let img = document.createElement("img");
  img.src = bookData.img_url || "default_book_cover.webp";
  img.alt = `${bookData.title} by ${bookData.author}`;

  //book details
  let overlay = document.createElement("div");
  overlay.classList.add("book-details");

  // Add title
  let title = document.createElement("h3");
  title.textContent = bookData.title;
  overlay.appendChild(title);

  // Add author
  let author = document.createElement("p");
  author.textContent = bookData.author;
  overlay.appendChild(author);

  // Add page count
  let pageCount = document.createElement("p");
  pageCount.classList.add(".page-count");
  pageCount.textContent = bookData.page_number;
  overlay.appendChild(pageCount);
  // Add read status
  let readStatus = document.createElement("p");
  readStatus.classList.add("read-status");
  readStatus.textContent = bookData.read_check ? "Read" : "Not read";
  overlay.appendChild(readStatus);

  div.appendChild(img);
  div.appendChild(overlay);
  bookDisplay.appendChild(div);
}

addBook.addEventListener("click", (e) => {
  bookModal.style.display = "block";
});
closeModal.addEventListener("click", (e) => {
  console.log(e);
  bookModal.style.display = "none";
});
searchModalClose.addEventListener("click", (e) => {
  console.log(e);
  searchResultModal.style.display = "none";
});
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const bookData = new FormData(e.target);
  const bookDataValues = Object.fromEntries(bookData);
  console.log(bookDataValues);
  addBooktoLibrary(bookDataValues);
});
searchAddBook.addEventListener("submit", async (e) => {
  e.preventDefault();
  const bookData = new FormData(e.target);
  const bookDataValues = Object.fromEntries(bookData);
  console.log(bookDataValues.add_search_title);
  let searchResults = await searchBook(bookDataValues.add_search_title);
  const title = searchResults.items[0].volumeInfo?.title || "Title not found";
  const author =
    searchResults.items[0].volumeInfo?.authors?.join(", ") ||
    "Author not found";
  const bookImgId = searchResults.items[0].id;
  const imgCover = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${bookImgId}`
  );
  imgData = await imgCover.json();
  console.log("SS", imgData);

  // Extract image links in order of preference (highest quality first)
  const imageLinks = imgData.volumeInfo?.imageLinks;
  let bestImageUrl =
    imageLinks?.large ||
    imageLinks?.medium ||
    imageLinks?.small ||
    imageLinks?.thumbnail ||
    imageLinks?.smallThumbnail;
  if (bestImageUrl && bestImageUrl.startsWith("http:")) {
    bestImageUrl = bestImageUrl.replace("http:", "https:");
    searchModalImg.src = bestImageUrl;
  }
  searchModalTitle.textContent = title;
  searchModalAuthor.textContent = author;
  searchResultModal.style.display = "block";
});

viewMore.addEventListener("click", () => {});
submitBook.addEventListener("click", () => {});
