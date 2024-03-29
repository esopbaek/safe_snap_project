// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('safeSnap', ['ionic', 'ngCordova', 'ngResource', 'safeSnap.controllers', 'safeSnap.services'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.defaults.withCredentials = true;

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  // Register Account

  .state('register', {
    url: '/register',
    templateUrl: 'templates/registration.html',
    controller: 'RegistrationCtrl'
  })

  .state('submit-new-image', {
    cache: false,
    url: '/camera/choose-patient/:patientId/:setId/:pictureUrl',
    templateUrl: 'templates/new-image-info.html',
    controller: 'NewImageCtrl'
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.patient-detail', {
    url: '/patients/:patientId/set-index/:setId',
    views: {
      'tab-patients': {
        templateUrl: 'templates/patient-image-set.html',
        controller: 'PatientDetailCtrl'
      }
    }
  })

  .state('tab.set-list', {
    url: '/patients/:patientId/set-index',
    views: {
      'tab-patients': {
        templateUrl: 'templates/patient-set-list.html',
        controller: 'SetListCtrl'
      }
    }
  })

  .state('tab.new-set', {
    url: '/patients/:patientId/set/new',
    views: {
      'tab-patients': {
        templateUrl: 'templates/add-set.html',
        controller: 'NewSetCtrl'
      }
    }
  })

  .state('tab.new-patient', {
    url: '/patients/new',
    views: {
      'tab-patients': {
        templateUrl: 'templates/add-patient.html',
        controller: 'NewPatientCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.choose-patient', {
    cache: false,
    url: '/camera/choose-patient',
    views: {
      'tab-camera': {
        templateUrl: 'templates/choose-patient.html',
        controller: 'ChoosePatientCtrl'
      }
    }
  })

  .state('tab.patients', {
    url: '/patients',
    views: {
      'tab-patients': {
        templateUrl: 'templates/tab-patients.html',
        controller: 'PatientsCtrl'
      }
    }
  })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
