var date = new Date( '9/1/2023' ),
    currentYear = date.getFullYear(),
    currentMonth = date.getMonth(),
    currentDay = date.getDay(),
    table = document.getElementsByTagName( 'table' )[ 0 ],
    tbody = table.children[ 1 ],
    tableMonth = '';

// TODO: Create a function that allows creating a table for flipping between months.

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

    // Define the event for this project.
    // TODO: Create a global list of events to use instead.
    var article = '<article>';
    article += '<h5><a target="_blank" href="https://www.eventbrite.com/e/10th-annual-arnold-police-officers-association-car-bike-show-registration-668907549487?aff=ebdssbdestsearch&from=b93541b5278e11eeab39c23419b1da72">10th Annual Arnold Police Officers Association Car & Bike Show</a></h5>';
    article += '<section><p>Time:<br><time>8am–3pm CDT</time></p><p>Location: <address>Arnold City Park<br>2400 Bradley Beach Road<br>Arnold, MO<br>63010</address></p</section>';
    article += '</article>';

    if ( date.getDate() == 16 ) {
        tableMonth += '<td data-day="' + date.getDate() + '">' + article + '</td>';
    } else {
        tableMonth += '<td data-day="' + date.getDate() + '"></td>';
    }

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