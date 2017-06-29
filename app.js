var classApp = angular.module('twitchApp', []);

classApp.controller("twitchCtrl", function($scope, $http) {
  var obj = $scope;

  obj.appInfo = {
    heading: "Twitch.tv Streamers",
    twitchLogo:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Twitch_logo.svg/2000px-Twitch_logo.svg.png',

    subHeading2: {
      githubprofile: "https://github.com/Yacub93",
      linkedinprofile: "https://uk.linkedin.com/in/yacub-ali-4898b9103"
    }
  };
    var twitchURL = "https://api.twitch.tv/kraken/streams/twitch";
    var clientID = 'mxvcve7xx4xjlbbqigfq25emjf1h7p';
    $scope.results = [];

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
         // console.log(response.data);
          if (response.data.stream === null) {
            //Offline
            obj.status === "OFFLINE"
            
          } else {
            //Online
            obj.status === "LIVE"
            
          }
          

            $http({
              method: 'GET',
              // url:'https://api.twitch.tv/kraken/streams/twitch?followed',
              url: 'https://api.twitch.tv/kraken/users/twitch/follows/channels/',
              headers:{
                'CLIENT-ID':clientID
              },
            }).then(function successCallback(response2) {
                // this callback will be called asynchronously
                // when the response is available
                // console.log(response2.data);
                 for (var i = 0; i < response2.data.follows.length; i++) {
                        obj.displayName = response2.data.follows[i].channel.display_name;
                        obj.logo = response2.data.follows[i].channel.logo;
                        obj.status = response2.data.follows[i].channel.status;
                        obj.channel = response2.data.follows[i].channel.url;
                        obj.streaming = response2.data.follows[i].channel.game;

              if(obj.logo == null){
               obj.logo = "http://soneltest.com/static/error_image.png";
                  }

                        // store results in array 
                        $scope.results.push({
                           displayName: obj.displayName, 
                           logo: obj.logo,
                           status: obj.status,
                           channel:obj.channel,
                           streaming:obj.streaming
                           });  

                 }
      
      // filter channels
      $scope.getStreamer = function () {          
            for (var i = 0; i < response2.data.follows.length; i++) {
            //       console.log(response2.data.follows[i]);

                        obj.displayName2 = response2.data.follows[i].channel.display_name;
                        obj.logo2 = response2.data.follows[i].channel.logo;
                        obj.status2 = response2.data.follows[i].channel.status;
                        obj.channel2 = response2.data.follows[i].channel.url;
                        obj.streaming2 = response2.data.follows[i].channel.game;

                     console.log(obj.displayName2);

            var searchTerm = $scope.formData.searchTerm.replace(/[^A-Z0-9_]/ig, "");      


            if (obj.displayName2 === searchTerm) {
                    console.log("searchTerm " + $scope.formData.searchTerm);
                  

              if(obj.logo2 == null){
               obj.logo2 = "http://soneltest.com/static/error_image.png";
                  }
                        $scope.results = []; //empty array before populating
                        // store results in array 
                        $scope.results.push({
                           displayName: obj.displayName2, 
                           logo: obj.logo2,
                           status: obj.status2,
                           channel:obj.channel2,
                           streaming:obj.streaming2
                           });  

           }   



          }//.Close for loop
        }//.Close getStreamer()

              }, function errorCallback(response2) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                // console.log(response2);
              });  



        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          // console.log(response);
        });



}); //.Close controller         
    







