const controllers = require('./controllers');

const router = (app) => {
  // connect routes
  app.get('/login', controllers.Account.loginPage);
  app.post('/login', controllers.Account.login);

  app.get('/signup', controllers.Account.signUpPage);
  app.post('signup', controllers.Account.signup);

  app.get('/logout', controllers.Account.logout);
  app.get('/maker', controllers.Domo.makerPage);
  app.get('/', controllers.Account.loginPage);
};

module.exports = router;
