(function() {

  var app = angular.module('examen3', ['ngRoute']);


  app.directive('header', function() {
    return {
      restrict: 'A',
      templateUrl: '/partials/common/header.html'
    }
  });
  app.directive('headerconnect', function() {
    return {
      restrict: 'A',
      templateUrl: '/partials/common/headerconnect.html'
    }
  });

  app.directive('footer', function() {
    return {
      restrict: 'A',
      templateUrl: '/partials/common/footer.html'
    }
  });


  // Controllers
  app.controller('accueilController', function(hotelService) {
    this.seConnecter = function(form) {
      let connexion = {
        email: form.email,
        motdepasse: form.motdepasse
      };

      hotelService.connexion(connexion).then((response) => {
        console.log(response.data);
      });

    }
  });

  app.controller('homeController', function(hotelService) {
    this.hotels = [];
    hotelService.getAllHotel().then((response) => {
      this.hotels = response.data;
    });
  });

  app.controller('hotelController', function(hotelService, $routeParams) {
    var hotelID = $routeParams.hotelID;
    this.hotel = {};

    hotelService.getOneHotel(hotelID).then((response) => {
      console.log(response.data);
      this.hotel = response.data;
    });


    this.ajouterCommentaire = function(form) {
      let commentaire = {
        name: form.name,
        rating: parseInt(form.rating, 10),
        commentaire: form.commentaire
      };

      hotelService.postAddComment(hotelID, commentaire).then((response) => {
        this.hotel.reviews.push(response.data);
      });
    }

  });


  // Routage
  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/partials/home.html',
      controller: 'homeController',
      controllerAs: 'homeStore'
    })
    .when('/hotel/:hotelID', {
      templateUrl: '/partials/hotel.html',
      controller: 'hotelController',
      controllerAs: 'hotelStore'
    })
    .otherwise({
      redirectTo: '/'
    })
  }]);

  // Service Pour les hotels
  app.factory('hotelService', function($http) {
    return {
      getAllHotel: getAllHotel,
      getOneHotel: getOneHotel,
      postAddComment: postAddComment,
      connexion: connexion
    };
    function getAllHotel() {
      return $http.get('/api/hotel').then(complete).catch(failed);
    }
    function getOneHotel(hotelID) {
      return $http.get('/api/hotel/'+hotelID).then(complete).catch(failed);
    }
    function postAddComment(hotelID, commentaire) {
      return $http.post('/api/hotel/'+hotelID, commentaire).then(complete).catch(failed);
    }
    function connexion(connexion) {
      return $http.post('/api/connexion', connexion).then(complete).catch(failed);
    }

    function complete(response) { return response; }
    function failed(error) { console.log(error.statusText); }
  });

})();
