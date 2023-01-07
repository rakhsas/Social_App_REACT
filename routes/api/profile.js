const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/profile');
const User = require('../../models/User');

// @route 	Get api/profile/me
// @desc 	Get Current users Profile
// @access 	Private

router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile
		.findOne({ user: req.user.id })
		.populate('user',
		['name', 'avatar']);
		if (!profile)
			return res.status(400).json({ msg: 'There is No Profile For This User'});
		res.json(profile);
	}catch (err){
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route 	POST api/profile
// @desc 	Create or Update user Profile
// @access 	Private

router.post('/',
	[
		auth,
		[
			check('status', 'Status is Required')
			.not()
			.isEmpty(),
			check('skills', 'Skills is Required')
			.not()
			.isEmpty(),
		],
	], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
	{
		return res.status(400).json({ errors: errors.array() })
	}
	const {
		company,
		website,
		location,
		bio,
		status,
		githubusername,
		skills,
		youtube,
		twitter,
		instagram,
		linkedin,
		facebook,
	} = req.body;

	//build Skills Object

	const profileFields = { };
	profileFields.user = req.user.id;
	if(company) profileFields.company = company;
	if(website) profileFields.website = website;
	if(location) profileFields.location = location;
	if(bio) profileFields.bio = bio;
	if(status) profileFields.status = status;
	if(githubusername) profileFields.githubusername = githubusername;
	if (skills) {
		// console.log(1213);
		profileFields.skills = skills.split(',').map(skill => skill.trim())
	}
	//Build Social Object
	profileFields.social = {}
	if(youtube) profileFields.social.youtube = youtube;
	if(facebook) profileFields.social.facebook = facebook;
	if(twitter) profileFields.social.twitter = twitter;
	if(linkedin) profileFields.social.linkedin = linkedin;
	if(instagram) profileFields.social.instagram = instagram;

	try {
		let profile = Profile.findOne({ user: req.user.id });

		if (profile)
		{
			//update
			profile = await Profile.findOneAndUpdate(
				{ user: req.user.id },
				{ $set: profileFields },
				{ new: true }
			);
			return res.json(profile);
		}
			// create
			//console.log("hello");
		profile = new Profile(profileFields);
		await profile.save();
	}catch (err){
		console.err(err.message);
		res.status(500).send('Server Error');
	}
});
module.exports = router;
