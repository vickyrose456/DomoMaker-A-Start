const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => res.render('login');// end login page

const signUpPage = (req, res) => res.render('signup');// end sign up page

const logout = (req, res) => res.redirect('/');// end logout

const login = (req, res) => {

};// end login

const signup = (req, res) => {

};// end signup

module.exports = {
  loginPage,
  signUpPage,
  logout,
  login,
  signup,
};
