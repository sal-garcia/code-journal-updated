/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var $formInputStringified = localStorage.getItem('dataObject');
if ($formInputStringified !== null) { // if there is data in the object revive it and assign it
  data = JSON.parse($formInputStringified);// to the data object
}
window.addEventListener('beforeunload', reloadFunc);// beforeunload event will make the function
// beforeunload event will make the function
// run right before the page is refreshed
function reloadFunc(event) {
  // function will stringify the data object add the key name'dataObject'
  localStorage.setItem('dataObject', JSON.stringify(data));// and store it in localStorage

}
