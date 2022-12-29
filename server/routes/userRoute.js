const express = require('express');
const passport = require('../passportConfig');

const userRouter = express.Router();
const userController = require('../controllers/userController');

// userRouter.get(
//   '/sign-in',
//   passport.authenticate('sign-in', {
//     session: true,
//     successRedirect: 'localhost:3000',
//   }),
// );

userRouter.post('/sign-in', passport.authenticate('sign-in', {
  session: true,
  // successRedirect: 'localhost:3000/',
  passReqToCallback: true,
}), (req, res) => {
  res.json(req.user);
});

userRouter.post(
  '/sign-up',
  passport.authenticate('sign-up', { session: true }),
  (req, res) => {
    res.send(req.user);
  },
);

userRouter.post('/sign-out', (req, res) => {
  if (req.user) {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.send('Logging out');
  } else {
    res.send('No user to log out');
  }
});

userRouter.get('/all-liked-posts', userController.getLikedPosts);

userRouter.post('/update-likes', userController.updateLikes);

module.exports = userRouter;
