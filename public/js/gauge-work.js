$( function() {
    
    $('#chart_div').addClass('ui-widget');
    $('#chart_div').addClass('ui-corner-all');
    
    dataAcquisition();   // Kicks off the backend processes 
});

google.load('visualization', '1', {
    packages : [ 'gauge' ]
});

/**
 * Store all our chart information in a great big pile of gunk. This way
 * I don't need to pollute the global name space.
 */
var gunk = {
    consumers : {
        label   : "Consumers",
        data    : null,
        chart   : null,
        options : {
            max        : 10,
            yellowFrom : 6,
            yellowTo   : 8,
            redFrom    : 8,
            redTo      : 10,
            width      : 300,
            height     : 300
        }
    },
    producers : {
        label   : "Producers",
        data    : null,
        chart   : null,
        options : {
            max        : 10,
            yellowFrom : 6,
            yellowTo   : 8,
            redFrom    : 8,
            redTo      : 10,
            width      : 300,
            height     : 300
        }
    },
    messages : {
        label   : "Messages",
        data    : null,
        chart   : null,
        options : {
            yellowFrom : 75,
            yellowTo   : 90,
            redFrom    : 90,
            redTo      : 100,
            width      : 300,
            height     : 300
        }
    }
};

/**
 * Makes a jQuery GET call to /levels and calls the 
 * [#updateData()] and [#drawChart()] functions to update the gauges
 */

function dataAcquisition() {
    $.get('/levels', function( data ) {
        // console.log(data);
        
        updateData(gunk.consumers, data.consumers);
        drawChart(gunk.consumers);
        
        updateData(gunk.producers, data.producers);
        drawChart(gunk.producers);
        
        updateData(gunk.messages, data.messages);
        drawChart(gunk.messages);

        setTimeout(dataAcquisition, 2000);
    });
}

/**
 * Create a Google DataTable for a specific entry (if it doesn't exist), 
 * otherwise it updates the DataTable with the given value.
 * 
 * @param entry The object containing a `data` property
 * @param value The new value to use.
 */

function updateData( entry, value ) {
    if ( !entry.data ) {
        entry.data = new google.visualization.DataTable();
        entry.data.addColumn('string', 'Label');
        entry.data.addColumn('number', 'Value');
        entry.data.addRow([ entry.label, value ]);
    }
    else {
        entry.data.setCell(0, 1, value );
    }
}

/**
 * Draws the chart for a specific entry (producer, consumer, etc).
 *
 * @param entry The object containing the `data`, `options`, and `chart` object.
 */

function drawChart(entry) {
    if ( !entry.chart ) {
        entry.chart = new google.visualization.Gauge(document
                .getElementById( entry.label ));
    }
    entry.chart.draw(entry.data, entry.options);
}