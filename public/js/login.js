// Get the modal
window.onload = function () {
  var modal = document.getElementById("myModal");
  // Get the button that opens the modal
  var btn = document.getElementById("button_signup");
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  // When the user clicks the button, open the modal 
  btn.onclick = function() {
    modal.style.display = "block";
  }
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
/*function check(){
  var forms = document.getElementById('register_form');
  if(forms.checkValidity()){
    console.log($('#register_form input[name=name]').val(),$('#register_form input[name=email]').val(),$('#register_form input[name=phone]').val(),$('#register_form select[name=gender]').val(),$('#register_form input[name=password]').val());
    return true;
  }
  else{
    return false;
  }
}
function completeAndRedirect(){
  $.post({
    url: "https://luffy.ee.ncku.edu.tw:7575/register",
    dataType: "json",
    contentType: "application/json",
    xhrFields: {
      withCredentials: true
    },
    data: {
      name: $('#register_form input[name=name]').val(),
      email: $('#register_form input[name=email]').val(),
      phone: $('#register_form input[name=phone]').val(),
      gender: $('#register_form select[name=gender]').val(),
      password: $('#register_form input[name=password]').val()
    },
    success: function (data) {
      alert(data.text);
      $('#squarespaceModal').modal('hide');
      $('#register_form input[name=name]').val("")
      $('#register_form input[name=email]').val("")
      $('#register_form input[name=phone]').val("")
      $('#register_form select[name=gender]').val("")
      $('#register_form input[name=password]').val("")
      $('#register_form input[name=password_confirmation]').val("")
    },
    error: function(data){
      console.log(data);
    }
  })
}*/
$(document).ready(function () {
  $('#ajax-form button[type="login"]').click((event) => {
    event.preventDefault()
    $.post({
      url: "https://luffy.ee.ncku.edu.tw:7575/login",
      dataType: "json",
      data: JSON.stringify({
        username: $('#ajax-form_name input[name=fName]').val(),
        password: $('#ajax-form_name input[name=lName]').val()
      }), 
      contentType: "application/json",
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      },
      success: function (msg) {
        console.log(msg);
        if(msg.success){
          LocationHerf();
        }
        else{
          alert(msg.text);
        }
      }
    })
  })
  
  
  $('#register_form button[type="signup"]').click((event) => {
    console.log(check());
    console.log($('#register_form input[name=name]').val(),$('#register_form input[name=email]').val(),$('#register_form input[name=phone]').val(),$('#register_form select[name=gender]').val(),$('#register_form input[name=password]').val());
    $.post({
      url: "https://symbolwu-login-web.herokuapp.com/register",
      dataType: "json",
      data: {
        first_name: $('#register_form input[name=name]').val(),
        last_name: $('#register_form input[name=email]').val(),
        display_name: $('#register_form input[name=phone]').val(),
        email: $('#register_form select[name=gender]').val(),
        password: $('#register_form input[name=password]').val()
      },
      success: function (data) {
        alert(data.text);
        LocationHerf();
      },
      
      error: function(data){
        console.log(data);
      }
    })
  })
  $('#forgetpasswordbutton').click((event) => {
    console.log();
  });
  
  
});
var LocationHerf = function () {
  window.location.href = "https://luffy.ee.ncku.edu.tw:7575/home.html";
};


