/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};
var $formInputStringified = localStorage.getItem('Form-Input-Stringified');
if ($formInputStringified !== null) {
  $formInputStringified = JSON.parse($formInputStringified);
}

window.addEventListener('beforeunload', reloadFunc);

function reloadFunc(event) {
  localStorage.setItem('dataObject', JSON.stringify(data));
}
