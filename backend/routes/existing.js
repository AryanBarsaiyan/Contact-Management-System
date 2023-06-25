var express = require('express');
const router = express.Router();
let Existing = require('../models/database.model');

router.route('/').get((req, res) => {
  Existing.find()
    .then(existing => res.json(existing))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').get((req, res) => {
  Existing.findById(req.params.id)
    .then(existing => res.json(existing))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Existing.findByIdAndDelete(req.params.id)
    .then(() => res.json('Existing Contact Deleted!!!.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Existing.findById(req.params.id)
    .then(
      existing => {
        existing.username = req.body.username;
        existing.phonenumber = Number(req.body.phonenumber);
        existing.email = req.body.email;
        existing.image = req.body.image;
  
      existing.save()
        .then(() => res.json('Existing Contact Updated!!!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;