var redis = require("redis"),
    client = redis.createClient();

client.on("error", function (err) {
    console.warn("Error " + err);
});

exports.setall = function ( request, response ) {
    console.log("Storing", request.body);
    client.set("producers", request.body.producers, redis.print);
    client.set("consumers", request.body.consumers, redis.print);
    client.set("messages",  request.body.messages,  redis.print);
    response.send(request.body);
};

exports.producers = function ( request, response ) {
    console.log("Storing %d producers", request.params.value);
    client.set("producers", request.params.value, redis.print);
    response.send('OK');
};

exports.consumers = function ( request, response ) {
    console.log("Storing %d consumers", request.params.value);
    client.set("consumers", request.params.value, redis.print);
    response.send('OK');
};

exports.messages = function ( request, response ) {
    console.log("Storing %d messages", request.params.value);
    client.set("messages", request.params.value, redis.print);
    response.send('OK');
};

