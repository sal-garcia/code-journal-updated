/* global data */
/* exported data */
var $newBtn = document.querySelector('.new-btn');
var $Title = document.querySelector('#title');
var $photoUrl = document.querySelector('#photo-url');
var $Notes = document.querySelector('#notes');
var $image = document.querySelector('.image');
var $entriesThatWillHide = document.querySelector('.entries');
var $newEntryContainer = document.querySelector('#new-entry-container');
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
    NextEntryId: data.nextEntryId// also of the nextEntryId from data.js
  };

  data.entries.unshift(formInput);// the new object is being pushed into the array entries of the
  data.nextEntryId++; // data object, and the data entryId is incremented
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

  var $containerForAll = document.createElement('DIV');

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

  // $containerForAll.appendChild($entriesSpace);
  $rightContainer.appendChild($titleH3);
  $rightContainer.appendChild($topParagraph);

  $containerForAll.appendChild($divImage);
  $containerForAll.appendChild($rightContainer);

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
}
function backToForms() { // it will view swap from the entries to the form
  $entriesThatWillHide.classList.add('hidden');
  $newEntryContainer.classList.remove('hidden');

}
var $buttonSave = document.querySelector('.button-save');// it will view swap when you click save in the form
$buttonSave.addEventListener('click', backToEntries);
