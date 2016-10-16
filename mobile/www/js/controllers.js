angular.module('safeSnap.controllers', [])

.controller('DashCtrl', function($scope) {})


.controller('RegistrationCtrl', function($scope, $location, UserRegistration, $ionicPopup, $rootScope, $ionicHistory) {
  $scope.data = {};
  $scope.register = function() {
    var user_registration = new UserRegistration({ user: $scope.data });
    user_registration.$save(
      function(data){
        window.localStorage['userId'] = data.id;
        window.localStorage['userName'] = data.name;
        $location.path('/tab/patients');
      },
      function(err){
        var error = err["data"]["error"] || err.data.join('. ')
        var confirmPopup = $ionicPopup.alert({
          title: 'An error occured',
          template: error
        });
      }
    );
  }
})

.controller("indexController", function($scope, $rootScope) {

})

.controller('LoginCtrl', function($scope, $location, UserSession, $ionicPopup, $rootScope, $ionicHistory) {
  // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) { 
  //   // do something
  //   $ionicHistory.clearHistory();
  //   // if (toState.name === 'myBaseStateName') {
  //   // }
  // })

  $scope.data = {};
  $scope.login = function() {
    var user_session = new UserSession({ user: $scope.data });
    user_session.$save(
      function(data){
        window.localStorage['userId'] = data.id;
        window.localStorage['userName'] = data.name;
        $location.path('/tab/patients');
      },
      function(err){
        var error = err["data"]["error"] || err.data.join('. ')
        var confirmPopup = $ionicPopup.alert({
          title: 'An error occured',
          template: error
        });
      }
    );
  }
})

.controller('PatientsCtrl', function($cordovaFileTransfer, $http, $scope, Patients, api) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.patients = [];

  $scope.$on('$ionicView.beforeEnter', function() {
    $http.get(api.url("api/physicians/1/patients"))
      .success(function(data) {
        $scope.patients = data;
      })
  });
  
  var imageURI = './img/profile_photos/adam.png';


  var scope = $scope;
  $scope.remove = function(index, patient) {
    var deleteUrl = api.url("api/physicians/1/patients/" + patient.id);
    $http({
    method: 'DELETE',
    data: { id: patient.id },
    url: deleteUrl,
      }).then(function successCallback(response) {
        // BUG make sure jsons match up perfectly for correct delete UI
        // console.log($scope.patients, response.data);
        $scope.patients.splice(index, 1);
        // $state.go('tab.patients', {}, { reload: true });
        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
        alert("error while deleting patient");
          // called asynchronously if an error occurs
          // or server returns response with an error status.
    });
  };
})

.controller('PatientDetailCtrl', function($http, $scope, $stateParams, api, $cordovaCamera, $state) {
  $scope.addNewImageToSet = function(patientId, setId) {
    var options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 250,
        targetHeight: 250,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
    };
     
    $cordovaCamera.getPicture(options).then(function(imageData) {
        $scope.pictureUrl = "data:image/jpeg;base64," + imageData;
        $state.go("submit-new-image", {patientId: $stateParams.patientId, setId: $stateParams.setId, pictureUrl: $scope.pictureUrl });
    }, function(err) {
      console.log(err);
        // error
    });
  };

  $http.get(api.url("api/physicians/1/patients"))
    .success(function(data) { 
      $scope.patients = data;
      var getPatientById = function(patients, patientId) {
        for (var i = 0; i < patients.length; i++) {
          if (patients[i].id === parseInt(patientId)) {
            return patients[i];
          }
        }
        return null;
      };

      var getSet = function(patients, patientId, setId) {
        for (var i = 0; i < patients.length; i++) {
          if (patients[i].id === parseInt(patientId)) {
            var patient = patients[i];
          }
        }
        for (var i = 0; i < patient.image_sets.length; i++) {
          if (patient.image_sets[i].id === parseInt(setId)) {
            return patient.image_sets[i];
          }
        }

        return null;
      };

      $scope.patients = data;
      $scope.patient = getPatientById($scope.patients, $stateParams.patientId);
      $scope.set = getSet($scope.patients, $stateParams.patientId, $stateParams.setId);
    })
})

.controller('ChoosePatientCtrl', function($http, $scope, $state, $ionicPopup, $stateParams, Patients, api, $rootScope, $cordovaCamera) {
 // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) { 
 //    // do something
 //    $ionicHistory.clearHistory();
 //    if (toState.name === 'myBaseStateName') {

 //    }
 // })
 $scope.isPatientChosen = false;

 $scope.patients = [];
 $http.get(api.url("api/physicians/1/patients"))
  .success(function(data) {
    $scope.patients = data;
  })

 $scope.toggleNameFieldSelected = function() {
  $scope.nameFieldSelected = true;
  // if () {

  // }
  //$scope.isPatientChosen = false;
  $scope.resetSetField();

  // if ($scope.isPatientChosen) {
  //   $scope.resetNameField();
  // }
 }

 $scope.resetNameField = function() {
  nameInput = document.getElementById('patient-name-input');
  nameInput.innerText = "";
  $scope.patientId = null;
  // $scope.resetSetField();
 }

$scope.toggleIncidentFieldSelected = function() {
  $scope.incidentFieldSelected = true;
  $scope.isSetChosen = false;
  if ($scope.isSetChosen) {
    $scope.resetSetField();
  }
  
 }

 $scope.resetSetField = function() {
  setInput = document.getElementById('set-name-input');
  setInput.innerText = "Incident"
  $scope.setId = null;
 }

 $scope.choosePatient = function(patientId, patientName) {
  $scope.patientId = patientId;
  $scope.isPatientChosen = true;
  $scope.nameFieldSelected = false;
  document.getElementById('patient-name-input').innerText = patientName;

  $scope.incidentFieldSelected = true;
  $scope.isSetChosen = false;
  // this.resetSetField();

  // Grab set for chosen patient
 $scope.patient = [];
 $scope.sets = []

 // check if patientId is valid in the database, and then if not, create new patient.

  var getUrl = api.url("api/physicians/1/patients/" + patientId);
  $http.get(getUrl)
    .success(function(data) {
      $scope.patient = data;
      $scope.sets = $scope.patient.image_sets
    })
 };

 $scope.chooseSet = function(setId, setName) {
  $scope.setId = setId;
  setInput = document.getElementById('set-name-input')
  setInput.innerText = setName;
  $scope.isSetChosen = true;
  // go to choose photo page for corresponding patient + set
 }


 $scope.submit = function() {
  if ($scope.patientId && $scope.setId) {
    // $state.go("tab.take-photo", {patientId: $scope.patientId, setId: $scope.setId });
    // var getUrl = api.url("api/physicians/1/patients/" + $scope.patientId + "/image_sets/" + $scope.setId);
    // $http.get(getUrl)
    // .success(function(data) {
    //   $scope.set = data;
    // });
  
    var options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 250,
        targetHeight: 250,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
    };
     
    $cordovaCamera.getPicture(options).then(function(imageData) {
        $scope.pictureUrl = "data:image/jpeg;base64," + imageData;
        // s3Uploader.upload($scope.pictureUrl, "text.txt");

        $state.go("submit-new-image", {patientId: $scope.patientId, setId: $scope.setId, pictureUrl: $scope.pictureUrl });
    }, function(err) {
        // error
    });
  } else if (!$scope.patientId) { // if no patient selected
    $ionicPopup.alert({
      title: 'Please choose a patient'
    });
  } else { // if no set
    $ionicPopup.alert({
      title: 'Please choose a set'
    });
  }
 }

 $scope.closeModals = function(obj, $event) {
  var $target = $($event.target);
  if (!$target.hasClass('keep-modal')) {
    $scope.nameFieldSelected = false;
    $scope.incidentFieldSelected = false;
    // $scope.isSetChosen = false;
  }
 }
 // var pageBody = document.getElementsByClassName("ionic-scroll");
 // var wrappedResult = angular.element(pageBody);
 // wrappedResult.click(function(e) {
 //  console.log(clicked);
 // })
})

.controller('TakePhotoCtrl', function($http, $scope, $cordovaCamera, $state, $stateParams, Patients, api) {
  $scope.set = {};
  var getUrl = api.url("api/physicians/1/patients/" + $stateParams.patientId + "/image_sets/" + $stateParams.setId);
  $http.get(getUrl)
  .success(function(data) {
    $scope.set = data;
  });
  
  $scope.takePicture = function() {
    var options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 250,
        targetHeight: 250,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
    };
     
    $cordovaCamera.getPicture(options).then(function(imageData) {
        $scope.pictureUrl = "data:image/jpeg;base64," + imageData;
        // s3Uploader.upload($scope.pictureUrl, "text.txt");

        $state.go("tab.submit-new-image", {patientId: $stateParams.patientId, setId: $stateParams.setId, pictureUrl: $scope.pictureUrl });
    }, function(err) {
      alert("error");
        // error
    });
  }
})

.controller('NewImageCtrl', function($http, $scope, $state, $stateParams, Patients, api) {
  $scope.pictureUrl = $stateParams.pictureUrl;

  $scope.set = {};
  var getUrl = api.url("api/physicians/1/patients/" + $stateParams.patientId + "/image_sets/" + $stateParams.setId);
  $http.get(getUrl)
  .success(function(data) {
    $scope.set = data;
  });

  // $scope.submit = function() {
  //   new_image = {
  //     url: this.pictureUrl,
  //     desc: this.desc
  //   };
  //   $scope.set.images.unshift(new_image);
  //   $scope.pictureUrl = 'http://placehold.it/300x300';
  //   $state.go('tab.patients');
  // }

  var scope = $scope;
  $scope.submit = function() {
    var imageData = {
      url: this.pictureUrl,
      description: this.desc
    };

    var postUrl = api.url("api/physicians/1/patients/" + $stateParams.patientId + "/image_sets/" + $stateParams.setId + "/images");

    $http({
    method: 'POST',
    data: imageData,
    url: postUrl,
      }).then(function successCallback(response) {
        scope.set.images.unshift(response.data);
        $state.go('tab.patients');
        // $state.go('tab.patients', {}, { reload: true });
        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
    });
  }
})

.controller('SetListCtrl', function($http, $scope, $state, $stateParams, Patients, api) {

  $scope.$on('$ionicView.beforeEnter', function() {
    $http.get(api.url("api/physicians/1/patients"))
      .success(function(data) {
        $scope.patients = data;
        var getPatientById = function(patients, patientId) {
          for (var i = 0; i < patients.length; i++) {
            if (patients[i].id === parseInt(patientId)) {
              return patients[i];
            }
          }
          return null;
        };

        var getSet = function(patientId, setId) {
          for (var i = 0; i < patients.length; i++) {
            if (patients[i].id === parseInt(patientId)) {
              var patient = patients[i];
            }
          }
          for (var i = 0; i < patient.image_sets.length; i++) {
            if (patient.image_sets[i].id === parseInt(setId)) {
              return patient.image_sets[i];
            }
          }

          return null;
        };

        $scope.patient = getPatientById($scope.patients, $stateParams.patientId);
        // $scope.patient = Patients.get($stateParams.patientId);
        $scope.sets = $scope.patient.image_sets

        $scope.remove = function(set, index) {
          var patientId = $stateParams.patientId;
          var setId = set.id;
          var deleteUrl = api.url("api/physicians/1/patients/" + patientId + "/image_sets/" + setId);
          $http({
          method: 'DELETE',
          data: { patient_id: patientId, id: set.id },
          url: deleteUrl,
            }).then(function successCallback(response) {
              // BUG make sure jsons match up perfectly for correct delete UI
              $scope.sets.splice(index, 1);
              // $state.go('tab.patients', {}, { reload: true });
              // this callback will be called asynchronously
              // when the response is available
            }, function errorCallback(response) {
              alert("error while deleting image set");
                // called asynchronously if an error occurs
                // or server returns response with an error status.
          });
        };
    })

  });

})

.controller('NewSetCtrl', function($http, $scope, $state, $stateParams, $ionicPopup, api) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd='0'+dd
  } 

  if(mm<10) {
      mm='0'+mm
  } 

  today = mm + dd;

  $scope.patient = [];
  var getUrl = api.url("api/physicians/1/patients/" + $stateParams.patientId);
  $http.get(getUrl)
    .success(function(data) {
      $scope.patient = data;
    })

  var scope = $scope;
  $scope.submit = function() {
    var data = {
      name: this.name,
      description: this.description,
      patient_id: parseInt($stateParams.patientId),
    };
    var url = api.url('api/physicians/1/patients/' + $stateParams.patientId + '/image_sets');

    if (!this.name) {
      $ionicPopup.alert({
        title: 'No Set Name',
        template: "Please provide a set name"
      });
    } else {
      $http({
      method: 'POST',
      data: data,
      url: url
        }).then(function successCallback(response) {
          scope.patient.image_sets.push(response.data);
          $state.go('tab.patient-detail', {patientId: $scope.patient.id, setId: response.data.id}, {reload: true});
          // this callback will be called asynchronously
          // when the response is available
        }, function errorCallback(response) {
          alert("error while creating image set");
            // called asynchronously if an error occurs
            // or server returns response with an error status.
      });
    }
  }
})

.controller('NewPatientCtrl', function($http, $scope, $state, $stateParams, Patients, api) {

  $scope.patients = [];
  $http.get(api.url("api/physicians/1/patients"))
    .success(function(data) {
      $scope.patients = data;
    })


  var scope = $scope;
  $scope.submit = function() {
    var nameArray = this.full_name.split(" ");
    var firstName = nameArray[0];
    var lastName = nameArray[1];

    var data = {
      first_name: firstName,
      last_name: lastName
    };

    $http({
    method: 'POST',
    data: data,
    url: api.url('api/physicians/1/patients')
      }).then(function successCallback(response) {
        console.log("patients before", scope.patients);
        scope.patients.push(response.data);
        console.log("patients", scope.patients);
        $state.go('tab.patients', {}, { reload: true })
        // $state.go('tab.patients', {}, { reload: true });
        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
        alert("error while creating patient");
          // called asynchronously if an error occurs
          // or server returns response with an error status.
    });
  }
})

.controller('ChatsCtrl', function($scope, Patients) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.patients = Patients.all();
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Patients) {
  $scope.patient = Patients.get($stateParams.patientId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
