const controllers = require('./controllers');
//const mid = require('./middleware');

const router = (app) => {
  // connect routes
  // want to make sure login/signup is secure and logged out
  // so they cant try to login when logged in
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  //app.get('/login', controllers.Account.loginPage);
  //app.post('/login', controllers.Account.login);

  app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signUpPage);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  //app.get('/signup', controllers.Account.signUpPage);
  //app.post('/signup', controllers.Account.signup);

  // make sure theyre logged in and cant logout if they arent logged in
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  //app.get('/logout', controllers.Account.logout);

  // make sure theyre logged in. otherwise they cannot reach page
  app.get('/maker', mid.requiresLogin, controllers.Domo.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Domo.makeDomo);
  //app.get('/maker', controllers.Domo.makerPage);
  //app.post('/maker', controllers.Domo.makeDomo);

  //app.get('/', controllers.Account.loginPage);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;