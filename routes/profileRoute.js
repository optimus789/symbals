const router = require('express').Router();

router.route('/').get((req, res) => {
    res.render('profile');
});

module.exports = router;
