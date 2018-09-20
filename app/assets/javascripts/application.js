/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()

  $('.notification').hover(function(){ $("#modal").css('visibility', 'visible');  })
  $('.close-modal').click(function(e) { e.preventDefault(); $("#modal").css('visibility', 'hidden'); })

  accessibleAutocomplete.enhanceSelectElement({
    defaultValue: '',
    selectElement: document.querySelector('#primary-organisation')
  })

  accessibleAutocomplete.enhanceSelectElement({
    defaultValue: '',
    selectElement: document.querySelector('#supporting-organisations')
  })

  $("#supporting-organisations").on(" keyup", function(e){
    if(e.type=="blur" || e.which == 13) {
      e.preventDefault()
      addSelection($("#supporting-organisations").val())
    }
  })

  $(document).on("click", ".autocomplete__option", function(e){
    e.preventDefault()
    addSelection($(e.target).text())
  })

  var addSelection = function(selection){
    if (selection) {
      $("#supporting-organisations-multiselect-list").prepend("<li><a href='#remove'>&times;</a> "+selection+"</li>")
      $("#supporting-organisations").val("")
    }
  }

  $(document).on("click", "a[href='#remove']", function(e){
    e.preventDefault();
    e.target.parentNode.remove()
  })

})

