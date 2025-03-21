const myLibrary = [
  {
    author: "J.K. Rowling",
    imgUrl:
      "https://books.google.com/books/content?id=5iTebBW-w7QC&printsec=frontcover&img=1&zoom=4&edge=curl&imgtk=AFLRE722qbZwjp6SyCjpY_tPcmnr8VTCQJ9nzsJtIWziWqgPM7BgZKAhyYTD9E0jKKXVqHAxkXVn9Hn4km-a5i-nrsHJovbPlNWa6bnR0bZvwoe5wi-79cKxAgwDt3-yy2VnHDrVhvWY&source=gbs_api",
    isbn: "9781781100509",
    read: false,
    pages: "343",
    title: "Harry Potter and the Chamber of Secrets",
    toggleRead: function () {
      this.read = !this.read;
    },
  },
  {
    author: "J.R.R. Tolkien",
    imgUrl:
      "https://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=4&edge=curl&imgtk=AFLRE72IRSbF3xa2_F7FeKiRb2W3nw4bzhhPYW51swpsRoG2TSQhK8q4A1-qEyAQ2qrUmC0tggPeaDDzafupJqquMyKQXpYX6HT5jdf63-_4aLEeMAxdywNPdXvhU7o8hf8-IFmf45QK&source=gbs_api",
    isbn: "9780547951973",
    pages: "331",
    read: true,
    title: "The Hobbit",
    toggleRead: function () {
      this.read = !this.read;
    },
  },
  {
    author: "J.K. Rowling",
    imgUrl:
      "https://books.google.com/books/content?id=R7YsowJI9-IC&printsec=frontcover&img=1&zoom=4&edge=curl&imgtk=AFLRE73p4zaPWYLXVedCGwI3NrhGiRxJtVP79dyxxTAYWYauBKJnrZUvdBKXAnqFqqNf7oiZMLPQev-eVmOIE-xRNzKvRs64-7oXS3yB2tKL5of2vkP0G2dNgVVM25EjrMtaCXGUbsQF&source=gbs_api",
    isbn: "9781781100547",
    pages: "663",
    read: true,
    title: "Harry Potter and the Half-Blood Prince",
    toggleRead: function () {
      this.read = !this.read;
    },
  },
];
let searchResults;
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
const viewImgsButton = document.querySelector(".view-images");
//search modal buttons
const viewMore = document.querySelector(".view-more");
//
const imgChooseClose = document.getElementById("img-choose-close");
//
const viewMoreModal = document.getElementById("view-more-modal");
const viewMoreClose = document.getElementById("view-more-close");
const searchResultsContainer = document.getElementById(
  "search-results-container"
);
//filters
const sortSelect = document.getElementById("sort-select");
const readFilter = document.getElementById("read-filter");
const searchBar = document.getElementById("search-bar");

//book count
let = 0; //change when using local

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
  this.toggleRead = () => {
    this.read = !this.read;
  };
}

const deleteBook = (index) => {
  myLibrary.splice(index, 1);
  // let bookToDelete = document.querySelector(`[book-number ="${index}"]`);
  // console.log(bookToDelete); // doesnt work as indexes as book-numbers wont add up after deleting one book
  // bookToDelete.remove();     // BEST TO ADD UNIQUE ID TO BOOK OBJECT AND SET THAT AS DATA ATTRIBUTE WHEN ADDIN LOCAL STORAGE
  displayLibrary(myLibrary); //rebuild to match data attribute to correct index of myLibrary
};
//add book to display
const displayBook = (bookData, index) => {
  let div = document.createElement("div");
  div.setAttribute("book-number", index);
  div.classList.add("book");

  let img = document.createElement("img");
  img.src = bookData.imgUrl || "default_book_cover.webp";
  img.alt = `${bookData.title} by ${bookData.author}`;

  //book details
  let overlay = document.createElement("div");
  overlay.classList.add("book-details");

  //delete button
  let deleteBtn = document.createElement("i");
  deleteBtn.classList.add("fi", "fi-ss-trash-xmark", "book-delete-btn");
  overlay.appendChild(deleteBtn);
  deleteBtn.addEventListener("click", () => {
    console.log(index);
    deleteBook(index);
  });

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
  pageCount.textContent = bookData.pages;
  overlay.appendChild(pageCount);
  // Add read status
  let readStatus = document.createElement("p");
  readStatus.classList.add("read-status");
  readStatus.textContent = bookData.read ? "Read" : "Not read";
  overlay.appendChild(readStatus);

  // Add click event to toggle read status
  readStatus.addEventListener("click", (e) => {
    console.log("book count", index);
    myLibrary[index].toggleRead(); // Toggle the read status
    readStatus.textContent = myLibrary[index].read ? "Read" : "Not read"; // Update the displayed text
  });

  let lastTap = 0;
  let hideTimeout;
  div.addEventListener("click", () => {
    console.log("jjgkjhk");
    const now = Date.now();
    if (now - lastTap < 300) {
      // 300ms threshold for double-tap
      overlay.style.opacity = 0;
      if (hideTimeout) clearTimeout(hideTimeout);
    } else {
      overlay.style.opacity = 1;

      if (hideTimeout) clearTimeout(hideTimeout);

      // Set a new timeout to hide details after 5 seconds
      hideTimeout = setTimeout(() => {
        overlay.style.opacity = 0;
      }, 5000); // 5 seconds
    }
    lastTap = now;
  });

  div.appendChild(img);
  div.appendChild(overlay);
  bookDisplay.appendChild(div);
};
//display books
const displayLibrary = (myLibrary) => {
  bookDisplay.innerHTML = "";
  myLibrary.forEach((book, index) => {
    displayBook(book, index);
  });
};
displayLibrary(myLibrary);

//create book
function addBooktoLibrary(bookData) {
  // Convert the checkbox value to a boolean
  bookData.read = bookData.read === "on"; // "on" becomes true, undefined becomes false because === returns true or false
  myLibrary.push(
    new Book(
      bookData.title,
      bookData.author,
      bookData.pages,
      bookData.read,
      bookData.imgUrl,
      bookData.isbn
    )
  );

  //main book card
  displayBook(bookData, myLibrary.length - 1);
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
  bookModal.style.display = "block";
  searchModalImg.src = "";
});
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const bookData = new FormData(e.target);
  const bookDataValues = Object.fromEntries(bookData);
  console.log(bookDataValues);
  addBooktoLibrary(bookDataValues);
});

const getBestImgLink = (imageLinks) => {
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
  return bestImageUrl;
};

searchAddBook.addEventListener("submit", async (e) => {
  e.preventDefault();
  const bookData = new FormData(e.target);
  const bookDataValues = Object.fromEntries(bookData);
  console.log(bookDataValues);

  searchResults = await searchBook(bookDataValues.add_search_title);
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
  console.log("imgs", imageLinks);
  let bestImageUrl = getBestImgLink(imageLinks);

  // Fill the form fields
  searchModalTitleInput.value = title;
  searchModalAuthorInput.value = author;
  searchModalPagesInput.value = pages;
  searchModalImgUrlInput.value = bestImageUrl;
  searchModalIsbnInput.value = isbn;

  //preview
  searchModalImg.src = bestImageUrl;

  searchResultModal.style.display = "block";
  bookModal.style.display = "none";
});

viewMore.addEventListener("click", (e) => {});
searchResultForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const bookData = new FormData(e.target);
  console.log("bookdata", bookData);
  const bookDataValues = Object.fromEntries(bookData);
  console.log("values", bookDataValues);
  addBooktoLibrary(bookDataValues);
  searchModalClose.click(); //resets search modal url and closes modal
});
const imgModalContent = document.getElementById("choose-img-covers");
const chooseImgsModal = document.getElementById("choose-img");

imgChooseClose.addEventListener("click", () => {
  chooseImgsModal.style.display = "none";
  searchResultModal.style.display = "block";
  imgModalContent.innerHTML = "";
});

viewImgsButton.addEventListener("click", (e) => {
  searchResults.items.forEach(async (result, index) => {
    console.log(index, result);
    let originalImgUrl = searchModalImgUrlInput.value;

    let div = document.createElement("div");
    let img = document.createElement("img");
    const bookImgId = result.id;

    // Get high-resolution cover image
    const imgCover = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${bookImgId}`
    );
    const imgData = await imgCover.json();

    // Extract image links in order of preference (highest quality first)
    const imageLinks = imgData.volumeInfo?.imageLinks;
    console.log("imgs choose ", imageLinks);
    let bestImageUrl = getBestImgLink(imageLinks);
    img.src = bestImageUrl || "default_book_cover.webp";
    img.alt = `${result.title} by ${result.author}`;
    console.log(originalImgUrl, bestImageUrl);
    // if (img.src.includes(originalImgUrl) || originalImgUrl.includes(img.src)) {// browser changes url so check id instead
    // }
    if (originalImgUrl.includes(bookImgId)) div.classList.add("selected-cover");
    imgModalContent.appendChild(div);
    div.appendChild(img);
    div.classList.add("img-cover");
    div.addEventListener("click", (e) => {
      console.log(e);
      if (e.currentTarget.classList.contains("selected-cover")) {
        console.log("selected already");
        e.currentTarget.classList.remove("selected-cover");
        searchModalImgUrlInput.value = originalImgUrl;
        searchModalImg.src = originalImgUrl;
      } else {
        let allCovers = document.querySelectorAll(".img-cover");
        allCovers.forEach((cover) => {
          cover.classList.remove("selected-cover");
        });
        div.classList.add("selected-cover");
        searchModalImgUrlInput.value = e.target.src;
        searchModalImg.src = searchModalImgUrlInput.value;
      }
    });
  });
  searchResultModal.style.display = "none";
  chooseImgsModal.style.display = "block";
});
searchModalImgUrlInput.addEventListener("input", (e) => {
  console.log(searchModalImgUrlInput.value);
  searchModalImg.src = searchModalImgUrlInput.value;
});

viewMore.addEventListener("click", (e) => {
  // Clear previous results
  searchResultsContainer.innerHTML = "";

  // Check if we have search results
  if (
    !searchResults ||
    !searchResults.items ||
    searchResults.items.length === 0
  ) {
    searchResultsContainer.innerHTML = "<p>No search results found</p>";
    return;
  }

  // Display all search results
  searchResults.items.forEach((item, index) => {
    const bookInfo = item.volumeInfo;
    const title = bookInfo?.title || "Title not found";
    const author = bookInfo?.authors?.[0] || "Author not found";
    const bookImgId = item.id;

    // Create result element
    const resultElement = document.createElement("div");
    resultElement.classList.add("search-result-item");

    // Create image element
    const imgElement = document.createElement("img");
    imgElement.src =
      bookInfo?.imageLinks?.thumbnail || "default_book_cover.webp";
    imgElement.alt = title;

    // Create title element
    const titleElement = document.createElement("h4");
    titleElement.textContent = title;

    // Create author element
    const authorElement = document.createElement("p");
    authorElement.textContent = author;

    // Add elements to result
    resultElement.appendChild(imgElement);
    resultElement.appendChild(titleElement);
    resultElement.appendChild(authorElement);

    // Add click event to select this result
    resultElement.addEventListener("click", async () => {
      // Get detailed information about this book
      const imgCover = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${bookImgId}`
      );
      const imgData = await imgCover.json();
      const bookInfo = imgData.volumeInfo;

      // Fill the form with this book's data
      searchModalTitleInput.value = bookInfo?.title || "";
      searchModalAuthorInput.value = bookInfo?.authors?.join(", ") || "";
      searchModalPagesInput.value = bookInfo?.pageCount || "";
      const imageLinks = bookInfo?.imageLinks;
      let bestImageUrl = getBestImgLink(imageLinks);
      searchModalImgUrlInput.value = bestImageUrl;
      searchModalIsbnInput.value =
        bookInfo?.industryIdentifiers?.[0]?.identifier || "";

      // Update the preview image
      searchModalImg.src = bestImageUrl;

      // Close this modal and show the book details modal
      viewMoreModal.style.display = "none";
      searchResultModal.style.display = "block";
    });

    // Add result to container
    searchResultsContainer.appendChild(resultElement);
  });

  // Hide the search result modal and show the view more modal
  searchResultModal.style.display = "none";
  viewMoreModal.style.display = "block";
});
viewMoreClose.addEventListener("click", () => {
  viewMoreModal.style.display = "none";
  searchResultModal.style.display = "block";
});

const applyFiltersAndSort = () => {
  const searchQuery = searchBar.value.toLowerCase();
  const filterValue = document.querySelector(
    'input[name="view"]:checked'
  ).value;
  const sortValue = sortSelect.value;

  let filteredBooks = myLibrary.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchQuery) ||
      book.author.toLowerCase().includes(searchQuery)
    );
  });

  if (filterValue === "read") {
    filteredBooks = filteredBooks.filter((book) => book.read);
  } else if (filterValue === "not-read") {
    filteredBooks = filteredBooks.filter((book) => !book.read);
  }

  switch (sortValue) {
    case "a-z":
      filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "z-a":
      filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "newest":
      break;
    case "oldest":
      filteredBooks.reverse();
      break;
    default:
      break;
  }

  displayLibrary(filteredBooks);
};

searchBar.addEventListener("input", applyFiltersAndSort);
readFilter.addEventListener("change", applyFiltersAndSort);
sortSelect.addEventListener("change", applyFiltersAndSort);
