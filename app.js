
/**
 * Module dependencies.
 */

var express = require('express')
  , config = require('./config')
  , model = require('./models/schema')
  , routes = require('./routes');

var foursquare = require("node-foursquare-2")(config);

var app = module.exports = express.createServer();

var io = require('socket.io').listen(app);

var usernames = {};
//init location
var locations = {
  "lat": 37.790234970864,
  "lon": -122.39031314844
};

io.sockets.on('connection', function (socket) {

  //Chatting
  socket.on('sendchat', function (data) {
    io.sockets.emit('updatechat', socket.username, data);
  });
  //User joins
  socket.on('adduser', function(username, lat, lon){
    socket.username = username;
    var user = new model.User();
    user.name = username;
    user.lat = lat;
    user.lon = lon;
    user.save();
    usernames[username] = username;
    locations["lat"] = lat;
    locations["lon"] = lon;
    socket.emit('updatechat', 'ROBOT', 'you have connected at ' + lat + " " + lon);
    socket.broadcast.emit('updatechat', 'ROBOT', username + ' has connected');
    io.sockets.emit('updateusers', usernames);
  });
  //User leaves
  socket.on('disconnect', function(){
    delete usernames[socket.username];
    io.sockets.emit('updateusers', usernames);
    socket.broadcast.emit('updatechat', 'ROBOT', socket.username + ' has disconnected');
  });
});

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', function (req, res) {
  res.render('index', {title: 'Express', 
  local: JSON.stringify(locations)})
});

app.get('/chat', function (req, res) {
  res.render('chat', { title: 'Express'});
});


app.get('/login', function(req, res) {
  res.writeHead(303, { "location": foursquare.getAuthClientRedirectUrl(config.clientId, config.redirectUrl) });
  res.end();
});


app.get('/callback', function (req, res) {
  foursquare.getAccessToken({
    code: req.query.code
  }, function (error, accessToken) {
    if(error) {
      res.send("An error was thrown: " + error.message);
    }
    else {
      res.redirect("/venue?token=" + accessToken);
    }
  });
});
// model.Room.findOne({ name: "Rails Conf"}, function (err, doc){});

//  for now
app.get('/venue',function (req, res) {
  var accessToken = req.query.token;
    foursquare.Venues.search(35.09355548333333, -106.52239554666666, null, null, accessToken, function (error, data) {
      if(error) {
        //ERROR
      }
      else {
        //console.log(data.venues);
        res.render('venue', { title: 'Express', 
        venue: JSON.stringify(data.venues)})
        try {
          //HMM
        } catch (error) {
          //ERROR
        }
      }
    });
  });


app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
