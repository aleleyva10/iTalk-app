myApp.service('iTalkService', function($http, $location) {
  var sv = this;

  sv.sendRegister = function(credentials) {
    console.log('in service sendRegister');
    // remove temp data
    return $http.post('/register', credentials).then(function(response) {
      console.log('back from register attempt:', response);
    });
  };

  sv.logIn = function(credentials) {
    console.log('in service sendLogIn');
    return $http.post('/login', credentials).then(function(response) {
      console.log('back from login:', response);
      if (response.data) {
        $location.path('/home');
        return response.data;
      }
    });
  };

  sv.addPhrase = function(phrase) {
    console.log('phrase:', phrase);
    return $http.post('/phrases', phrase).then(function(response) {
      console.log('back from add:', response);
      return response;
    });
  };


  sv.getPhrases = function() {
    return $http.get('/phrases').then(function(response) {
      console.log('get response:', response);
      return response;
    });
  };

  sv.checkUser = function() {
    return $http.get('/login').then(function(response) {
      console.log(response);
      return response;
    });
  };


  sv.deletePhrase = function(phraseId) {
    console.log('in delete service', phraseId);
    return $http.delete('/phrases' + phraseId).then(function(response) {
      sv.deletedPhrase = response;
    });
  };

});
