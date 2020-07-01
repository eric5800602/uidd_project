$(document).ready(function() {
    var CurrentHerf = window.location.href;
    if (CurrentHerf.indexOf("Category") > -1) {
        document.getElementById("Category_full").classList.add("icon_background");
    }
    else if ( (CurrentHerf.indexOf("home") > -1) ){
        document.getElementById("MainPage_full").classList.add("icon_background");
    }
    else if ( (CurrentHerf.indexOf("login") > -1) | (CurrentHerf.indexOf("tags") > -1) ) {
        document.getElementById("Profile_full").classList.add("icon_background");
    }

});