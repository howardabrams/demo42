var redis = require("redis"),
    client = redis.createClient();

/**
 * If we can't initially connect to the Redis database, let the user know...
 * in the most unobtrusive way possible. 
 */
client.on("error", function (err) {
    console.warn("Error " + err);
});

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