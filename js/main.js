/* global data */
/* exported data */
var $btnSaveColor = document.querySelector('.button-save');
var $nextEntryId = document.querySelector('#entry-id');
var $redBtn = document.querySelector('.red-btn');
var $purpleTop = document.querySelector('.purple-top');
var $grayBtn = document.querySelector('.gray-btn');
var $modal = document.querySelector('.modal');
var $Body = document.querySelector('.body');
var $DeleteEntry = document.querySelector('.delete-entry');
var $newBtn = document.querySelector('.new-btn');
var $Title = document.querySelector('#title');
var $photoUrl = document.querySelector('#photo-url');
var $Notes = document.querySelector('#notes');
var $image = document.querySelector('.image');
var $entriesThatWillHide = document.querySelector('.entries');
var $newEntryContainer = document.querySelector('#new-entry-container');
var $editEntry = document.querySelector('#edit-entry');
// querying element from html
var $form = document.querySelector('#form');// querying the form element html
// var $buttonSave = document.querySelector('.button-save');
$photoUrl.addEventListener('input', photoFunc);// event listener into the image container
function photoFunc(event) { // function that will run once the image container is inputed
  $image.setAttribute('src', event.target.value);// and it will change the src of the image
}

$form.addEventListener('submit', formFunc);
function formFunc(event) { // function is passed into the form event listener
  event.preventDefault();
  var formInput = { // it will create an object and store the values temporarily of the inputs
    Title: $Title.value, // in the memory location of the object variable
    PhotoUrl: $photoUrl.value,
    Notes: $Notes.value,
    NextEntryId: data.nextEntryId// current entry id

  };
  if (data.editing === null) { // if conditionals are put here because i will click submit again when editing
    data.entries.unshift(formInput);// the new object is being pushed into the array entries of the
    data.nextEntryId++; // data object, and the data entryId is incremented
  } else { // this else will always run first since it starts as not null event if i edit the same one 2x
    data.editing.Title = formInput.Title;// because when i edit it, the icon click func runs
    data.editing.Notes = formInput.Notes;// which makes data.editing not null
    data.editing.PhotoUrl = formInput.PhotoUrl;// --these assign the edited value of the formInput into
    // the data.editing
    data.editing = null;// makes it null and makes the first if statement run
  }
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');// updated image
  $form.reset();
  // MOVES DATA ENTRY

  while ($entriesSpace.firstChild) { // it avoids the over lapping of previous content in entries with new content
    $entriesSpace.removeChild($entriesSpace.firstChild);// by removing the first child of $entriesSpace
    // which is the elements that have been created
  }
  movesDataEntry();// it will now run this function when i click on the save btn in the form
}
// issue 2
var $entriesSpace = document.querySelector('.entries-space');
var $entriesBtn = document.querySelector('#entries');
$entriesBtn.addEventListener('click', takesJournalEntry);

function takesJournalEntry(indexValue) { // function for when the entries title is clicked
  // hides the form and show entries
  backToEntries();// it calls the function that automatically switches the view swap from
  // the form to the entries
  if (!data.entries[indexValue]) { // logic gate to make sure theres data in the entries so it wont get an error when trying to switch and theres nothing
    return;
  }

  var $containerForAll = document.createElement('LI');
  $containerForAll.setAttribute('class', 'row');
  var $divImage = document.createElement('DIV');// creates div element
  $divImage.classList.add('style-for-image-div');// adds a class for styling purposes

  var $img = document.createElement('IMG');// creates img element
  $img.classList.add('width-for-image');
  $img.setAttribute('src', data.entries[indexValue].PhotoUrl);// assigns src to the img tag
  $img.setAttribute('alt', 'images');// assigns alt to the img tag

  $divImage.appendChild($img);

  var $rightContainer = document.createElement('DIV');
  $rightContainer.classList.add('size-of-right-container');// creates a div for the text

  var $titleH3 = document.createElement('H3');
  $titleH3.textContent = data.entries[indexValue].Title;
  var $topParagraph = document.createElement('P');
  $topParagraph.classList.add('width-paragraph');
  $topParagraph.textContent = data.entries[indexValue].Notes;

  var $iconDiv = document.createElement('DIV');// icon
  $iconDiv.classList.add('icon-div');
  var $icon = document.createElement('i');
  // $icon.setAttribute('data-index', indexValue);//two different ways of assigning the index value parameter
  $icon.innerHTML = `<i data-index=${indexValue} class="fas fa-edit"></i>`;// to the data attribute
  $iconDiv.appendChild($titleH3);
  $iconDiv.appendChild($icon);
  // $containerForAll.appendChild($entriesSpace);
  // $rightContainer.appendChild($titleH3);
  $rightContainer.appendChild($iconDiv);
  $rightContainer.appendChild($topParagraph);

  $containerForAll.appendChild($divImage);
  $containerForAll.appendChild($rightContainer);

  // $rightContainer.addEventListener('click', () => { console.log('parent element clicked'); }); // right container being clicked
  $icon.addEventListener('click', iconClickedFunc); // right container being clicked
  return $containerForAll;
}

window.addEventListener('DOMContentLoaded', movesDataEntry);// when the dom object model loads, the function will
function movesDataEntry() { // go thru the length of data entries and enter each one into the takesjournalentry function
  for (var i = 0; i < data.entries.length; i++) {
    var callsJournalEntry = takesJournalEntry(i);// i replacimng the indexvalue parameter

    $entriesSpace.appendChild(callsJournalEntry);
  }
}

$newBtn.addEventListener('click', backToForms);// event listener to "new" button on
// entries

function backToEntries() { // it will view swap from the form to the entries
  $entriesThatWillHide.classList.remove('hidden');
  $newEntryContainer.classList.add('hidden');
  $DeleteEntry.classList.add('entry-white');
}
function backToForms() { // it will view swap from the entries to the form
  $entriesThatWillHide.classList.add('hidden');
  $newEntryContainer.classList.remove('hidden');

}
var $buttonSave = document.querySelector('.button-save');// it will view swap when you click save in the form
$buttonSave.addEventListener('click', backToEntries);

// $rightContainer.addEventListener('click', iconClickedFunc); //right container being clicked

function iconClickedFunc(event) {

  $editEntry.innerHTML = 'Edit Entry';
  $entriesThatWillHide.classList.add('hidden');
  $newEntryContainer.classList.remove('hidden');
  $DeleteEntry.classList.remove('entry-white');

  data.editing = data.entries[event.target.dataset.index];// assigns the info that had been pushed inside
  // of the entries array of the data object at the event that has been targeted with the dataset of index
  // into the editing array of the data obj
  // console.log(data);
  $Title.value = data.editing.Title;// it then updates the value of each input so that it shows up when
  $Notes.value = data.editing.Notes;// you are editing it
  $photoUrl.value = data.editing.PhotoUrl;// after this it goes back to the FormFunc when submit is clicked
  $nextEntryId.value = data.editing.NextEntryId;
}

$DeleteEntry.addEventListener('click', deleteEntryFunc);

function deleteEntryFunc(event) {
  $Body.classList.add('gray-modal');
  $modal.classList.remove('hidden');
  $purpleTop.classList.add('header-gray');
  $DeleteEntry.classList.add('gray-delete');
  $btnSaveColor.classList.add('btn-save-color');
  $Title.disabled = true;
  $Title.classList.add('background-gray');
  $photoUrl.disabled = true;
  $photoUrl.classList.add('background-gray');
  $Notes.disabled = true;

}

$grayBtn.addEventListener('click', grayBtnFunc);

function grayBtnFunc(event) {
  $Body.classList.remove('gray-modal');
  $modal.classList.add('hidden');
  $purpleTop.classList.remove('header-gray');
  $DeleteEntry.classList.remove('gray-delete');
  $btnSaveColor.classList.remove('btn-save-color');
  $Title.disabled = false;
  $Title.classList.remove('background-gray');
  $photoUrl.disabled = false;
  $photoUrl.classList.remove('background-gray');
  $Notes.disabled = false;
}

$redBtn.addEventListener('click', redBtnFunc);

function redBtnFunc(event) {

  for (var i = 0; i < data.entries.length; i++) {

    if (data.entries[i].NextEntryId === parseInt($nextEntryId.value)) { // to keep track of each entry
      data.entries.splice(i, 1);

    }
  }
  $Body.classList.remove('gray-modal');
  $modal.classList.add('hidden');
  $purpleTop.classList.remove('header-gray');
  $DeleteEntry.classList.remove('gray-delete');
  $btnSaveColor.classList.remove('btn-save-color');
  $Title.disabled = false;
  $Title.classList.remove('background-gray');
  $photoUrl.disabled = false;
  $photoUrl.classList.remove('background-gray');
  $Notes.disabled = false;
}
