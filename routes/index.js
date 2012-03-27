var model = require('../services/cpm-model');

/**
 * Redirects to the `index.html` page to run the tests.
 *
 * This function simply returns a `302` HTTP status and redirects
 * to the `test-api/index.html` file to quickly start up the tests.
 */

exports.index = function( request, response ) {
    response.statusCode = 302;
    response.setHeader("Location", "/index.html");
    response.end('<p>302. Redirecting to index.html</p>');
};

/**
 * Calls the [cpm-model.getdata()] function to acquire out data, and send
 * it back to the user.
 * 
 * Results:
 * 
 *    {"producers":6,"consumers":5,"messages":77}
 */
exports.cpm = function( request, response ) {
    
    model.getdata( function(data, error){
        if (error) {
            response.writeHeade(500, error);
            response.end(JSON.stringify(error), 'utf8');
        }
        else {
            response.setHeader('Content-type', 'application/json');
            response.write( JSON.stringify(data) );
            response.end();
        }
    });
};

/*
 * This section was originally written to return realistic, but random values
 * in place of an actual database.
 *

var consumers = 50;
var producers = 50;
var messages  = 50;

var variance = 6;

exports.cpm = function( request, response ) {
    
    consumers = newLevel(consumers);
    producers = newLevel(producers);
    messages  = newLevel(messages);
    
    var results = {
            consumers: Math.floor(consumers/10) + 1,
            producers: Math.floor(producers/10) + 1,
            messages : messages
    };
    
    response.setHeader('Content-type', 'application/json');
    response.write( JSON.stringify(results) );
    response.end();
};

function newLevel(original) {
    var delta = Math.floor(Math.random() * variance) - ( variance / 2 );
    var value = original + delta;
    if ( value < 0 ) {
        return 0;
    }
    else if ( value < 30 ) {
        return value + 1;
    }
    else if ( value > 70 ) {
        return value - 1;
    }
    else if ( value > 100 ) {
        return 100;
    }
    else
        return value;
}

 */