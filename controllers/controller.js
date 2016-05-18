var app = angular.module('mainApp', ['ngRoute']);


//Route Access Configuration
app.config(function($routeProvider) {
   $routeProvider
   
   .when('/', 
   {
       templateUrl: 'views/public_views/login_form.html'
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
       templateUrl: 'views/public_views/register_form.html'
   })

   .when('/login', 
   {
       templateUrl: 'views/public_views/login.html'
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

   .when('/test', 
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
       templateUrl: 'views/loggedin_views/test.html'
   })

   .when('/inbox_message', 
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
       templateUrl: 'views/loggedin_views/inbox_message.html'
   })

   .when('/adminMessageViewer', 
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
       templateUrl: 'views/loggedin_views/adminMessageViewer.html'
   })

   .when('/messageViewer', 
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
       templateUrl: 'views/loggedin_views/messageViewer.html'
   })

   .when('/eventSettingsPannel', 
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
       templateUrl: 'views/loggedin_views/eventSettingsPannel.html'
   })

   .when('/create_message', 
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
       templateUrl: 'views/loggedin_views/create_message.html'
   })

   .when('/userInbox', 
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
       templateUrl: 'views/loggedin_views/userInbox.html'
   })

   .when('/manualEntryForm', 
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
       templateUrl: 'views/loggedin_views/manualEntryForm.html'
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

   .when('/manageEvent', 
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
       templateUrl: 'views/loggedin_views/manageEvents.html'
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

//Ticket Wallet Controller
app.controller('feedbackCtrl', function($scope, $location, $rootScope, $http) {

    $scope.submitFeedback = function() {
    
      feedback = {
        name: $scope.name,
        email: $scope.email,
        message: $scope.message
      }

      $scope.userFeedback = feedback;
      $http.post('/sendUserFeedback', $scope.userFeedback);

      var $toastContent = $('<span>Thank You For Your Feedback</span>');
      Materialize.toast($toastContent, 3000);

    }
});

//Ticket Wallet Controller
app.controller('ticketWalletCtrl', function($scope, $location, $rootScope, $http) {

    
    $scope.loadData = function () {
    
      //Get User Info Once They Are Logged In
      $http.get('/getAllMyTickets').success(function(data) {
        $rootScope.tickets = data;
      });
    }; 

    //Load The Tickets
    $scope.loadData();
 
    //Remove User Ticket 
    $scope.removeUserTicket= function(ticket) {

        console.log(ticket);

        $http.post('/removeUserTicket', ticket);

        //Refresh The Scope
        $scope.loadData();

        var $toastContent = $('<span>Ticket Removed</span>');
        Materialize.toast($toastContent, 3000);
    };
      
});

//Get Admin Messages 
app.controller('adminInboxCtrl', function($scope, $location, $rootScope, $http) {

    //Get User Info Once They Are Logged In
    $http.get('/displayAdminMessages').success(function(data) {
      $rootScope.messages = data;
    });
      
    $scope.getAdminMessage = function(message)
    {
        //Fetch The Admin Message For Message Viewer
        console.log("View");
        //console.log($scope.messages[message]);

        $rootScope.currentAdminMessage = $scope.messages[message];
        $location.path('/adminMessageViewer');
    }  

    $scope.removeAdminMessage = function(message)
    {
        //Remove Admin Message 
        console.log("Remove");
        //console.log($scope.messages[message]);

        $http.post('/removeAdminMessage', $scope.messages[message]).success(function(data) {
        $scope.testy = data;
        //console.log($rootScope.eventView.eventName);
        //Relocate To Event View Pages
        
        });
    }

    $scope.sendAdminMessage = function(event) {

        messageBody = {
            eventName: $rootScope.currentAdminMessage.eventName,
            firstNameTo: $scope.currentAdminMessage.firstNameFrom,
            lastNameTo: $scope.currentAdminMessage.lastNameFrom,
            message: $scope.adminMessage
        }

        $scope.adminMessage = messageBody;
        $http.post('/sendAdminMessage', $scope.adminMessage);
      };


});

//Get User Messages 
app.controller('userInboxCtrl', function($scope, $location, $rootScope, $http) {

    //Fetch All The Messages Related To The User
    $http.get('/displayUserMessages').success(function(data) {
      $rootScope.messages = data;
    });

    $scope.findUserMessage = function(message)
    {
        //Fetch The Current Message Info
        $rootScope.currentMessage = $scope.messages[message];

        console.log($scope.currentMessage);

        //Relocate To Event View Pages
        $location.path('/messageViewer');
    }

    $scope.sendMessage = function()
    {
        console.log($scope.messageViewerMessage);

        //console.log("Message : " + $scope.messageViewerMessage + " Event " + $rootScope.currentMessage.eventName);

        messageBody = {

          message: $scope.messageViewerMessage,
          event: $rootScope.currentMessage.eventName,
          firstNameTo: $rootScope.currentMessage.firstNameFrom,
          lastNameTo: $rootScope.currentMessage.lastNameFrom,
        }

        $scope.userReply = messageBody;
        $http.post('/sendUserReply', $scope.userReply);

        //Message Content $scope.messageViewerMessage
        //Message For Event $rootScope.currentMessage.eventName 

    }

    $scope.removeUserMessage = function(message)
    {
        console.log("Remove");
        console.log($scope.messages[message]);

        $http.post('/removeUserMessage', $scope.messages[message]).success(function(data) {
        $scope.testy = data;
        //console.log($rootScope.eventView.eventName);
        //Relocate To Event View Pages
        
        });
    }
  
});

//Dashboard Controller
app.controller('dashboardCtrl', function($scope, $location, $rootScope, $http) {

      //Get User Info Once They Are Logged In
      $http.get('/getUserInfo').success(function(data) {
        $rootScope.userInfo = data;
      });

      //Display Public Events Once The User IS Loged In
      $http.get('/getPublicEventInfo').success(function(data) {
        //console.log(data);
        $scope.events = data;
      });

      //When User Clicks ViewEvent Extract Info And Open Event Viewer
      $scope.findEvent = function(event) {

          console.log("Index = " +event);

          //Place The View To Scope
          $scope.eventView = $scope.result[event];
          //console.log($scope.eventView.eventCreatedByFirstName);
          //console.log($scope.eventView.eventCreatedByLastName);
          console.log($scope.events[event]);
        
          //Create Object Of The View
          eventView = {
            eventName: $scope.eventView.eventName,
            eventDate: $scope.eventView.eventDate,
            eventLocation: $scope.eventView.eventLocation,
            eventCreatedByFirstName: $scope.eventView.eventCreatedByFirstName,
            eventCreatedByLastName: $scope.eventView.eventCreatedByLastName,
            eventTickets: $scope.eventView.eventAvailableTickets,
            eventDescription: $scope.eventView.eventDescription,
            eventLocationCountry: $scope.eventView.eventLocationCountry,
            eventLocationArea: $scope.eventView.eventLocationArea,
            eventImageUrl: $scope.eventView.eventImageUrl
          };

          console.log(eventView);

          //Put The Event Info Into Global Scope So Its Visible By Event View Page
          $rootScope.eventViewInfo = eventView;

          //Relocate To Event View Pages
          $location.path('/eventViewer');

        

      };
});

//Manage Event Controller
app.controller('manageEventCtrl', function($scope, $location, $rootScope, $http) {

   //Set Scope Value For Update
    $scope.eventNameUpdate = $rootScope.manageEventView.eventName;
    $scope.eventLocationCountryUpdate = $rootScope.manageEventView.eventLocationCountry;
    $scope.eventLocationAreaUpdate = $rootScope.manageEventView.eventLocationArea;
    $scope.eventStartTimeUpdate = $rootScope.manageEventView.eventStartTime;
    $scope.eventFinishTimeUpdate = $rootScope.manageEventView.eventFinishTime;
    $scope.eventCategoryUpdate = $rootScope.manageEventView.eventCategory;
    $scope.eventDateUpdate = $rootScope.manageEventView.eventDate;
    $scope.eventAvailableTicketsUpdate = $rootScope.manageEventView.eventAvailableTickets;
    $scope.eventImageUrlUpdate = $rootScope.manageEventView.eventImageUrl;
    $scope.eventDescriptionUpdate = $rootScope.manageEventView.eventDescription;


   //Find All Tickets That Belong To The Event
   $http.post('/getEventGuest', $rootScope.manageEventView).success(function(data) {
        $scope.tickets = data;
        //console.log($rootScope.eventView.eventName);
    });

   //Activate Event
   $scope.activateEvent = function() {

      var $toastContent = $('<span>Event Activated</span>');
      Materialize.toast($toastContent, 3000);

      $http.post('/activateEvent', $rootScope.manageEventView).success(function(data) {

      });
   };

   //Deactivate Event 
   $scope.deactivateEvent = function() {

      var $toastContent = $('<span>Event Deactivated</span>');
      Materialize.toast($toastContent, 3000);

      $http.post('/deactivateEvent', $rootScope.manageEventView).success(function(data) {
          
      });
   };


   //Deactivate Event 
   $scope.removeEvent = function() {

      //Remove The Event
      var $toastContent = $('<span>Event Removed</span>');
      Materialize.toast($toastContent, 3000); 

      $http.post('/removeEvent', $rootScope.manageEventView);

      //Remove All The Tickets
   };

   $scope.banUser = function(ticket) {

      
      $scope.ticket = $scope.tickets[ticket];
      //console.log($scope.ticket);

      $http.post('/banUser',  $scope.ticket).success(function(data) {
        $scope.tickets = data;
        //console.log($rootScope.eventView.eventName);
      });
   };

   //Manual Entry Form
   $scope.manualEntryForm = function(ticket) {

      //Relocate To Event View Pages
      $rootScope.ticketOwnerDetails = ticket;

      console.log($rootScope.ticketOwnerDetails);
      $location.path('/manualEntryForm');
      
   };

   //Manual Entry Form
   $scope.requestEntry = function() {

      var $toastContent = $('<span>Requesting Entry</span>');
      Materialize.toast($toastContent, 3000);
      
      console.log($rootScope.ticketOwnerDetails.ticketId);
      console.log($scope.code);
   };

   //Update The Event Information
   $scope.updateEventInfo = function() {

      updatedEventInfo = {

        eventNameOriginal: $rootScope.manageEventView.eventName,
        eventName: $scope.eventNameUpdate,
        eventCountryLocation: $scope.eventLocationCountryUpdate,
        eventAreaLocation: $scope.eventLocationAreaUpdate,
        eventDate: $scope.eventDateUpdate,
        eventAvailableTickets: $scope.eventAvailableTicketsUpdate,
        eventDescription: $scope.eventDescriptionUpdate,
        eventImageUrl: $scope.eventImageUrlUpdate,
        eventLocationCountry: $scope.eventLocationCountryUpdate,
        eventLocationArea: $scope.eventLocationAreaUpdate,
        eventCategory: $scope.eventCategoryUpdate,
        eventStartTime: $scope.eventStartTimeUpdate,
        eventFinishTime: $scope.eventFinishTimeUpdate
      };
     
      $http.post('/updateEvent',updatedEventInfo);

      var $toastContent = $('<span>Applying Changes</span>');
      Materialize.toast($toastContent, 3000);

      var $toastContent = $('<span>Event Updated</span>');
      Materialize.toast($toastContent, 3000);

   };
});

//Event Viewer Controller
app.controller('eventViewerCtrl', function($scope, $location, $rootScope, $http) {

      //console.log(eventView);

      //When User Clicks Get Ticket
      $scope.getTicket = function(event) {

          console.log("Get This Ticket");
          var eventNameConcat = $scope.eventViewInfo.eventName.split(' ').join('');
          var userNameConcat = $scope.userInfo.firstName + $scope.userInfo.lastName;
          var ticketId = eventNameConcat + userNameConcat;
          
          ticketID = {

            ticketId: ticketId,
            ticketOwnerFirstName: $scope.userInfo.firstName,
            ticketOwnerLastName: $scope.userInfo.lastName,
            ticketForEvent: eventNameConcat
          };

          $scope.ticketInfo = ticketID;
          $http.post('/createTicket', $scope.ticketInfo).then(function(response) {

              var createdStatus = response.data.created;
              var existStatus = response.data.exists;

              if(createdStatus == true)
              {
                  var $toastContent = $('<span>Ticket Added To Wallet</span>');
                  Materialize.toast($toastContent, 3000);
              }

              if(existStatus == true)
              {
                  var $toastContent = $('<span>Ticket Already In Wallet</span>');
                  Materialize.toast($toastContent, 3000);
              }
          });

      };

      $scope.sendUserMessage = function(event) {

        message = {

            eventName: $scope.eventViewInfo.eventName,
            eventOrganiserFirstName: $scope.eventViewInfo.eventCreatedByFirstName,
            eventOrganiserLastName: $scope.eventViewInfo.eventCreatedByLastName,
            message: $scope.eventMessage
        };

        $scope.messages = message;
        $http.post('/sendUserMessage', $scope.messages);
      };
});

//Event Creator Controller
app.controller('eventCreatorCtrl', function($scope, $location, $rootScope, $http) {
  $scope.createEvent = function() {

        event = {

            eventName: $scope.eventName,
            eventLocation: $scope.eventLocation,
            eventDate: $scope.eventDate,
            eventAvailableTickets: $scope.eventAvailableTickets,
            eventDescription: $scope.eventDescription,
            eventImageUrl: $scope.eventImageUrl,
            eventLocationCountry: $scope.eventLocationCountry,
            eventLocationArea: $scope.eventLocationArea,
            eventCategory: $scope.eventCategory,
            eventStartTime: $scope.eventStartTime,
            eventFinishTime: $scope.eventFinishTime
        }

        var eventObject = event;
        $scope.eventInfo = eventObject;

        $http.post('/createEvent', $scope.eventInfo).success(function(err){

            if(!err) {
                
                var $toastContent = $('<span>Event Created</span>');
                Materialize.toast($toastContent, 3000);

                $location.path('/control_pannel');

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

            var $toastContent = $('<span>Wrong Email or Password</span>');
           Materialize.toast($toastContent, 3000);
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

          var $toastContent = $('<span>User Registered</span>');
          Materialize.toast($toastContent, 3000);

          $location.path('/');
        }  
        
    };
});

//Control Pannel Controller 
app.controller('controlPannelCtrl', function($scope, $http, $location, $rootScope) {

  //Count The Amount Of Events Created By Current User
  $http.get('/countMyEvents').success(function(data) {
    $scope.test = data;
  });

  //Count The Amount Of Active Events Created By Current User
  $http.get('/countMyActiveEvents').success(function(data) {
    $scope.test1 = data;
  });

  //Count The Amount Of Messages
  $http.get('/countMyMessages').success(function(data) {
    $scope.test2 = data;
  });

  //Display Event That Belong To Logged In User
  $http.get('/displayMyEvents').success(function(data) {
    $scope.events = data;
  });

 

  

  $scope.manageEvent = function(event) {
  
      //Place The View To Scope
      $rootScope.manageEventView = $scope.events[event];
      
      //Relocate To Event Manage Page
      $location.path('/manageEvent');
  }; 
    
});