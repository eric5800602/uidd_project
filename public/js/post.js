var invocation = new XMLHttpRequest();
var url = 'https://cors-anywhere.herokuapp.com/?fbclid=IwAR2U6gg_Vp2555f3PM1Ty236RfzOUpAO6UBBE9nFE-3RvMqj4BAIvuKRPPs';
var source = false;
var price = false;
var texture = false;
var btn_s = false;
var btn_p = false;
var btn_t = false;
var btn_push = false;
var xpx=0, ypx=0, x=0, y=0, xx=0, yy=0;
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
      var html='<div class="requests"><p class="requests_title">Request</p>';
      for(i=0; i<data.requests.length; i++){
        var id = ["\"source_"+data.requests[i]._id+"\"", "\"btn_source_"+data.requests[i]._id + "\"",
                  "\"price_"+data.requests[i]._id+"\"", "\"btn_price_"+data.requests[i]._id+"\"",
                  "\"texture_"+data.requests[i]._id+"\"", "\"btn_texture_"+data.requests[i]._id+"\"",
                  "\"btn_push_"+data.requests[i]._id+"\"",  "\"push_"+data.requests[i]._id+"\""];
        console.log("id= "+id)
        html=html+`
                <div class="requests_request " id="${data.requests[i]._id}">\
                  <img class="requests_request_image" src="${data.requests[i].img}" id="want_img_0">\
                  <div class="requests_request_data ">
                    
                    <div class="request_data data_source">
                      <p class="request_data_num" id=${id[0]}> ${data.requests[i].Source}
                      <p class="request_data_btn" id=${id[1]} onclick="like(this.id)"> Source
                    </div>
                    <div class="request_data data_price">
                      <p class="request_data_num" id=${id[2]}> ${data.requests[i].Price}
                      <p class="request_data_btn" id=${id[3]} onclick="like(this.id)"> Price
                    </div>
                    <div class="request_data data_texture">
                      <p class="request_data_num" id=${id[4]}> ${data.requests[i].Texture}
                      <p class="request_data_btn" id=${id[5]} onclick="like(this.id)"> Texture
                    </div>

                  </div>
                  <div class="requests_request_push">
                    <p class="requests_request_btn" id=${id[6]} onclick="like(this.id)"> PUSH
                    <p class="requests_request_num" id=${id[7]}> ${data.requests[i].Push}
                  </div>
                </div>
        `
      }
      html+="</div>"
      console.log("html=" + html)
      $('#requests').html(html)

      $('#full').attr("src", data.post.post_icon)
      $('#image').attr("src", data.post.post_icon)
        // $("#post_img").attr("src",data.object[0].post_icon)
        // $("#user_img").attr("src",data.object[0].user_icon)
      
      var hashtag_html='<div class="content_hashtag">\
                        <p class="content_hashtag_title">Hashtag</p>\
                        ';
      for(i=0; i<data.post.tags.length; i++){
        hashtag_html=hashtag_html + `\
          <p class="content_hashtag_first content_hashtag_hashtag"> ${data.post.tags[i]}</p>\
        `
      }

      hashtag_html+='</div>'
      console.log(hashtag_html)
    }
});

function like (id_click){
  console.log(id_click)
  //console.log(id_click.substring(4, 5))
  var oper=1;
  var type="";
  if(id_click.substring(4, 5)=='s'){
    console.log("btn_s" + btn_s)
    btn_s=!btn_s
    type="Source"
    if(btn_s==true){
      oper=1;
      $('#'+id_click).animate({"opacity":'0.5'})
    }else{
      oper=0;
      $('#'+id_click).animate({"opacity":'1'})
    }

  }else if(id_click.substring(4, 6)=='pr'){
    btn_p=!btn_p
    console.log("btn_pr" + btn_p)
    type="Price"
    if(btn_p==true){
      oper=1;
      $('#'+id_click).animate({"opacity":'0.5'})
    }else{
      oper=0;
      $('#'+id_click).animate({"opacity":'1'})
    }
  }else if(id_click.substring(4, 5)=='t'){
    btn_t=!btn_t
    console.log("btn_t" + btn_t)
    type="Texture"
    if(btn_t==true){
      oper=1
      $('#'+id_click).animate({"opacity":'0.5'})
    }else{
      oper=0
      $('#'+id_click).animate({"opacity":'1'})
    }
  }else if(id_click.substring(4, 6)=='pu'){
    btn_push=!btn_push
    console.log("btn_push" + btn_push)
    type="Push"
    if(btn_push==true){
      oper=1
      $('#'+id_click).animate({"opacity":'0.5'})
    }else{
      oper=0
      $('#'+id_click).animate({"opacity":'1'})
    }
  }else{
    console.log('wrong')
  }
  console.log("request_id= "+id_clicked+"\ntype= "+type+"\noper= "+oper+")
  



}

$('.data_texture').click(function(){ 
  console.log("texture"); 
});

// 點擊貼文照片出現東西
$('.photo').click(function(){
  console.log("hi")
});


// 發出request選擇source/price/texture
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
  console.log("price= "+price)
  if(price==true){
    $('.div_price').animate({"opacity": '0.5'});
  }else{
    $('.div_price').animate({"opacity": '1'});
  }

})

$('.div_texture').click(function(){ 
  texture=!texture;
  console.log("texture= "+texture)
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


// 發出request的ajax
$('#btn_submit').click(function(){
  var s=0, p=0, t=0;
  var cut;
  btn_s = source
  btn_p = price
  btn_t = texture
  if(source==true) s=1;
  if(price==true) p=1;
  if(texture==true) t=1;
  console.log("Cropimage\nimg: " + img + "\nx: " + x + "\ny: " + y )
  // 切圖片
  $.ajax({
    url:"/cropimage",
    type:'post',
    dataType: "json",
    data:JSON.stringify({
      url: img,
      x: xx+30,
      y: yy+10,
      width: 375,
      height: 282,
      target_w: 60,
      target_h: 78

    }),
      contentType: "application/json",
      success: function(data){
        cut=data.url;
        console.log("Addrequest\ns: " + s + "\np " + p + "\nt: " + t + "\nimg: "+ cut+"\n x: "+xpx+"\nypx: "+ypx )
        console.log("xx= "+xx+", yy= "+yy)
        // 新增request
        $.ajax({
             url:"/add_request",
             type:'post',
             dataType: "json",
             data:JSON.stringify({
               postid:localStorage.getItem("post_id"),
               Source: s,
               Price: p,
               Texture: t,
               Push: 1,
               img: cut,
               x: xx,
               y: yy,
             }),
             contentType: "application/json",
             success: function(data){
               console.log(data);
               location.reload();
             }
         });
      }
  });

  $('.div_source').animate({"opacity": '1'});
  $('.div_texture').animate({"opacity": '1'});
  $('.div_price').animate({"opacity": '1'});
  source=false;
  texture=false;
  price=false;
  //xpx=0;
  //ypx=0;
});


// request下面的圖跟著動+取得點
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
    x = evt.pageX - $('#full').offset().left-40;
    y = evt.pageY - $('#full').offset().top-40;
    console.log("x= " + x + "y= "+y)
    //document.getElementById("x").innerHTML = x;
    //document.getElementById("y").innerHTML = y;
    xpx = -x +'px'
    ypx = -y +'px'
    document.getElementById('image').style.left = xpx;
    document.getElementById('image').style.top = ypx;
}

function handleMove(evt) {
    console.log("x="+x+", y="+y)
    evt.preventDefault();
    x = evt.pageX - $('#full').offset().left-40;
    y = evt.pageY - $('#full').offset().top-40;
    xx = x+40
    yy = y+40
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
