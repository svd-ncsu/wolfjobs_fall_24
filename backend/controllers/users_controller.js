const User = require("../models/user");
const bcrypt = require("bcrypt");  // Add bcrypt for hashing

module.exports.profile = function (req, res) {
  return res.render('user_profile', {
    title: 'User Profile'
  });
};

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }

  return res.render('user_sign_up', {
    title: "WolfJobs | Sign Up"
  });
};

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }

  return res.render('user_sign_in', {
    title: "WolfJobs | Sign In"
  });
};

// Create a new user with hashed password
module.exports.create = async function (req, res) {
  if (req.body.password !== req.body.confirm_password) {
    return res.redirect('back');
  }

  try {
    let user = await User.findOne({ email: req.body.email });
    
    if (!user) {
      // Hash the password before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      
      // Create a new user with the hashed password
      await User.create({
        email: req.body.email,
        password: hashedPassword,
        name: req.body.name,
        role: req.body.role,
        address: req.body.address,
        phonenumber: req.body.phonenumber,
        hours: req.body.hours,
        dob: req.body.dob,
        gender: req.body.gender,
        availability: req.body.availability,
        affiliation: req.body.affiliation,
        skills: req.body.skills,
        resume: req.body.resume,
        resumeId: req.body.resumeId
      });

      return res.redirect('/users/sign-in');
    } else {
      return res.redirect('back');
    }
  } catch (err) {
    console.log('Error in signing up the user:', err);
    return res.redirect('back');
  }
};

// Sign in the user and create session
module.exports.createSession = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the entered password with the hashed password
    const isMatch = await user.comparePassword(req.body.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Proceed with creating the session
    return res.redirect('/');
  } catch (err) {
    console.log('Error in signing in the user:', err);
    return res.redirect('back');
  }
};

module.exports.destroySession = function (req, res) {
  req.logout();
  return res.redirect('/');
};
