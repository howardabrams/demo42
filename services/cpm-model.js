var util   = require('util');
var client = require('./connRedis').client;

/**
 * Query the database for each of the three values. We do this one at a time
 * since we don't really know what the final result of the database will be.
 * 
 * In order to ask for three particular pieces of data, we end up with three
 * callbacks, which we essentially serialize by nesting them.
 */
exports.getdata = function(callback) {
    var results = {
        producers: 0,
        consumers: 0,
        messages: 0
    };
    
    // console.log("client", util.inspect(client));
    
    client.get("producers", function(err, reply) {
        if (err) {
            console.warn("Producers Error", err);
            callback(results, err);
        }
        results.producers = parseInt(reply);

        client.get("consumers", function(err, reply) {
            if (err) {
                console.warn("Consumers Error", err);
                callback(results, err);
            }
            results.consumers = parseInt(reply);
            
            client.get("messages", function(err, reply) {
                if (err) {
                    console.warn("Messages Error", err);
                    callback(results, err);
                }
                results.messages = parseInt(reply);
                
                // Finally, give our callback a call with the details.
                callback(results, null);
            });
        });
    });
};