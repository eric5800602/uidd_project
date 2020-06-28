var invocation = new XMLHttpRequest();
var url = 'https://cors-anywhere.herokuapp.com/?fbclid=IwAR2U6gg_Vp2555f3PM1Ty236RfzOUpAO6UBBE9nFE-3RvMqj4BAIvuKRPPs';
$.ajax({
    url:"/get_post",
    type:'post',
    dataType: "json",
    data:JSON.stringify({
      id:localStorage.getItem("post_id")
    }),
    contentType: "application/json",
    success: function(data){
      console.log(data);
      $('#post_title').text(data.post.title);
      $('#post_id').text(data.post.name);
      $('#user_icon').attr("src",data.post.user_icon);
      $('#post_icon').attr("src",data.post.post_icon);
      $('#like_count').text(data.post.like);
      $('#pen_count').text(data.post.request);
      $('#post_content').text(data.post.explanation);
        // $("#post_img").attr("src",data.object[0].post_icon)
        // $("#user_img").attr("src",data.object[0].user_icon)
    }
});
$('.photo').click(funciton(){
  console.log("ai")
});


$(window).onload(function() {
  $('.requests_request_want').addClass("blue")
  var state=false
  $('#want_btn_0').click(function(){
    if(state){
      var num = Number(document.getElementById("want_number_0").innerHTML)
      state = false
      $('#want_btn_0').removeClass("blue")
      $('#want_btn_0').addClass("pink")
      $('#want_btn_0').removeClass("want_2pink")
      $('#want_btn_0').addClass("want_2blue")
      document.getElementById("want_btn_0").innerHTML="我也想知道!"
      document.getElementById("want_number_0").innerHTML=num-1
    }else{
      state=true
      var num = Number(document.getElementById("want_number_0").innerHTML)
      $('#want_btn_0').removeClass("pink")
      $('#want_btn_0').addClass("blue")
      $('#want_btn_0').removeClass("want_2blue")
      $('#want_btn_0').addClass("want_2pink")
      document.getElementById("want_btn_0").innerHTML="已加入通知!"
      document.getElementById("want_number_0").innerHTML=num+1
    }
  });
  var heart_s=false;
  $('.interact_likes_heart_logo').click(function(){
    heart_s=!heart_s
    if(heart_s==true){
      setTimeout( function(){
          document.getElementById("heart").src = "./res/img/heart1.png"
      },50)
      setTimeout( function(){
          document.getElementById("heart").src = "./res/img/heart2.png"
      },100)
      setTimeout( function(){
          document.getElementById("heart").src = "./res/img/heart3.png"
      },150)
      setTimeout( function(){
          document.getElementById("heart").src = "./res/img/heart4.png"
      },200)
      setTimeout( function(){
          document.getElementById("heart").src = "./res/img/heart5.png"
      },250)
      setTimeout( function(){
          document.getElementById("heart").src = "./res/img/heart6.png"
      },300)
      setTimeout( function(){
          document.getElementById("heart").src = "./res/img/heart7.png"
      },350)
      setTimeout( function(){
          document.getElementById("heart").src = "./res/img/heart8.png"
      },400)
    }else{


    }
  })

  $('#back').click(function(){
    window.location= "./home.html"
  })
});
