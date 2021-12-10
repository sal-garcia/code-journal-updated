/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', reloadFunc);

function reloadFunc(event) {
  localStorage.setItem('dataObject', JSON.stringify(data));
}

var $formInputStringified = localStorage.getItem('dataObject');
if ($formInputStringified !== null) {
  data = JSON.parse($formInputStringified);
}
