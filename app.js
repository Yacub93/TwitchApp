var classApp = angular.module('twitchApp', []);

classApp.controller("twitchCtrl", function($scope, $http) {
  var obj = $scope;

  obj.appInfo = {
    heading: "Twitch App API",

    subHeading2: {
      githubprofile: "https://github.com/Yacub93",
      linkedinprofile: "https://uk.linkedin.com/in/yacub-ali-4898b9103"
    }
  };
    var clientID = "mxvcve7xx4xjlbbqigfq25emjf1h7p";
    var twitchURL = "https://api.twitch.tv/kraken/streams/freecodecamp";


       // Simple GET request example:
  $http({
        method: 'GET',
        url: twitchURL,
        headers:{
          'CLIENT-ID':clientID
        },
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          console.log(response);

          if (response.stream === null) {
            //FCC Offline
            $scope.status = "OFFLINE"
          } else {
            //FCC Online
            $scope.status = "LIVE"

          }

            $http({
              method: 'GET',
              url: 'https://api.twitch.tv/kraken/users/freecodecamp/follows/channels/',
              headers:{
                'CLIENT-ID':clientID
              },
            }).then(function successCallback(response2) {
                // this callback will be called asynchronously
                // when the response is available
                console.log(response2);


              }, function errorCallback(response2) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log(response2);
              });  



        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.log(response);
        });

}); //.Close controller         
    







