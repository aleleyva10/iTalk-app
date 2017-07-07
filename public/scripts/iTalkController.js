var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/partials/login.html'
  }).when('/home', {
    templateUrl: 'views/partials/home.html'
  }).when('/register', {
    templateUrl: 'views/partials/register.html'
  });
});

myApp.controller('iTalkController', iTalkController);

function iTalkController(iTalkService, $location) {
  var vm = this;
  vm.loggedInUser;
  vm.loggedInID;
  vm.loginToggle = true;
  vm.items = [];

  vm.toggleLogin = function() {
    vm.loginToggle = !vm.loginToggle;
  };

  vm.register = function() {
    console.log('in controller register');
    // assemble credentialsObject
    var credentials = {
      username: vm.username,
      password: vm.password
    };

    iTalkService.sendRegister(credentials).then(function() {
      // clear out inputs
      vm.username = "";
      vm.password = "";
    });
  };

  vm.logIN = function() {
    console.log('in controller logIn');
    var credentials = {
      username: vm.username,
      password: vm.password
    };
    iTalkService.logIn(credentials).then(function(response) {
      console.log(response);

      vm.loggedInUser = response.username;
      vm.loggedInID = response.id;
      vm.username = "";
      vm.password = "";
    });
  };

  vm.logOut = function() {
    console.log('logging out', vm.loggedInUser);
    vm.loggedInUser = '';
    $location.path('/');
  };

  vm.addPhrase = function() {
    var phraseToSend = {
      phrase: vm.phrase,
      userID: vm.loggedInID
    };
    vm.phrase = '';
    iTalkService.addPhrase(phraseToSend).then(function(res) {
      console.log(res);
      vm.getPhrases();
    });
  };

  vm.init = function() {
    vm.checkUser();
    vm.getPhrases();
  };

  vm.getPhrases = function() {
    console.log('in controller, getPhrases');
    iTalkService.getPhrases().then(function(res) {
      console.log('in controller:', res);
      vm.phrases = res.data;
    });
  };

  vm.checkUser = function() {
    iTalkService.checkUser().then(function(res) {
      console.log(res);
      if (res.data === "No User Logged") {
        sweetAlert("Oops!", "No User Logged In");
        $location.path('/');
      } else {
        vm.loggedInUser = res.data.username;
        vm.loggedInID = res.data.id;
      }
    });
  };

  vm.deletePhrase = function(index) {
    console.log('phrase to delete:', index);
    iTalkService.deletePhrase(index).then(function() {
      console.log('back in controller', iTalkService.deletedPhrase);
      vm.delete = iTalkService.deletedPhrase;
      vm.getPhrases();
    });
  };

}
