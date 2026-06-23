const myLibrary = [new Book("Please insert a book in the library!", "", 0)];
let bookPointer = 0;
const book = document.getElementById("book");
const backButton = document.querySelector(".back");
const forwardButton = document.querySelector(".forward");
const titleDis = document.querySelector("#titleDis");
const authorDis = document.querySelector("#authorDis");
const newButton = document.querySelector(".new");
const filter = document.querySelector(".filter");
const form = document.querySelector("form");
const backArr = document.querySelector(".backArr");
const forwardArr = document.querySelector(".forwardArr");
const cancelButton = document.querySelector("#cancel");
const submitButton = document.querySelector("#shelve");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const statuses = document.getElementsByName("status");
const errorBox = document.querySelector(".errorMessage");
const deleteButton = document.querySelector(".delete");
const buttons = document.querySelectorAll("button");
const deleteBubble = document.querySelector(".deleteConfirmation");
const cancelDelete = document.getElementById("cancelDelete");
const confirmDelete = document.getElementById("confirmDelete");
const readStatus = document.getElementById("readStatus");


function Book(title, author, status) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.status = status;
  this.toggleStatus = function() {
    this.status++;
    if (this.status > 3) this.status = 1;
  }
}

function addBookToLibrary(title, author, status) {
  const newBook = new Book(title, author, status);
  myLibrary.push(newBook);
}

function goBack(){
  if (bookPointer < 2 || bookPointer > myLibrary.length){
    bookPointer = myLibrary.length - 1;
  }else{
    bookPointer--;
  }
}

function goForward(){
  if(myLibrary.length <= 1){
    bookPointer = 0;
  }else if (bookPointer >= myLibrary.length - 1){
    bookPointer = 1;
  }else{
    bookPointer++;
  }
}

function changeContent(){
  titleDis.textContent = myLibrary.at(bookPointer).title;
  authorDis.textContent = myLibrary.at(bookPointer).author;
  book.dataset.bookId = myLibrary.at(bookPointer).id;
  changeReadStatus();
}

function changeReadStatus(){
  readStatus.textContent = translateBookStatusCode();
  changeBookStatusColor();
}

function changeBookStatusColor(){
  removeBookStatusColor();
  switch (myLibrary.at(bookPointer).status) {
    case 1:
      readStatus.classList.add("notRead");
      break;
    case 2:
      readStatus.classList.add("inTheMiddle");
      break;
    case 3:
      readStatus.classList.add("finished");
      break;
    default:
      statusString = "Progress: N/A";
  }
}

function removeBookStatusColor() {
  if (readStatus.classList.contains("notRead")) {
    readStatus.classList.toggle("notRead");
  }
  if (readStatus.classList.contains("inTheMiddle")) {
    readStatus.classList.toggle("inTheMiddle");
  }
  if (readStatus.classList.contains("finished")) {
    readStatus.classList.toggle("finished");
  }
}

function translateBookStatusCode(){
  statusString = "";
  switch (myLibrary.at(bookPointer).status) {
    case 1:
      statusString = "Progress: Not read";
      break;
    case 2:
      statusString = "Progress: In the middle";
      break;
    case 3:
      statusString = "Progress: Finished";
      break;
    default:
      statusString = "Progress: N/A";
  }
  return statusString;
}

function revertContent(){
  titleDis.textContent = "No book has been selected";
  authorDis.textContent = "";
  book.dataset.bookId = "";
  readStatus.textContent = "Progress: N/A"
  bookPointer = 0;
}

function removeBackTransition(e){
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove("backPress")
}

function removeForwardTransition(e){
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove("forwardPress")
}

function removeFilterAndForm(){
  titleInput.value = "";
  authorInput.value = "";
  statuses[0].checked = true;
  filter.classList.add('hide');
  form.classList.add('hide');
  if (!errorBox.classList.contains('hide')){
    reset(errorBox);
    errorBox.classList.add('hide');
  }
}

function appendErrorMessage(errorString){
  const lineBreak = document.createElement("br");
  const paragraph = document.createElement("p");
  paragraph.textContent = errorString;
  errorBox.appendChild(paragraph);
  errorBox.appendChild(lineBreak);
  if (errorBox.classList.contains('hide')) errorBox.classList.toggle('hide');
}

function submitButtonGuardClause(titleVal, authorVal, statusNumber){
  reset(errorBox);
  appendErrorMessage("Error: ");
  returnValue = 0;
  if (titleVal.length <= 0 || titleVal.length > 50){
    appendErrorMessage(" - Title must be less than 50 characters and more than 0 characters.");
    returnValue = 1;
  }

  if (authorVal.length <= 0 || authorVal.length > 50){
    appendErrorMessage(" - Author must be less than 50 characters and more than 0 characters.");
    returnValue = 1;
  }

  if (statusNumber != 1 && statusNumber != 2 && statusNumber != 3){
    appendErrorMessage(" - Invalid status.");
    returnValue = 1;
  }

  return returnValue;
}

function reset(container){
  while (container.firstChild){
      container.removeChild(container.firstChild);
  }
}

function getStatusNumber(){
  let number = 0;
  for(stat = 0; stat < 3; stat++){
    if (statuses[stat].checked){
      number = Number(statuses[stat].value);
    }
  }
  return number
}

backButton.addEventListener('click', (e) => {
  backButton.firstChild.classList.add("backPress")
  goBack();
  changeContent();
});

forwardButton.addEventListener('click', (e) => {
  forwardButton.firstChild.classList.add("forwardPress")
  goForward();
  changeContent();
});

newButton.addEventListener('click', (e) =>{
  filter.classList.toggle('hide');
  form.classList.toggle('hide');
});

deleteButton.addEventListener('click', (e) =>{
  if (bookPointer == 0) return;
  filter.classList.toggle('hide');
  deleteBubble.classList.toggle('hide');
});

cancelButton.addEventListener('click', (e) =>{
  e.preventDefault();
  removeFilterAndForm();
});

cancelDelete.addEventListener('click', (e) =>{
  filter.classList.add('hide');
  deleteBubble.classList.add('hide');
});

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  let titleVal = titleInput.value;
  let authorVal = authorInput.value;
  let readStat = getStatusNumber();
  if (submitButtonGuardClause(titleVal, authorVal, readStat) == 0){
   addBookToLibrary(titleVal, authorVal, readStat);
   removeFilterAndForm();
  }
});

confirmDelete.addEventListener('click', (e) => {
  deletionCandidate = myLibrary.findIndex((currentBook, index, library) => {
    if (currentBook.id == book.dataset.bookId) return index;
  });
  if (deletionCandidate == -1) return;
  myLibrary.splice(deletionCandidate, 1);
  filter.classList.add('hide');
  deleteBubble.classList.add('hide');
  revertContent();
});

readStatus.addEventListener('click', (e) => {
  myLibrary.at(bookPointer).toggleStatus();
  changeReadStatus();
});

backArr.addEventListener('transitionend', removeBackTransition)
forwardArr.addEventListener('transitionend', removeForwardTransition)
buttons.forEach(button => button.addEventListener('click', (e) => {
  (bookPointer == 0) ? deleteButton.disabled = true : deleteButton.disabled = false;
  (bookPointer == 0) ? readStatus.disabled = true : readStatus.disabled = false;
}));