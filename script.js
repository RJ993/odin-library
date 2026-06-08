const myLibrary = [new Book("Love", "Shrek"), new Book("Chess", "John Chess")];
let bookPointer = 0;
const backButton = document.querySelector(".back");
const forwardButton = document.querySelector(".forward");
const titleDis = document.querySelector("#title");
const authorDis = document.querySelector("#author");


function Book(title, author) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
}

function addBookToLibrary(title, author) {
  const newBook = new Book(title, author);
  myLibrary.push(newBook);
}

function goBack(){
  if (bookPointer == 0){
    bookPointer = myLibrary.length - 1;
  }else{
    bookPointer--;
  }
}

function goForward(){
  if (bookPointer == myLibrary.length - 1){
    bookPointer = 0;
  }else{
    bookPointer++;
  }
}

function changeContent(){
  titleDis.textContent = myLibrary.at(bookPointer).title;
  authorDis.textContent = myLibrary.at(bookPointer).author;
}

backButton.addEventListener('click', (e) => {
  goBack();
  changeContent();
});

forwardButton.addEventListener('click', (e) => {
  goForward();
  changeContent();
});