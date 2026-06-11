const myLibrary = [new Book("Please insert a book in the library!", "", 0)];
let bookPointer = 0;
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
const lineBreak = document.createElement("br")


function Book(title, author, status) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.status = status;
}

function addBookToLibrary(title, author, status) {
  const newBook = new Book(title, author, status);
  myLibrary.push(newBook);
}

function goBack(){
  if (bookPointer < 2){
    bookPointer = myLibrary.length - 1;
  }else{
    bookPointer--;
  }
}

function goForward(){
  if(myLibrary.length == 1){
    bookPointer = 0;
  }else if (bookPointer == myLibrary.length - 1){
    bookPointer = 1;
  }else{
    bookPointer++;
  }
}

function changeContent(){
  titleDis.textContent = myLibrary.at(bookPointer).title;
  authorDis.textContent = myLibrary.at(bookPointer).author;
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
  const paragraph = document.createElement("p");
  paragraph.textContent = errorString;
  errorBox.appendChild(paragraph);
  if (errorBox.classList.contains('hide')) errorBox.classList.toggle('hide');
}

function submitButtonGuardClause(titleVal, authorVal, statusNumber){
  reset(errorBox);
  appendErrorMessage("Error: ");
  returnValue = 0;
  if (titleVal.length <= 0 || titleVal.length > 50){
    errorBox.appendChild(lineBreak);
    appendErrorMessage(" - Title must be less than 50 characters and more than 0 characters.");
    returnValue = 1;
  }

  if (authorVal.length <= 0 || authorVal.length > 50){
    errorBox.appendChild(lineBreak)
    appendErrorMessage(" - Author must be less than 50 characters and more than 0 characters.");
    returnValue = 1;
  }

  if (statusNumber != 1 && statusNumber != 2 && statusNumber != 3){
    errorBox.appendChild(lineBreak)
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

cancelButton.addEventListener('click', (e) =>{
  e.preventDefault();
  removeFilterAndForm();
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

backArr.addEventListener('transitionend', removeBackTransition)
forwardArr.addEventListener('transitionend', removeForwardTransition)