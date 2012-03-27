Displays three values _graphically_ from a Redis database on a web client.

We display the values using Google's [Gauges][3] widget, and refresh this
information every couple of seconds. The idea is that you would have a browser
viewing the output results, and then use a second browser to submit REST
requests to change the data.


Installing
----------

Make sure you have the following engines installed locally:

  * [Node][1]
  * [NPM][4] ... Node.js' package manager
  * [Redis][2]

Next, download the code and run the following to download the dependencies:

    npm install

Running
-------

Start up the Redis database, like:

    redis-server /opt/local/etc/redis.conf

Start up the server, via:

    node app.js

Finally, open up a browser and view the results:

    http://localhost:3000/
    
Using
-----

You can change the values in the database, by issuing the following REST calls:

 * `GET /producers/#` - where `#` is the absolute number of producers
 * `GET /consumers/#` - where `#` is the absolute number of consumers
 * `GET /messages/#` - where `#` is the absolute number of messages
 * `POST /levels` - where the body contains all three values, e.g.
 
    { "producers":6,
      "consumers":5,
      "messages":77
    }

  [1]: http://nodejs.org/
  [2]: http://redis.io/
  [3]: http://code.google.com/apis/chart/interactive/docs/gallery/gauge.html
  [4]: http://npmjs.org/