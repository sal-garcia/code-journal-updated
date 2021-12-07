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
