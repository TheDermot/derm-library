const myLibrary = [
  {
    author: "J.K. Rowling",
    imgUrl:
      "https://books.google.com/books/content?id=5iTebBW-w7QC&printsec=frontcover&img=1&zoom=4&edge=curl&imgtk=AFLRE722qbZwjp6SyCjpY_tPcmnr8VTCQJ9nzsJtIWziWqgPM7BgZKAhyYTD9E0jKKXVqHAxkXVn9Hn4km-a5i-nrsHJovbPlNWa6bnR0bZvwoe5wi-79cKxAgwDt3-yy2VnHDrVhvWY&source=gbs_api",
    isbn: "9781781100509",
    read: undefined,
    pages: "343",
    title: "Harry Potter and the Chamber of Secrets",
  },
  {
    author: "J.R.R. Tolkien",
    imgUrl:
      "https://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=4&edge=curl&imgtk=AFLRE72IRSbF3xa2_F7FeKiRb2W3nw4bzhhPYW51swpsRoG2TSQhK8q4A1-qEyAQ2qrUmC0tggPeaDDzafupJqquMyKQXpYX6HT5jdf63-_4aLEeMAxdywNPdXvhU7o8hf8-IFmf45QK&source=gbs_api",
    isbn: "9780547951973",
    pages: "331",
    read: "on",
    title: "The Hobbit",
  },
  {
    author: "J.K. Rowling",
    imgUrl:
      "https://books.google.com/books/content?id=R7YsowJI9-IC&printsec=frontcover&img=1&zoom=4&edge=curl&imgtk=AFLRE73p4zaPWYLXVedCGwI3NrhGiRxJtVP79dyxxTAYWYauBKJnrZUvdBKXAnqFqqNf7oiZMLPQev-eVmOIE-xRNzKvRs64-7oXS3yB2tKL5of2vkP0G2dNgVVM25EjrMtaCXGUbsQF&source=gbs_api",
    isbn: "9781781100547",
    pages: "663",
    read: "on",
    title: "Harry Potter and the Half-Blood Prince",
  },
];

const addBook = document.getElementById("add-book");
const bookModal = document.getElementById("add-book-modal");
const searchResultModal = document.getElementById("search-result-modal");
const closeModal = document.querySelector(".close");
const searchModalClose = document.getElementById("search-modal-close");
const searchAddBook = document.getElementById("search-add-form");
const addBookForm = document.getElementById("book-form");
const bookDisplay = document.querySelector(".book-display");

const searchResultForm = document.getElementById("search-result-form");
const searchModalImg = document.getElementById("search-modal-img");
//searh modal inputs
const searchModalTitleInput = document.getElementById("search-modal-title");
const searchModalAuthorInput = document.getElementById("search-modal-author");
const searchModalPagesInput = document.getElementById("search-modal-pages");
const searchModalImgUrlInput = document.getElementById("search-modal-img-url");
const searchModalReadInput = document.getElementById("search-modal-read");
const searchModalIsbnInput = document.getElementById("search-modal-isbn");
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
function Book(title, author, pages, read, imgUrl, isbn) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.imgUrl = imgUrl;
  this.isbn = isbn;
}

//add book to display
const displayBook = (bookData) => {
  let div = document.createElement("div");
  div.setAttribute("book-number", bookCount);
  div.classList.add("book");

  let img = document.createElement("img");
  img.src = bookData.imgUrl || "default_book_cover.webp";
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
};
//display books
const displayLibrary = () => {
  myLibrary.forEach((book) => {
   displayBook(book)
  });
};
displayLibrary();

//create book
function addBooktoLibrary(bookData) {
  console.log(bookData);
  myLibrary.push(
    new Book(
      bookData.title,
      bookData.author,
      bookData.page_number,
      bookData.read_check,
      bookData.img_url,
      bookData.isbn
    )
  );
  bookCount++;

  //main book card
  displayBook(bookData);
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
  console.log(bookDataValues);

  let searchResults = await searchBook(bookDataValues.add_search_title);
  if (!searchResults.items || searchResults.items.length === 0) {
    alert("No books found. Try a different search.");
    return;
  }

  const bookInfo = searchResults.items[0].volumeInfo;
  const title = bookInfo?.title || "Title not found";
  const author = bookInfo?.authors?.join(", ") || "Author not found";
  const pages = bookInfo?.pageCount || "";
  const bookImgId = searchResults.items[0].id;
  const isbn = bookInfo?.industryIdentifiers?.[0]?.identifier || "";

  // Get high-resolution cover image
  const imgCover = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${bookImgId}`
  );
  const imgData = await imgCover.json();

  // Extract image links in order of preference (highest quality first)
  const imageLinks = imgData.volumeInfo?.imageLinks;
  let bestImageUrl =
    imageLinks?.large ||
    imageLinks?.medium ||
    imageLinks?.small ||
    imageLinks?.thumbnail ||
    imageLinks?.smallThumbnail ||
    "default_book_cover.webp";

  if (bestImageUrl && bestImageUrl.startsWith("http:")) {
    bestImageUrl = bestImageUrl.replace("http:", "https:");
  }

  // Fill the form fields
  searchModalTitleInput.value = title;
  searchModalAuthorInput.value = author;
  searchModalPagesInput.value = pages;
  searchModalImgUrlInput.value = bestImageUrl;
  searchModalIsbnInput.value = isbn;

  //preview
  searchModalImg.src = bestImageUrl;

  searchResultModal.style.display = "block";
});

viewMore.addEventListener("click", (e) => {});
searchResultForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const bookData = new FormData(e.target);
  console.log("bookdata", bookData);
  const bookDataValues = Object.fromEntries(bookData);
  console.log("values", bookDataValues);
  addBooktoLibrary(bookDataValues);
});
