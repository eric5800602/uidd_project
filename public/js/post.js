var invocation = new XMLHttpRequest();
var url = 'https://cors-anywhere.herokuapp.com/?fbclid=IwAR2U6gg_Vp2555f3PM1Ty236RfzOUpAO6UBBE9nFE-3RvMqj4BAIvuKRPPs';
var source = false;
var price = false;
var texture = false;
var xpx, ypx;
var img;
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
      img=data.post.post_icon;
        // $("#post_img").attr("src",data.object[0].post_icon)
        // $("#user_img").attr("src",data.object[0].user_icon)
    }
});

$('.photo').click(function(){
  console.log("hi")
});

$('.div_source').click(function(){
  source=!source;
  console.log("source= "+source)
  if(source==true){
    $('.div_source').animate({"opacity": '0.5'});
  }else{
    $('.div_source').animate({"opacity": '1'});
  }
})

$('.div_price').click(function(){
  price=!price;
  console.log("price= "+source)
  if(price==true){
    $('.div_price').animate({"opacity": '0.5'});
  }else{
    $('.div_price').animate({"opacity": '1'});
  }

})

$('.div_texture').click(function(){ 
  texture=!texture;
  console.log("texture= "+source)
  if(texture==true){
    $('.div_texture').animate({"opacity": '0.5'});
  }else{
    $('.div_texture').animate({"opacity": '1'});
  }

})

$(document).ready(function() {
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
    console.log("back");
  })
});


$('#btn_submit').click(function(){
  var s=0, p=0, t=0;
  var cut;
  if(s==true) s=1;
  if(p==true) p=1;
  if(t==true) t=1;
  $.ajax({
    url:"/cropimage",
    type:'post',
    dataType: "json",
    data:JSON.stringify({
      url: img,
      x: xpx,
      y:ypx,
      width: 78,
      height: 78,

    }),
      contentType: "application/json",
      success: function(data){
        console.log(data.url);
        cut=data.url;

      }
  });

  $.ajax({
      url:"/add_request",
      type:'post',
      dataType: "json",
      data:JSON.stringify({
        postid:localStorage.getItem("post_id"),
        Source: s,
        Price: p,
        Texture: t,
        img: cut,
        x: xpx,
        y: ypy,
      }),
      contentType: "application/json",
      success: function(data){
        console.log(data);
      }
  });

  source=false;
  texture=false;
  price=false;
  xpx=0;
  ypx=0;
});

var el = document.getElementById("full");
el.addEventListener("touchstart", handleStart, false);
el.addEventListener("touchend", handleEnd, false);
el.addEventListener("touchcancel", handleCancel, false);
el.addEventListener("touchmove", handleMove, false);

el.addEventListener("mousestart", handleStart, false);
el.addEventListener("mouseend", handleEnd, false);
el.addEventListener("mousecancel", handleCancel, false);
el.addEventListener("mousemove", handleMove, false);

var ongoingTouches = [];

function handleStart(evt) {
    evt.preventDefault();
    var x = evt.pageX - $('#full').offset().left-40;
    var y = evt.pageY - $('#full').offset().top-40;
    console.log("x= " + x + "y= "+y)
    //document.getElementById("x").innerHTML = x;
    //document.getElementById("y").innerHTML = y;
    xpx = -x +'px'
    ypx = -y +'px'
    document.getElementById('image').style.left = xpx;
    document.getElementById('image').style.top = ypx;
}

function handleMove(evt) {
    evt.preventDefault();
    var x = evt.pageX - $('#full').offset().left-40;
    var y = evt.pageY - $('#full').offset().top-40;
    xpx = -x +'px'
    ypx = -y +'px'
    document.getElementById('image').style.left = xpx;
    document.getElementById('image').style.top = ypx;
}


function handleEnd(evt) {
  evt.preventDefault();
  console.log("touchend");
}

function handleCancel(evt) {
  evt.preventDefault();
  console.log("touchcancel.");
}
