const express = require('express'),
	router = express.Router(),
	bcrypt = require('bcryptjs'),
	config = require('config'),
	jwt = require('jsonwebtoken');

// User model
const User = require('../../models/User');

router.post('/register', (req, res) => {
	const { name, email, password } = req.body;

	if(!name || !email || !password) {
		return res.status(400).json({ msg: 'Please fill all fields' });
	}

	User.findOne({ email })
		.then(user => {
			if(user) {
				return res.status(400).json({ msg: 'Email already exists' });
			}

			const newUser = new User({
				name, email, password
			});

			// Create salt and hash
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if(err) throw err;

					newUser.password = hash;

					newUser.save()
						.then(user => {
							jwt.sign(
								{ id: user.id },
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
							);
						});
				})
			});
		});
});

module.exports = router;