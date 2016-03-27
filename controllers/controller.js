var app = angular.module('mainApp', ['ngRoute']);


//Route Access Configuration
app.config(function($routeProvider) {
   $routeProvider
   
   .when('/', 
   {
       templateUrl: 'views/login_form.html'
   })
   
   .when('/dashboard', 
   {
       
       resolve: 
       {
           "check": function($location, $rootScope) 
           {
               
               //Confirm If LoggedIn Flag Is Set Before Redirecting To Dashboard
               if(!$rootScope.verificationPass) 
               {
                   $location.path('/')
               }
           }
       },
       templateUrl: 'views/loggedin_views/dashboard.html'
   })
   
   .when('/register', 
   {
       templateUrl: 'views/register_form.html'
   })

   .when('/login', 
   {
       templateUrl: 'views/login.html'
   })

   .when('/control_pannel', 
   {
      resolve: 
       {
           "check": function($location, $rootScope) 
           {
               
               //Confirm If LoggedIn Flag Is Set Before Redirecting To Dashboard
               if(!$rootScope.verificationPass) 
               {
                   $location.path('/')
               }
           }
       },
       templateUrl: 'views/loggedin_views/control_pannel.html'
   })

   .when('/create_event_pannel', 
   {
      resolve: 
       {
           "check": function($location, $rootScope) 
           {
               
               //Confirm If LoggedIn Flag Is Set Before Redirecting To Dashboard
               if(!$rootScope.verificationPass) 
               {
                   $location.path('/')
               }
           }
       },
       templateUrl: 'views/loggedin_views/create_event_pannel.html'
   })

   .when('/ticketWallet', 
   {
      resolve: 
       {
           "check": function($location, $rootScope) 
           {
               
               //Confirm If LoggedIn Flag Is Set Before Redirecting To Dashboard
               if(!$rootScope.verificationPass) 
               {
                   $location.path('/')
               }
           }
       },
       templateUrl: 'views/loggedin_views/ticketWallet.html'
   })

   .when('/eventViewer', 
   {
       
       resolve: 
       {
           "check": function($location, $rootScope) 
           {
               
               //Confirm If LoggedIn Flag Is Set Before Redirecting To Dashboard
               if(!$rootScope.verificationPass) 
               {
                   $location.path('/')
               }
           }
       },
       templateUrl: 'views/loggedin_views/eventViewer.html'
   })
   
   .otherwise(
   {
       redirectTo: '/'
   });
    
});

//Dashboard Controller
app.controller('dashboardCtrl', function($scope, $location, $rootScope, $http) {

      //Get User Info
      $http.get('/getUserInfo').success(function(data) {
        $scope.userInfo = data;
      });

      //Display Public Events 
      $http.get('/getPublicEventInfo').success(function(data) {
        //console.log(data);
        $scope.events = data;
      });

      $scope.findEvent = function() {

          console.log("Hello event viewer")
      };
});

//Event Viewer Controller
app.controller('eventViewerCtrl', function($scope, $location, $rootScope, $http) {

      console.log("Get Info About The Event");
});

//Event Creator Controller
app.controller('eventCreatorCtrl', function($scope, $location, $rootScope, $http) {
  $scope.createEvent = function() {

        event = {

            eventName: $scope.eventName,
            eventLocation: $scope.eventLocation,
            eventDate: $scope.eventDate,
            eventAvailableTickets: $scope.eventAvailableTickets
        }

        var eventObject = event;
        $scope.eventInfo = eventObject;

        $http.post('/createEvent', $scope.eventInfo).then(function(err){

            if(err) {
                

            }
            else {

                  //When Event Is Created Successfuly Redirect
                  console.log("Error - Can't Create Event");
                  $location.path('/dashboard');
            }
        });
  };

}); 

//Login Controller
app.controller('loginCtrl', function($scope, $location, $rootScope, $http) {
    $scope.submitLoginInfo = function() {
       
       //User Login Credentials Object 
       user = {
           username: $scope.username,
           password: $scope.password
    
       };
       
       //Post The Login Credential Object To Node          
       $http.post('/signin', user).then(function(response){
          
          //Retrieve The Validation Token Form The Server 
          var verification = response.data.success;
          
          //Check If The Validation Token Is True
          if(verification){

            $rootScope.verificationPass = true;
            console.log("Verification Successfull, Redirecting To Dashboard");

            //Redirect To Dashboar After Validation Is Compleate
            $location.path('/dashboard');
          }
          else {

            //Redirect To Login Page
            console.log("Verification Failed");
            $location.path('/');
          }
        });
      };
});
                                    

//Register Controller 
app.controller('registerCtrl', function($scope, $http, $location) {
    $scope.submitRegisterInfo = function() {

        if($scope.password != $scope.password_confirm)
        {
            console.log("Error : Passwords Dont Match ");
            $location.path('/');

        }
        else
        {
        
          person1 = {
          firstName: $scope.firstName,
          lastName: $scope.lastName,
          username: $scope.username,
          password: $scope.password
            
          };
        
          var personalInfo = person1;
          $scope.personalInfo = personalInfo;
        
          $http.post('/createUser', $scope.personalInfo);
          $location.path('/');
        }  
        
    };
});