"use strict";

var events = [
    {
        "title": "10th Annual Arnold Police Officers Association Car & Bike Show",
        "url": "https://www.eventbrite.com/e/10th-annual-arnold-police-officers-association-car-bike-show-registration-668907549487?aff=ebdssbdestsearch&from=b93541b5278e11eeab39c23419b1da72",
        "time": {
            "start": new Date( "16 Sep 2023 08:00:00 CST" ),
            "end": new Date( "16 Sep 2023 15:00:00 CST" )
        },
        "location": "Arnold City Park, 2400 Bradley Beach Road, Arnold, MO, 63010"
    },
    {
        "title": "Motorcycles at Moonlight",
        "url": "https://www.eventbrite.com/e/motorcycles-by-moonlight-tickets-679695245777",
        "time": {
            "start": new Date( "6 Oct 2023" ),
            "end": new Date( "6 Oct 2023" ),
        },
        "location": "Barber Vintage Motorsports Museum, 6030 Barber Motorsports Parkway, Leeds, AL 35094"
    }
];

function createEventsCalendar( events ) {
    var eventList = [];

    var urlParams = new URLSearchParams( window.location.search ),
        currentYear,
        currentMonth;

    if ( urlParams.get( 'year' ) ) {
        currentYear = parseInt( urlParams.get( 'year' ) );
    } else {
        currentYear = events[ 0 ].time.start.getFullYear();
    }

    if ( urlParams.get( 'month' ) ) {
        currentMonth = parseInt( urlParams.get( 'month' ) ) - 1;
    } else {
        currentMonth = events[ 0 ].time.start.getMonth();
    }

    var date = new Date( currentYear, currentMonth, 1 ),
        dayNames = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
        table = document.querySelector( 'table' ),
        tbody = table.querySelector( 'tbody' ),
        tableMonth = '';

    // Save the current month to a table data attribute.
    table.setAttribute( 'data-month', currentMonth + 1 );
    table.setAttribute( 'data-year', currentYear );

    // Add calendar controls.
    var btnPrevious = '<button name="previous">Previous</button>',
        btnNext = '<button name="next">Next</button>';
    table.insertAdjacentHTML( 'beforebegin', '<form id="calendar-controls">' + btnPrevious + btnNext + '</form>' );

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

        eventList = events.filter( e => e.time.start.toDateString() == date.toDateString() );

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

    document.querySelector( '#calendar-controls button[name=next]' ).addEventListener( 'click', e => {
        e.preventDefault();

        var currMonth = parseInt( table.getAttribute( 'data-month' ) ),
            currYear = parseInt( table.getAttribute( 'data-year' ) );

        if ( currMonth == 12 ) {
            currMonth = 1;
            currYear++;
        } else {
            currMonth++;
        }

        urlParams.set( 'month', currMonth );
        urlParams.set( 'year', currYear );
        window.location.search = urlParams.toString();
    } );

    document.querySelector( '#calendar-controls button[name=previous]' ).addEventListener( 'click', e => {
        e.preventDefault();

        var currMonth = parseInt( table.getAttribute( 'data-month' ) ),
            currYear = parseInt( table.getAttribute( 'data-year' ) );

        if ( currMonth == 1 ) {
            currMonth = 12;
            currYear--;
        } else {
            currMonth--;
        }

        urlParams.set( 'month', currMonth );
        urlParams.set( 'year', currYear );
        window.location.search = urlParams.toString();
    } );
}

document.addEventListener( 'DOMContentLoaded', () => createEventsCalendar( events ) );