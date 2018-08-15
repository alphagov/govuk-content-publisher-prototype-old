/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
})


// Branching publishing options

router.post('/publish', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let publish = req.session.data['publish']

  if (publish === 'false') {
    res.redirect('confirm-force-publish')
  } else {
    res.redirect('confirm-force-published')
  }
})
