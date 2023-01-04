var express = require('express');

var app = express();
var cors = require('cors')

let messages = []

app.set('port', (process.env.PORT || 61003));


var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
}

app.get('/', function(req, res) {
  res.send('Hello World!')
})
app.get('/chatbot', function(req, res) {
  res.send('Hello World Chatbot!')
})

app.get('/chatbotmessage', cors(corsOptions), function(req, res) {
  if (messages.length > 0) {
    res.send(messages.shift())
  } else {
    res.send("NONE")
  }
})

app.post('/chatbotmessage', cors(corsOptions), function(req, res) {
  messages.push({
    text: req.query.text,
    src: req.query.src
  })
  res.send("Successfully added")
})

app.use(cors(), function(req, res, next) {
  res.header("Access-Control-Allow-Origin", 'http://localhost:8082');
  res.header("Access-Control-Allow-Origin", 'http://localhost:8081');
  res.header("Access-Control-Allow-Origin", 'https://localhost:8082');
  res.header("Access-Control-Allow-Origin", 'https://localhost:8081');
  res.header("Access-Control-Allow-Origin", 'http://bernhardjordan.space');
  res.header("Access-Control-Allow-Origin", 'https://bernhardjordan.space');
  res.header("Access-Control-Allow-Origin", '*');
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

var server = app.listen(app.get('port'), function() {
  console.log('Started on port %s', app.get('port'));
});
