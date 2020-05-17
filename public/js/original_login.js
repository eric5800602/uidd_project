function check(){
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
  }
  $(document).ready(function () {
    $('#ajax-form button[type="submit"]').click((event) => {
      event.preventDefault()
      $.post({
        url: "https://luffy.ee.ncku.edu.tw:7575/login",
        dataType: "json",
        data: JSON.stringify({
          username: $('#ajax-form input[name=fName]').val(),
          password: $('#ajax-form input[name=lName]').val()
        }), 
        contentType: "application/json",
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function (msg) {
          console.log(msg);
          alert(msg.text);
        },
        //statusCode範例
        statusCode: {
          403: function (response) {
            LocationHerf();
          }
        }
      })
    })
    /*
    $('#register_form button[type="submit"]').click((event) => {
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
    $('#forgetpasswordbutton').click((event) => {
      console.log();
    });
    */
    
  });