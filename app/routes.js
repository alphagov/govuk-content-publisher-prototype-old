const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

// Branching
router.post('/confirm-publish', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let publish = req.session.data['publish']

  if (publish === 'Publish') {
    res.redirect('/confirm-publish')
  } else if (publish === 'Force publish') {
    res.redirect('/confirm-force-published')
  } else {
    res.redirect('/submitted')
  }
})

module.exports = router



// Branching
router.post('/schedule', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let schedule = req.session.data['save']

  if (schedule === 'save') {
    res.redirect('/content-summary-draft-date')
  } else {
    res.redirect('/schedule-2')
  }
})
