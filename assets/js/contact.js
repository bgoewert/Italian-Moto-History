document.querySelector( 'input[type=submit]' ).addEventListener( 'click', event => {
    event.preventDefault(); // Prevent the form from actually submitting.

    // Get the form controls and parent.
    var form = document.getElementById( 'contact-form' );
    var parent = form.parentNode;
    form.remove();

    // Display apologies and real email address.
    var p = document.createElement( 'p' );
    p.innerHTML = `
        Sorry, this form does not currently submit anywhere.<br>
        If you really need to contact me, send an email to
        <a href=\"mailto:contact@bgoewert.com?subject=${form.elements[ 1 ].value}&body=${form.elements[ 2 ].value}\">contact@bgoewert.com</a>.`;
    parent.append( p );

    // Display submitted form data.
    var ul = document.createElement( 'ul' );
    for ( let i = 0; i < form.elements.length; i++ ) {
        if ( form.elements[ i ].value == 'submit' ) continue;
        var li = document.createElement( 'li' );
        var id = form.elements[ i ].name.replace( /\b\w/g, l => l.toUpperCase() );
        li.textContent = id + ": " + form.elements[ i ].value;
        ul.append( li );
    }
    parent.append( "Your Submission:" );
    parent.append( ul );

} );

