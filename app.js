
/**
 * Module dependencies.
 */

var express = require('express')
  , config = require('./config')
  , model = require('./models/schema')
  , routes = require('./routes');


var foursquare = require("node-foursquare-2")(config);

var app = module.exports = express.createServer();



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

app.get('/', routes.index);


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
        console.log("BAD- here");
      }
      else {
        //console.log(data.venues);
        res.render('venue', { title: 'Express', 
        venue: JSON.stringify(data.venues)})
        try {
          console.log("BAD- here");
        } catch (error) {
          console.log("BAD- here");
        }
      }
    });
  });


app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
