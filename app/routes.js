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

// Scheduling 
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

// Choosing document types //

// Supergroups 
router.post('/document-types/what-is-content-for', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let supertype = req.session.data['choose-supertype']

  if (supertype === 'news-schema') {
    res.redirect('/document-types/choose-news-type')
  } 
  if (supertype === 'guidance-schema') {
      res.redirect('/document-types/choose-guidance-type')
    }
  if (supertype === 'transparency-statistics-schema') {
      res.redirect('/document-types/choose-transparency-statistics-type')
    }
  if (supertype === 'policy-schema') {
    res.redirect('/document-types/choose-policy-type')
  }  
  else {
    res.redirect('/document-types/what-is-content-for')
  }
})

// News types 
router.post('/document-types/choose-news-type', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let speech = req.session.data['news-type']

  if (speech === 'speech') {
    res.redirect('/speech/speech-steps-1')
  } 
  if (speech === 'statement') {
      res.redirect('/document-types/choose-statement-type')
    }
  if (speech === 'correspondence') {
      res.redirect('/publication/new-publication')
    }      
  else {
    res.redirect('/document-types/choose-news-type')
  }
})
