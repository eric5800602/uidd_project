var sign_password, sign_username, sign_email;
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
      name: $('#register_form input[name=Username]').val(),
      email: $('#register_form input[name=Email]').val(),
      phone: $('#register_form input[name=phone]').val(),
      gender: $('#register_form select[name=gender]').val(),
      password: $('#register_form input[name=password]').val()
    },
    success: function (data) {
      alert(data.text);
      $('#squarespaceModal').modal('hide');
      $('#register_form input[name=Username]').val("")
      $('#register_form input[name=Email]').val("")
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
  
  $('#ajax_login_signup button[id="login"]').click((event) => {
    event.preventDefault();
    $.post({
      url: "https://luffy.ee.ncku.edu.tw:7575/login",
      dataType: "json",
      data: JSON.stringify({
        username: $('#ajax_login_input input[name=fName]').val(),
        password: $('#ajax_login_input input[name=lName]').val()
      }), 
      contentType: "application/json",
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      },
      success: function (msg) {
        console.log(msg);
        if(msg.success){
          if(msg.first_time == true){
            window.location.href = "/html/tags.html";
          }
          else{
            LocationHerf();
          }
        }
        else{
          alert(msg.text);
        }
      }
    })
  })
  /* close html defalt setting*/
  $('#ajax_login_signup button[id="signup"]').click((event) => {
    event.preventDefault();
  })
  /*
  $('#register_form button[id="signup"]').click((event) => {
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
      },
      
      error: function(data){
        console.log(data);
      }
    })
  })
  */

  /* Modal1 Next button*/
  $('#modal1_button button[id="Next_button"]').click((event) => {
    event.preventDefault(); /* close html defalt setting*/
    window.sign_password = $('#modal1_input input[name=Password]').val();
    window.sign_username = $('#modal1_input input[name=Username]').val();
    window.sign_email = $('#modal1_input input[name=Email]').val();
  })
    
  /* Modal2 Next button*/
  $('#modal2_button button[id="Submit_button"]').click((event) => {
    var check = false;
    var suite = false;
    if(document.getElementById('switcher-1').checked = true){
      check = false;
    }
    else{
      check = true;
    }
    if(document.getElementById('suite').clicked == true){
      suite = true;
    }
    $.post({
      url: "https://luffy.ee.ncku.edu.tw:7575/register",
      dataType: "json",
      contentType: "application/json",
      xhrFields: {
        withCredentials: true
      },
      data: {
        username: window.sign_username,
        password: window.sign_password ,
        email: window.sign_email,
        designer: check,
        room: $('#modal2_input select[name=modal2_room]').val(),
        hall: $('#modal2_input input[name=modal2_hall]').val(),
        bath: $('#modal2_input input[name=modal2_bath]').val(),
        suite: suite
      },
      success: function (data) {
        alert(data.text);
        /*
        $('#SignModal2').modal('hide');
        $('#register_form input[name=Username]').val("")
        $('#register_form input[name=Email]').val("")
        $('#register_form input[name=phone]').val("")
        $('#register_form select[name=gender]').val("")
        $('#register_form input[name=password]').val("")
        $('#register_form input[name=password_confirmation]').val("")*/
        window.location.href = "https://luffy.ee.ncku.edu.tw:7575/html/tags.html";
      },
      error: function(data){
        console.log(data);
      }
    })
  })
  /* Modal2 Next button*/
  $('#modal2_button span[id="skip_button"]').click((event) => {
    $.post({
      url: "https://luffy.ee.ncku.edu.tw:7575/register",
      dataType: "json",
      contentType: "application/json",
      xhrFields: {
        withCredentials: true
      },
      data: {
        username: window.sign_username,
        password: window.sign_password ,
        email: window.sign_email,
        designer: undefined,
        room: undefined,
        hall: undefined,
        bath: undefined,
        suite: undefined
      },
      success: function (data) {
        alert(data.text);
        /*
        $('#SignModal2').modal('hide');
        $('#register_form input[name=Username]').val("")
        $('#register_form input[name=Email]').val("")
        $('#register_form input[name=phone]').val("")
        $('#register_form select[name=gender]').val("")
        $('#register_form input[name=password]').val("")
        $('#register_form input[name=password_confirmation]').val("")*/
        window.location.href = "https://luffy.ee.ncku.edu.tw:7575/html/tags.html";
      },
      error: function(data){
        console.log(data);
      }
    })
  })
  $('#forgetpasswordbutton').click((event) => {
    console.log();
  });
  /* Back to home page */
  $('#back').click(function(){
    window.location.href = "https://luffy.ee.ncku.edu.tw:7575/home.html";
  })
    
  
});
var LocationHerf = function () {
  window.location.href = "https://luffy.ee.ncku.edu.tw:7575/home.html";
};


