const express = require('express');
const router = express.Router();
const passportEngine = require('../module/passport');


/* GET users listing. */
router.get('/', async (req, res, next) => {
  await passportEngine.verifydeuser(req, res, async ()=>{
      try{await res.send('12345respond with a resource54321' + req.body.newwindow);} catch(error) {console.error(error)}
  });
});

router.post('/signin', async (req, res, next) => {
    try{passportEngine.signinuser(req, res)} catch(error) {console.error(error)}
});

router.post('/signup', async (req, res, next) => {
    try{passportEngine.signupuser(req, res)} catch(error) {console.error(error)}
});

module.exports = router;
