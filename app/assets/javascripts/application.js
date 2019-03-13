/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()

  // Tooltip
  $('.notification').hover(function () { $('#modal').css('visibility', 'visible') })

  // Autocomplete
  if ($('#primary-organisation').length) {
    window.accessibleAutocomplete.enhanceSelectElement({
      defaultValue: '',
      selectElement: document.querySelector('#primary-organisation')
    })
  }

  if ($('#supporting-organisations').length) {
    window.accessibleAutocomplete.enhanceSelectElement({
      defaultValue: '',
      selectElement: document.querySelector('#supporting-organisations')
    })

    $('#supporting-organisations').on('keyup', function (e) {
      if (e.type === 'blur' || e.which === 13) {
        e.preventDefault()
        addSelection($('#supporting-organisations').val())
      }
    })

    $(document).on('click', '.autocomplete__option', function (e) {
      e.preventDefault()
      addSelection($(e.target).text())
    })

    var addSelection = function (selection) {
      if (selection) {
        $('#supporting-organisations-multiselect-list').prepend('<li><a href="#remove">&times;</a> ' + selection + '</li>')
        $('#supporting-organisations').val('')
      }
    }

    $(document).on('click', 'a[href="#remove"]', function (e) {
      e.preventDefault()
      e.target.parentNode.remove()
    })
  }
})

// Toggle to show internal note

  var toggles = Array.prototype.slice.call(document.querySelectorAll('.target-to-show--toggle'))

  if (toggles) {
    toggles.forEach(toggle => {
      var allToggleTargets = Array.prototype.slice.call(document.getElementsByClassName('target-to-show'))
      var toggleTarget = document.getElementById(toggle.getAttribute('href').split('#')[1])
      var cancel = Array.prototype.slice.call(toggleTarget.getElementsByClassName('target-to-show--cancel'))[0]
      var toggleContainer = Array.prototype.slice.call(document.getElementsByClassName('target-to-show--toggle-container'))[0]

      toggle.addEventListener('click', e => {
        e.preventDefault()
        allToggleTargets.forEach(target => {
          target.style.display = 'none'
        })
        toggleTarget.style.display = 'block'
        if (toggleContainer) toggleContainer.style.display = 'none'
      }, false)

      if (cancel) {
        cancel.addEventListener('click', e => {
          e.preventDefault()
          toggleTarget.style.display = 'none'
          if (toggleContainer) toggleContainer.style.display = 'block'
        }, false)
    }
  })
}
