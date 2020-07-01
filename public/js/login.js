var sign_password, sign_username, sign_email;
var suite_count = false;
var room_count = false;
function suite_function(){
  const element_suite = document.querySelector("#suite");
  if(suite_count == false){
    suite_count = true;
    $('#suite').addClass('add_background');
    if(element_suite.classList.contains("remove_background"))
      $('#suite').removeClass('remove_background');
  }
  else{
    suite_count = false;
    if(element_suite.classList.contains("add_background"))
      $('#suite').removeClass('add_background');
    $('#suite').addClass('remove_background');
  }
}
function room_function(){
  const element_single = document.querySelector("#single");
  if(room_count == false){
    room_count = true;
    $('#single').addClass('add_background');
    if(element_single.classList.contains("remove_background"))
      $('#single').removeClass('remove_background');
  }
  else{
    room_count = false;
    if(element_single.classList.contains("add_background"))
      $('#single').removeClass('add_background');
    $('#single').addClass('remove_background');
  }
}



$('#SignModal1').on('show.bs.modal', function (e) {
  $(document.body).addClass("mymodal-open");
}).on('hide.bs.modal', function (e) {
  $(document.body).removeClass("mymodal-open");
})

$('#SignModal2').on('show.bs.modal', function (e) {
  $(document.body).addClass("mymodal-open");
}).on('hide.bs.modal', function (e) {
  $(document.body).removeClass("mymodal-open");
})



$(document).ready(function () {

  /* Login button*/ 
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
            window.location.href = "./tags.html";
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


  
  

  /* Modal1 Next button*/
  $('#modal1_input button[id="Next_button"]').click((event) => {
    event.preventDefault(); /* close html defalt setting*/
    
    window.sign_password = $('#modal1_input input[name=Password]').val();
    window.sign_username = $('#modal1_input input[name=Username]').val();
    window.sign_email = $('#modal1_input input[name=Email]').val();
    if(window.sign_password.length == 0 || window.sign_username.length == 0 || window.sign_email.length == 0){
      alert("請完整填寫欄位");
      return false;
    }
  })
  $('#ajax_login_signup button[id="signup"]').click((event) => {
    event.preventDefault();
  })
  /* Modal2 Next button*/
  $('#modal2_button button[id="Submit_button"]').click((event) => {
    $.post({
      url: "https://luffy.ee.ncku.edu.tw:7575/register",
      dataType: "json",
      contentType: "application/json",
      xhrFields: {
        withCredentials: true
      },
      data: JSON.stringify({
        username: window.sign_username,
        password: window.sign_password ,
        email: window.sign_email,
        designer: document.getElementById('switcher-1').checked,
        room: $('#modal2_input input[name=modal2_room]').val(),
        hall: $('#modal2_input input[name=modal2_hall]').val(),
        bath: $('#modal2_input input[name=modal2_bath]').val(),
        suite: suite_count
      }), 
      success: function (msg) {
        if(msg.success){
          window.location.href = "https://luffy.ee.ncku.edu.tw:7575/tags.html";
        }
        else{
          //window.location.href = "https://luffy.ee.ncku.edu.tw:7575/html/login.html";
          alert(msg.text);
        }
      },
      error: function(data){
        console.log("fail");
        console.log(data);
      }
    })
  })
  /* Modal2 Skip button*/
  $('#modal2_button span[id="skip_button"]').click((event) => {
    $.post({
      url: "https://luffy.ee.ncku.edu.tw:7575/register",
      dataType: "json",
      contentType: "application/json",
      xhrFields: {
        withCredentials: true
      },
      data:  JSON.stringify({
        username: window.sign_username,
        password: window.sign_password ,
        email: window.sign_email,
        designer: false,
        room: 0,
        hall: 0,
        bath: 0,
        suite: false
      }),
      success: function (msg) {
        console.log(msg);
        if(msg.success){
          console.log("success");
          window.location.href = "https://luffy.ee.ncku.edu.tw:7575/tags.html";
        }
        else{
          console.log("fail");
          //window.location.href = "https://luffy.ee.ncku.edu.tw:7575/html/login.html";
          alert(msg.text);
        }
      },
      error: function(data){
        console.log("fail");
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


