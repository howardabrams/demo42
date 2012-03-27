var redis  = require("redis"),
    client = require('../services/connRedis').client;


exports.setall = function ( request, response ) {
    console.log("Storing", request.body);
    client.set(producerTag,  parseInt(request.body.producers), redis.print);
    client.set(consumerTag,  parseInt(request.body.consumers), redis.print);
    client.set(messagesTag,  parseInt(request.body.messages),  redis.print);
    response.send(request.body);
};

var consumerTag = 'consumers';
var producerTag = 'producers';
var messagesTag = 'messages';

exports.producers = function ( request, response ) {
    console.log("Storing %d producers", request.params.value);
    
    client.get(producerTag, function(err, reply) {
        if (err) {
            sendError(response, producerTag, err);
        }
        var producers = parseInt(reply) + parseInt(request.params.value);

        client.set(producerTag, producers, redis.print);
        sendData(response, producerTag, producers);
    });
};

exports.consumers = function ( request, response ) {
    console.log("Storing %d consumers", request.params.value);

    client.get(consumerTag, function(err, reply) {
        if (err) {
            sendError(response, consumerTag, err);
        }
        var consumers = parseInt(reply) + parseInt(request.params.value);

        client.set(consumerTag, consumers, redis.print);
        sendData(response, consumerTag, consumers);
    });
};

exports.messages = function ( request, response ) {
    console.log("Storing %d messages", request.params.value);
    
    client.get(messagesTag, function(err, reply) {
        if (err) {
            sendError(response, messagesTag, err);
        }
        var messages = parseInt(reply) + parseInt(request.params.value);

        client.set(messagesTag, messages, redis.print);
        sendData(response, messagesTag, messages);
    });
};


function sendData(response, label, value) {
    response.setHeader("Content-Type", "application/json");
    var data = {};
    data[label] = value;
    response.end( JSON.stringify(data) );
}

function sendError(response, label, err) {
    console.warn("%s Error", label, err);

    response.writeHeader(500, "Could not access database.");
    response.end();
}
