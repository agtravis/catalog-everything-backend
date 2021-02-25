'use strict';

const router = require(`express`).Router();
const passport = require(`../../passport`);
const userController = require(`../../controllers/userController`);

router
  .route(`/`)
  .post(userController.newUser)
  .get(userController.userInSession);
router.route(`/all`).get(userController.findAll);
router.route(`/changepassword`).post(userController.changePassword);
router.route(`/checkpassword`).post(userController.checkPassword);
router.route(`/findone`).post(userController.search);
router.route(`/login`).post(
  (req, res, next) => {
    console.log(req.body);
    next();
  },
  passport.authenticate(`local`),
  userController.login
);
router.route(`/logout`).post(userController.logout);
router.route(`/search`).post(userController.search);
router
  .route(`/:id`)
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;
