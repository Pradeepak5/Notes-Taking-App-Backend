const express = require('express');
const { Register, Login, getNotes, createNotes, editNotes, deleteNotes, viewNotes } = require('../controllers/user.controller');
const { registerMiddlewareValidation, LoginMiddlewareValidation, notesMiddlewareValidation } = require('../middleware/input-validation/user.middleware');
const { validateToken } = require('../middleware/token-validation/validateToken.middleware');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send({message:"Welcome To Users Route"})
});

router.post('/add-user', registerMiddlewareValidation, Register);

router.post('/login', LoginMiddlewareValidation, Login);

router.get('/notes/:id', validateToken, getNotes);

router.post('/create-notes/:id', notesMiddlewareValidation, validateToken, createNotes);

router.put('/edit-notes/:id/:noteId', notesMiddlewareValidation, validateToken, editNotes);

router.delete('/delete-notes/:id/:noteId', validateToken, deleteNotes);

router.get('/view-notes/:id/:noteId', validateToken, viewNotes);

module.exports = router;
