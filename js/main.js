/* global data */
/* exported data */
var $Title = document.querySelector('#title');
var $photoUrl = document.querySelector('#photo-url');
var $Notes = document.querySelector('#notes');
var $image = document.querySelector('.image');
var $entriesThatWillHide = document.querySelector('.entries');
var $newEntryContainer = document.querySelector('#new-entry-container');
// querying element from html
var $form = document.querySelector('#form');// querying the form element html

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

}
// issue 2
var $entriesSpace = document.querySelector('.entries-space');
var $entriesBtn = document.querySelector('#entries');
$entriesBtn.addEventListener('click', takesJournalEntry);

function takesJournalEntry(event) { // function for when the entries title is clicked
  $newEntryContainer.classList.add('hidden');// hides the form
  var $divImage = document.createElement('DIV');// creates div element
  $divImage.classList.add('style-for-image-div');// adds a class for styling purposes
  var $img = document.createElement('IMG');// creates img element
  $img.setAttribute('src', data.entries[0].PhotoUrl);// assigns src to the img tag
  $img.setAttribute('alt', 'images');// assigns alt to the img tag

  var $rightContainer = document.createElement('DIV');// creates a div for the text
  var $titleH3 = document.createElement('H3');
  var $topParagraph = document.createElement('P');
  $topParagraph.textContent = data.entries[0].Notes;
  $titleH3.textContent = data.entries[0].Title;

  $rightContainer.appendChild($titleH3);// appends the title onto the text div
  $rightContainer.appendChild($topParagraph);// appends the p onto the text div

  $divImage.appendChild($img); // appends img to the div for images
  $entriesSpace.appendChild($divImage);// is appended to the actual div on html
  $entriesSpace.appendChild($rightContainer);
  $entriesThatWillHide.classList.remove('hidden');// makes it visible
}
