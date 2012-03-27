Displays three values _graphically_ from a Redis database on a web client.

Installing
----------

Make sure you have [Node][1] and [Redis][2] installed locally.

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

