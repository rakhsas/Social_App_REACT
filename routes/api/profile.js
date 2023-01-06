const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// @route 	Get api/profile/me
// @desc 	Get Current users Profile
// @access 	Private
router.get('/', auth, async (req, res) => {
	try {

	}catch (err)
	{

	}
});

module.exports = router;
