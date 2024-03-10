const controller = require('../controllers/controllerAuth');

let postSignup = controller.postSignup;
let postLogin = controller.postLogin;
let postUserList = controller.postUserList;
let getDeleteUser = controller.getDeleteUser;
let getEditUser = controller.getEditUser;
let postEditUser = controller.postEditUser;

const express = require("express");
let router = express.Router();


//route for homepage action
router
  .route("/homepage")
  .get((req, res) => {
    var data = "";
  res.render("homepage", {data : data});
  })

//route for login action
router
  .route("/login")
  .get((req, res) => {
    console.log("yes")
    var data = "";
    res.render("login", {data : data});
  })
  .post(postLogin);


  //route for user list action
router
  .route("/userList")
  .get((req, res) => {
    console.log("yes")
    res.render("userList");
  })
  .post(postUserList);


  //route for edit user action
router
  .route("/editUser")
  .get((req, res) => {
    var data = null;
  res.render("edituser", {data : data});
  })
  .post(postEditUser);


  //route for signup action
router
  .route("/signup")
  .get((req, res) => {
    var data = null;
  res.render("signup", {data : data});
  })
  .post(postSignup);


  //route for deleting user action
router
  .route("/deleteUser")
  .get(getDeleteUser)

module.exports = router;




