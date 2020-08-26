const express = require('express'),
	router = express.Router(),
	bcrypt = require('bcryptjs'),
	config = require('config'),
	jwt = require('jsonwebtoken'),
	auth = require('../../middleware/auth');

const User = require('../../models/User');

// Authenticate (login)
router.post('/', (req, res) => {
	const { email, password } = req.body;

	if(!email || !password) {
		return res.status(400).json({ msg: 'Please fill all the fields' });
	}

	User.findOne({email})
		.then(user => {
			if(!user) return res.status(400).json({ msg: 'Invalid email' });

			// Validate password
			bcrypt.compare(password, user.password)
				.then(isMatch => {
					if(!isMatch) return res.status(400).json({ msg: 'Invalid Password' });

					jwt.sign(
						{ id: user._id },
						config.get('jwtSecret'),
						{ expiresIn: 3600 },
						(err, token) => {
							if (err) throw err;

							res.json({
								token,
								user: {
									id: user._id,
									name: user.name,
									email: user.email
								}
							});
						}
					)
				});
		});
});

router.get('/user', auth, (req, res) => {
	User.findById(req.user.id)
		.select('-password')
		.then(user => res.json(user));
});

module.exports = router;