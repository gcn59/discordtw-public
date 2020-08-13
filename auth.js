// Import Twitter Comunity API
var Twit = require('twit');

// DO NOT LOOK HERE OKAY
var T = new Twit({
    consumer_key:         'LSu4HB9hRJlqouPn2v2clsdKh',
    consumer_secret:      '3KoDjEukaFVSrMKu6wcQlktApifaG8UW1CL8nSgRlbKKQFnd8M',
    access_token:         '1285610946900221958-I34RcImpvtqO8GRuvbMPsXZkWkDfw2',
    access_token_secret:  '0RnVgxpXXqO4dEj5ZmUCEBuErbrgpqY0qo31o3P1QexA5',
});

let tweet = "Hello World from Marshall"

T.getAuth();

T.post('statuses/update', { status: tweet }, function(err, data, response) {
    console.log(data)
  })