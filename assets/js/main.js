// Set the copyright year to be the current year
document.addEventListener( 'DOMContentLoaded', function () {
    var copyYear = document.getElementById( 'copyright-year' );
    var currYear = new Date().getFullYear();
    copyYear.textContent = currYear;
} );