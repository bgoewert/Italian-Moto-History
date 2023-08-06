"use strict";

var date = new Date( '9/1/2023' ),
    currentYear = date.getFullYear(),
    currentMonth = date.getMonth(),
    currentDay = date.getDay(),
    table = document.getElementsByTagName( 'table' )[ 0 ],
    tbody = table.children[ 1 ],
    tableMonth = '',
    dayNames = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];

// TODO: Create a function that allows creating a table for flipping between months.

var events = [];

events.push( {
    "title": "10th Annual Arnold Police Officers Association Car & Bike Show",
    "url": "https://www.eventbrite.com/e/10th-annual-arnold-police-officers-association-car-bike-show-registration-668907549487?aff=ebdssbdestsearch&from=b93541b5278e11eeab39c23419b1da72",
    "time": {
        "start": new Date( "16 Sep 2023 08:00:00 CST" ),
        "end": new Date( "16 Sep 2023 15:00:00 CST" )
    },
    "location": "Arnold City Park, 2400 Bradley Beach Road, Arnold, MO, 63010"
} );

// Set the date to the first day of the month.
date.setFullYear( currentYear, currentMonth, 1 );

// Save the current month to a table data attribute.
table.setAttribute( 'data-month', currentMonth + 1 );

// Add the month name as a table caption.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
table.insertAdjacentHTML( 'afterbegin', '<caption>' + date.toLocaleString( 'en-us', { month: 'long', year: 'numeric' } ) + '</caption>' );

// Skip first few days until the start of the month.
tableMonth += '<tr>';
for ( var i = 0; i < date.getDay(); i++ ) {
    tableMonth += '<td></td>';
}

// Fill in the month.
while ( date.getMonth() == currentMonth ) {

    var eventList = events.map( e => {
        if ( e.time.start.getDate() == date.getDate() ) return e;
    } );

    tableMonth += '<td data-day="' + date.getDate() + '" data-dow="' + dayNames[ date.getDay() ] + '">';

    if ( eventList.length > 0 && eventList[ 0 ] !== undefined ) {
        var list = '<ul>';
        eventList.forEach( e => {
            list += `<li><a target="_blank" href="${e.url}">${e.title}</a></li>`;
        } );
        list += '</ul>';

        tableMonth += list;
    }

    tableMonth += '</td>';

    // If Sunday, start next row.
    if ( date.getDay() % 7 == 6 ) {
        tableMonth += '</tr><tr>';
    }

    // Move to the next date.
    date.setDate( date.getDate() + 1 );
}

// Finish and close last row.
for ( var i = date.getDay(); i < 7; i++ ) {
    if ( i == 0 ) break; // Skip if first day of week.
    tableMonth += '<td></td>';
}
tableMonth += '</tr>';

tbody.innerHTML = tableMonth;