/******* Port & Database Setup *******

Set The Correct Port Number &
Database Configuration Before Running 

********* Localhost Profile *********/

var usePort = 3000;
var useDb = 'mongodb://localhost/nfcvt';

/*************************************/

//Set The Modules To Be Used
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var sessions = require('client-sessions');
var url = require('url');
//var http = require('http');


//MongoDB Schema
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var User = mongoose.model('User', new Schema({
    id: ObjectId,
    firstName: String,
    lastName: String,
    username: String,
    password: String

}));

var Event = mongoose.model('Event', new Schema({
    id: ObjectId,
    eventName: String,
    eventLocation: String,
    eventDate: String,
    eventAvailableTickets: Number,
    eventAttendance: Number,
    eventCreatedBy: String,
    eventDescription: String,
    eventPublic: String,
    eventActivation: Boolean

}));

var Ticket = mongoose.model('Ticket', new Schema({
    id: ObjectId,
    ticketId: String,
    ticketOwnerFirstName: String,
    ticketOwnerLastName: String,
    ticketForEvent: String

}));

//Conect To Mongo
mongoose.connect(useDb);

//Use The Index Page As Staring Point
app.use(express.static(__dirname + "/"));
app.use(bodyParser.json());

//Cookie Setup Configuration
app.use(sessions({
    cookieName: 'session',
    secret: 'daefdsfxdsfxsdxfdsfxd',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,


}));

//****************************************//
//************* WEB MODULES **************//
//****************************************//

//Get User Info For Dashboard
app.get('/getUserInfo', function(req, res) {

    //console.log(req.session.user.firstName);
    res.json(req.session.user);

});

//Get All The Tickets That Bellng To User
app.get('/getAllMyTickets', function(req, res) {

    Ticket.find({ ticketOwnerFirstName: req.session.user.firstName}, function(err, tickets)  {
       
    res.json(tickets);

    });

});

//Get Event Info For Dashboard
app.get('/getPublicEventInfo', function(req, res) {

    Event.find({ eventPublic: "true", eventActivation: true}, function(err, events)  {   
    res.json(events);

    });

});

//Count Events Of The Currently Logged In User
app.get('/countMyEvents', function(req, res) {

    Event.count({ eventCreatedBy: req.session.user.firstName}, function(err, count)  { 
    console.log("Count My Events : " +count);
    res.json(count);

    });

});

//Count Events Of The Currently Logged In User
app.get('/countMyActiveEvents', function(req, res) {

    Event.count({ eventCreatedBy: req.session.user.firstName, eventActivation: true}, function(err, count)  { 
    console.log("Count Active Events : " +count);
    res.json(count);

    });

});

//Display Evets Created By Logged In User
app.post('/getEventGuest', function(req, res) {

    console.log(req.body.eventName.split(' ').join(''));
    Ticket.find({ ticketForEvent: req.body.eventName.split(' ').join('')}, function(err, tickets)  { 
    res.json(tickets);

    });

});

//Activate The Event
app.post('/activateEvent', function(req, res) {

    Event.update({ eventName: req.body.eventName}, {$set: { "eventActivation": true }}, function(err, tickets)  { 
    //res.json(tickets);
    console.log("Event Activated");
    });

});

//Activate The Event
app.post('/deactivateEvent', function(req, res) {

    Event.update({ eventName: req.body.eventName}, {$set: { "eventActivation": false }}, function(err, tickets)  { 
    //res.json(tickets);
    console.log("Event Deactivated");
    });

});

//Display Guests For Current Event
app.get('/displayMyEvents', function(req, res) {

    Event.find({ eventCreatedBy: req.session.user.firstName}, function(err, events)  { 
    res.json(events);

    });

});

//Create Event
app.post('/createTicket', function(req, res) {

        var ticketId = new Ticket ({
            ticketId: req.body.ticketId,
            ticketOwnerFirstName: req.body.ticketOwnerFirstName,
            ticketOwnerLastName: req.body.ticketOwnerLastName,
            ticketForEvent: req.body.ticketForEvent
        });

        console.log(req.body.ticketForEvent);


        //Save To Database
        ticketId.save(function(err) {
            
            if(err) {
                console.log("ERROR: Failed To Create Ticket");
            }
            else 
            {
                console.log("CREATED: Ticket Added To DB");

                //Count All The Tickets For This Event
                Ticket.count({ ticketForEvent: req.body.ticketForEvent }, function(err, count)  { 
                console.log("Count Attendance For Event : " +count);
                
                    //Update The Evnet Information With The New Ticket
                    Event.update({ eventName: req.body.ticketForEvent}, {$set: { "eventAttendance": count }}, function(err, tickets)  { 
                        
                        //Message
                        console.log("Event " +req.body.ticketForEvent+ " Attendance Updatet To " +count);
                    });    

                });
            }
        });
    });    

//Create Event
app.post('/createEvent', function(req, res) {

    //Create Event Object To Store Event Info
    var event = new Event ({

        eventName: req.body.eventName.split(' ').join(''),
        eventLocation: req.body.eventLocation,
        eventDate: req.body.eventDate,
        eventAvailableTickets: req.body.eventAvailableTickets,
        eventAttendance: 0,
        eventCreatedBy: req.session.user.firstName,
        eventDescription: req.body.eventDescription,
        eventPublic: "true",
        eventActivation: false
    });

    //Save To Database
    event.save(function(err) {
        if(err) {
            console.log("ERROR: Failed To Create Event");
        }
        else {
            console.log("CREATED: Event Added To DB");
        }
    });

});


//Login
app.post('/signin' , function(req, res) {
    

    User.findOne({ username: req.body.username }, function(err, user) {

        if (err) throw err;

        //If No User Exists
        if(!user) {

            console.log("VERIFIED: Failed");
            res.json({ success: false, message: 'Authentication failed. Wrong password or Username!!' });
        }
        else {

            if(user.username == req.body.username && user.password == req.body.password) {

                console.log("VERIFIED: User Credentials");
                console.log("CREATED: User Session");
                req.session.user = user;
                console.log(req.session.user);
                res.json({ success: true, message: 'Authentication successfull. You Are Now Redirected To Dashboard!!'});
            }
        }    
    })
});
    
    

//Register
app.post('/createUser' , function(req, res) {
    
    //Create User Object To Store Registration Info
    var user = new User ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password
    });

    //Save To Database
    user.save(function(err) {
        if(err) {
            console.log("ERROR: Can't Register User");
        }
        else {
            console.log("CREATED: User Is Now Registered");
        }
    });
    
});

//****************************************//
//********** ANDROID MODULES *************//
//****************************************//


//Android Module For User Sign In
app.get('/signinUrl', function(req, res) {

    //Retrieve The Parameters Passed In The Url
    var username = req.query.username;
    var password = req.query.password;


    User.findOne({ username: username}, function(err, user) {

        if (err) throw err;

        //If No User Exists
        if(!user) {

            console.log("VERIFIED: Failed");
            res.json({ verification: false, message: 'Authentication failed. Wrong password or Username!!' });
        }
        else {

            if(user.username == username && user.password == password) {

                console.log("VERIFIED: User Credentials");
                console.log("CREATED: User Session");
                req.session.user = user;
                console.log(req.session.user);
                res.json({ verification: true, firstName: req.session.user.firstName, lastName: req.session.user.lastName, username: req.session.user.username});
            }
        }    
    })
});

//Android Module For Android Register
app.post('/createUserUrl' , function(req, res) {
    
    //Create User Object To Store Registration Info
    var user = new User ({
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        username: req.query.username,
        password: req.query.password
    });

    //Save To Database
    user.save(function(err) {
        if(err) {
            console.log("ERROR: Can't Register User From Mobile Device");
        }
        else {
            console.log("CREATED: User Is Now Registered From Mobile Device");
        }
    });
    
});

//Android Module To Utalise The Ticket From Wallet
app.get('/useTicketUrl' , function(req, res) {
    
    //Retrieve The Parameters Passed In The Url
    var firstName = req.query.firstName;
    var lastName = req.query.lastName;
    var eventName = req.query.eventName;

    Ticket.remove({ ticketOwnerFirstName: firstName, ticketOwnerLastName: lastName, ticketForEvent: eventName}, function(err) {
        if (!err) {
            console.log("Ticket Sucessfully Checked In");
            res.json({ verification: true, message: 'Authentication Passed. Ticket Checked In!!' });
        }
        else {
            console.log("Ticket Not Checked In");
            res.json({ verification: false, message: 'Authentication Failed. Ticket Not Checked In!!' });
        }
    });

    //useTicketUrl?firstName=Daniel&lastName=Rejniak&eventName=DCUExpoPresentation
    
});

//Android Module Get All Tickets That Bellng To User
app.get('/getAllMyTicketsUrl', function(req, res) {

    var firstName = req.query.firstName;
    Ticket.find({ ticketOwnerFirstName: firstName}, function(err, tickets)  {
       
    res.json(tickets);

    //Sample Url To Retrieve User Ticekts
    //getAllMyTicketsUrl?firstName=Daniel    

    });

}); 

//Set The Listening Port
app.listen(usePort);

//Information Message 
console.log("Server Running, Using Port: " + usePort);
