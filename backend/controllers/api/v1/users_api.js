const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const Food = require("../../../models/food");
const History = require("../../../models/history");
const Job = require("../../../models/job");
const Application = require("../../../models/application");
const AuthOtp = require("../../../models/authOtp");
const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports.resetPassword = async function (req, res) {
  try {
    const { userId, newPassword } = req.body;

    // Find the user by ID
    let user = await User.findById(userId);

    if (!user) {
      return res.json(404, {
        message: "User not found",
        success: false,
      });
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    return res.json(200, {
      message: "Password reset successful",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

// Get all users (for admin)
module.exports.getAllUsers = async function (req, res) {
  try {
    let users = await User.find({});
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "List of all users",
      data: {
        users: users,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

// Delete a specific user (for admin)
module.exports.deleteUser = async function (req, res) {
  try {
    let userId = req.params.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.json(404, {
        message: "User not found",
        success: false,
      });
    }

    await User.findByIdAndDelete(userId);
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "User deleted successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    res.set("Access-Control-Allow-Origin", "*");
    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "Invalid username or password",
      });
    }
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "Sign In Successful, here is your token, please keep it safe",
      data: {
        token: jwt.sign(user.toJSON(), "wolfjobs", { expiresIn: "100000" }),
        user: user,
      },
      success: true,
    });
  } catch (err) {
    console.log("*******", err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.createHistory = async function (req, res) {
  try {
    let history = await History.create({
      date: req.body.date,
      caloriesgain: req.body.total,
      caloriesburn: req.body.burnout,
      user: req.body.id,
    });

    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "History Created Successfully",

      data: {
        history: history,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.signUp = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.json(422, {
        message: "Passwords do not match",
      });
    }

    User.findOne({ email: req.body.email }, function (err, user) {
      if (user) {
        res.set("Access-Control-Allow-Origin", "*");
        return res.json(200, {
          message: "Sign Up Successful, here is your token, please keep it safe",

          data: {
            token: jwt.sign(user.toJSON(), "wolfjobs", {
              expiresIn: "100000",
            }),
            user,
          },
          success: true,
        });
      }

      if (!user) {
        let user = User.create(req.body, function (err, user) {
          if (err) {
            return res.json(500, {
              message: "Internal Server Error",
            });
          }

          res.set("Access-Control-Allow-Origin", "*");
          return res.json(200, {
            message: "Sign Up Successful, here is your token, please keep it safe",

            data: {
              token: jwt.sign(user.toJSON(), "wolfjobs", {
                expiresIn: "100000",
              }),
              user,
            },
            success: true,
          });
        });
      } else {
        return res.json(500, {
          message: "Internal Server Error",
        });
      }
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.getProfile = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "The User info is",

      data: {
        user: user,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.editProfile = async function (req, res) {
  try {
    let user = await User.findById(req.body.id);

    user.name = req.body.name;
    user.password = req.body.password;
    user.role = req.body.role;
    user.address = req.body.address;
    user.phonenumber = req.body.phonenumber;
    user.hours = req.body.hours;
    user.availability = req.body.availability;
    user.gender = req.body.gender;
    check = req.body.skills;
    user.skills = check;
    user.save();
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "User is updated Successfully",

      data: {
        user,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.searchUser = async function (req, res) {
  try {
    var regex = new RegExp(req.params.name, "i");

    let users = await Job.find({ name: regex });
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "The list of Searched Users",

      data: {
        users: users,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.getHistory = async function (req, res) {
  try {
    let history = await History.findOne({
      user: req.query.id,
      date: req.query.date,
    });
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "The User Profile",

      data: {
        history: history,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.createJob = async function (req, res) {
  let user = await User.findOne({ _id: req.body.id });
  check = req.body.skills;
  try {
    let job = await Job.create({
      name: req.body.name,
      managerid: user._id,
      managerAffilication: user.affiliation,
      type: req.body.type,
      location: req.body.location,
      description: req.body.description,
      pay: req.body.pay,
      requiredSkills: req.body.requiredSkills,
      question1: req.body.question1,
      question2: req.body.question2,
      question3: req.body.question3,
      question4: req.body.question4,
    });
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      data: {
        job: job,
      },
      message: "Job Created!!",
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "NOT CREATED",
    });
  }
};

module.exports.index = async function (req, res) {
  let jobs = await Job.find({}).sort("-createdAt");

  res.set("Access-Control-Allow-Origin", "*");
  return res.json(200, {
    message: "List of jobs",

    jobs: jobs,
  });
};

module.exports.fetchApplication = async function (req, res) {
  let application = await Application.find({}).sort("-createdAt");

  res.set("Access-Control-Allow-Origin", "*");
  return res.json(200, {
    message: "List of Applications",

    application: application,
  });
};

module.exports.createApplication = async function (req, res) {
  try {
    const existingApplication = await Application.findOne({
      applicantid: req.body.applicantId,
      jobid: req.body.jobId,
    });

    if (existingApplication) {
      res.set("Access-Control-Allow-Origin", "*");
      return res.json(400, {
        message: "You have already applied for the job",
        error: true,
      });
    }

    let application = await Application.create({
      applicantid: req.body.applicantid,
      applicantname: req.body.applicantname,
      jobid: req.body.jobid,
      applicantans1: req.body.applicantans1,
      applicantans2: req.body.applicantans2,
      applicantans3: req.body.applicantans3,
      applicantans4: req.body.applicantans4,
      managerid: req.body.managerid,
      managerAffilication: req.body.managerAffilication,
      skills: req.body.skills,
      status: "pending",
    });
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "Application Created!!",
      data: {
        application: application,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.modifyApplication = async function (req, res) {
  try {
    let application = await Application.findById(req.body.applicationId);

    application.status = req.body.status;
    application.save();
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "Status of Application Updated!!",
      data: {
        application,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.acceptApplication = async function (req, res) {
  try {
    let application = await Application.findById(req.body.applicationId);
    application.status = "accepted";
    application.save();
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "Status of Application Updated!!",
      data: {
        application,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.rejectApplication = async function (req, res) {
  try {
    let application = await Application.findById(req.body.applicationId);
    application.status = "rejected";
    application.save();
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "Status of Application Updated!!",
      data: {
        application,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.closeJob = async function (req, res) {
  try {
    let job = await Job.findById(req.body.jobId);
    job.isOpen = false;
    job.save();
    res.set("Access-Control-Allow-Origin", "*");
    return res.json(200, {
      message: "Status of Job Updated!!",
      data: {
        job,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

function getTransport() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
}

// Generate OTP and send email to user
module.exports.generateOtp = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json(404, {
        message: "No user found with this email address",
      });
    }

    let otp = Math.floor(1000 + Math.random() * 9000);
    let otpRecord = await AuthOtp.findOneAndUpdate(
      { userId: user._id },
      { otp: otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    let transporter = getTransport();
    let mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Your OTP for Verification",
      text: `Your OTP is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.json(500, { message: "Error sending OTP" });
      } else {
        return res.json(200, {
          message: "OTP sent to email",
          data: { otpId: otpRecord._id },
        });
      }
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.verifyOtp = async function (req, res) {
  try {
    let otpRecord = await AuthOtp.findOne({
      userId: req.body.userId,
      otp: req.body.otp,
    });

    if (!otpRecord) {
      return res.json(400, {
        message: "Invalid OTP",
      });
    }

    let timeDiff = new Date() - otpRecord.createdAt;
    if (timeDiff > 5 * 60 * 1000) {
      return res.json(400, {
        message: "OTP has expired",
      });
    }

    await AuthOtp.findByIdAndDelete(otpRecord._id);
    return res.json(200, {
      message: "OTP verified successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
