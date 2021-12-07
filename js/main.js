/* global data */
/* exported data */
var $Title = document.querySelector('#title');
var $photoUrl = document.querySelector('#photo-url');
var $Notes = document.querySelector('#notes');
var $image = document.querySelector('.image');

var $form = document.querySelector('#form');

$photoUrl.addEventListener('input', photoFunc);
function photoFunc(event) {
  $image.setAttribute('src', event.target.value);
}

$form.addEventListener('submit', formFunc);
function formFunc(event) {
  event.preventDefault();
  var formInput = {
    Title: $Title.value,
    PhotoUrl: $photoUrl.value,
    Notes: $Notes.value,
    NextEntryId: data.nextEntryId
  };
  localStorage.setItem('Form-Input-Stringified', JSON.stringify(formInput));
  data.entries.unshift(formInput);
  data.nextEntryId++;
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}
