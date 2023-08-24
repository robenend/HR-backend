const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
// const config = require('config');
const { check, validationResult } = require('express-validator');

// const User = require('../models/User');
const Employee = require('../models/Employee');
// @route    GET api/auth
// @desc     Get user by token
// @access   Private
// router.get('/', auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
    // res.status(500).send('Server Error');
//   }
// });
// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public

router.post(
  '/auth',
  check('EmployeeID', 'EmployeeID').exists(),
  check('Password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { EmployeeID, Password } = req.body;
    // console.log(EmployeeID)

    try {
      let user = await Employee.findOne({employeeID: EmployeeID })

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      return res.status(200).json({message: "success"});

      // const isMatch = await bcrypt.compare(Password, user.password);

      // if (!isMatch) {
      //   return res
      //     .status(400)
      //     .json({ errors: [{ msg: 'Invalid Credentials' }] });
      // }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
