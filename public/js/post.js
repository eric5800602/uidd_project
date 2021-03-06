$('#modal_custom_out').css({"display":"none"})
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
var content_current=0;
var imgsrc;
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
        //console.log("id= "+id)
        html=html+`
                <div class="requests_request " id="${data.requests[i]._id}">\
                  <img class="requests_request_image" src="${data.requests[i].img}" id="want_img_${i}" onclick="google1(this.id)">\
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
      //console.log("html=" + html)
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
      $('#hashtag').html(hashtag_html)
      hashtag_html+='</div>'
      //console.log(hashtag_html)

      var category_html=`<p class="content_category_title">Category</p>\
                        <div class="content_category_content">\
                        <p class="content_category_content_first content_category_content_content"  id="category_1" onclick="category(this.id)"> ${data.post.space} </p>\
                        <p class="content_category_content_big">> </p>\
                        <p class="content_category_content_second content_category_content_content" id="category_2" onclick="category(this.id)"> ${data.post.room}</p>\
                        <p class="content_category_content_big">></p>\
                        <p class="content_category_content_third content_category_content_content" id="category_3" onclick="category(this.id)"> ${data.post.pings}</p>\
                        `;
      $('#category').html(category_html)
      //console.log(category_html)
      var single_html=`<div class="content_image" id="ah">`
      for(i=0; i<data.single.length; i++){
        id="content_img_"+i
        cmodal="content_modal_"+i
        single_html+=`<div id=${cmodal} style="display:inline-block">
                        <img class="content_image_1" id=${id} src=${data.single[i].img} onclick="slide(this.id)">
                      </div>`;
      }
      //single_html+=`</div class="content_static">`
      for(i=0; i<data.single.length; i++){
        var content="content_"+i
        single_html+=`</div>
                      <div id=${content}>
                      <div class="content_paragraph">
                        <p class="content_paragraph_title">${data.single[i].name}</p>
                        <div class="content_paragraph_stars">
                    `;
        for(j=0; j<parseInt(data.single[i].evaluation); j++){
          single_html+=`<img class="content_paragraph_star" src="./res/img/star.png">`;
        }
        single_html+=`</div>
                      </div>
                      <p class="content_content">${data.single[i].description}</p>
                      `;
      }



      single_html+=`</div></div>`
      var max=0;
      $('#single').html(single_html)
      for(i=0; i<data.single.length; i++){
        // console.log(document.getElementById('content_'+i).clientHeight)
        if(max<document.getElementById('content_'+i).clientHeight){
          max=document.getElementById('content_'+i).clientHeight
        }
        if(i!=0){
          // console.log("#content_title_"+i)

          $("#content_"+i).hide()
          $("#content_"+i).hide()
          $("#content_img_"+i).css({"opacity":"0.5"})
        }
      }
      // console.log("max="+max)
      // console.log(document.getElementById('ah').offsetHeight)
      // max+=document.getElementById('content_modal_0').clientHeight
      // console.log("max="+max)
      $('#single').css({height:max+80})
      var dot_html=``
      for(i=0; i<data.single.length; i++){
        dot_html+=`<img class="dot" src="./res/img/circle.png" style="position:absolute; top:${data.single[i].position.coordinates[1]}px; left:${data.single[i].position.coordinates[0]}px">
                  <div class="bubble_s bubble-bottom-left_s" style="top:${data.single[i].position.coordinates[1]-20}px; left:${data.single[i].position.coordinates[0]}px">${data.single[i].name}</div>`
      }
      for(i=0; i<data.requests.length; i++){
        var scale=data.requests[i].Push*0.02+1
        var x=data.requests[i].position.coordinates[1]+1
        var y=data.requests[i].position.coordinates[0]+1
        var numx = x+1;
        var numy = y+1;
        dot_html+=`
                    <div class="dot_color" style=" top:${x}px; left:${y}px; transform:scale(${scale}) ">
                      <p class="dot_number" style="transform:scale(${1/scale})">${data.requests[i].Push}</p>
                    </div>
                    <div class="bubble bubble-bottom-left" style=" top:${x-25}px; left:${y-13}px;">
                      Request!
                    </div>

                  `
      }
      $('#mask').html(dot_html)
      localStorage.setItem("first", data.post.space)
      localStorage.setItem("second", data.post.room)

      var shadow_html=``;
      for(i=0; i<data.single.length; i++){
        var x=data.single[i].position.coordinates[1]+1
        var y=data.single[i].position.coordinates[0]+1
        var img_width = document.getElementById('post_icon').offsetWidth
        var img_height = document.getElementById('post_icon').offsetHeight
        var box_width = 80;
        var border_a = x-box_width/2+5
        var border_b = img_width-y-box_width/2-5
        var border_c = img_height-x-box_width/2-5
        var border_d = y-box_width/2+5
        var temp = border_a+"px "+border_b+"px "+border_c+"px "+border_d+"px"
        shadow_html+=`<div class="shadow" id="shadow_${i}" style="border-width: ${temp};">
                      </div>
                      `
      }
      $('#shadow').html(shadow_html)
      if(data.single.length==1){
        $('.shadow').addClass('s_1')
      }
      if(data.single.length==2){
        $('.shadow').addClass('s_2')
      }
      if(data.single.length==3){
        $('.shadow').addClass('s_3')
      }
      if(data.single.length==4){
        $('.shadow').addClass('s_4')
      }
      if(data.single.length==5){
        $('.shadow').addClass('s_5')
      }
      if(data.single.length==6){
        $('.shadow').addClass('s_6')
      }
      $('.bubble').css({"opacity":"0"})
      $('.bubble_s').css({"opacity":"0"})

    }

});

// 點擊貼文照片出現東西
function mask(){
  console.log("mask")
  var em = document.getElementById("shadow");
  if(window.getComputedStyle(em).getPropertyValue("opacity")=='0'){
    $('#shadow').animate({"opacity": "1"})
    $('.dot').animate({"opacity": '1'})
    $('.dot_color').animate({"opacity": '1'})
    $('.bubble').animate({"opacity": '1'})
    $('.bubble_s').animate({"opacity": '1'})

  }else{
    $('#shadow').animate({"opacity": '0'})
    $('.dot').animate({"opacity": '0.5'})
    $('.dot_color').animate({"opacity": '0'})
    $('.bubble').animate({"opacity": '0'})
    $('.bubble_s').animate({"opacity": '0'})
  }
}

function category(thisid){
  if(thisid=="category_1"){
    localStorage.setItem("change", 1)
    localStorage.setItem("clickwhich", 1)
  }else if(thisid=="category_2"){
    localStorage.setItem("change", 1)
    localStorage.setItem("clickwhich", 2)
  }
  window.location= "./Category.html"

}

function slide(thisid){
  console.log(thisid)
  var num = thisid.substring(12, thisid.length)
  var em = document.getElementById(thisid);
  if(window.getComputedStyle(em).getPropertyValue("opacity")=='1'){
    // 以圖搜圖
    console.log("!")
    console.log("src=" + document.getElementById(thisid).src)
    src=document.getElementById(thisid).src
    imgsrc=src
    console.log("yeah!"+imgsrc)
    $('#modal_google').attr("src",src);
    $('#modal_custom_out').css({"display":"flex"})
    // $('#google').hide()
    // $('#exampleModalCenter-4').addClass('show');
    // $('#exampleModalCenter-4').modal('show');
  }else{
    $('#content_img_'+num).animate({"opacity":'1'}, 250)
    // $('#content_img_'+num).
    $('#content_img_'+content_current).animate({"opacity":'0.5'}, 250)

  }
  var sc = document.getElementById("id_content").scrollTop
  var pos = $("#content_"+content_current).offset().top

  if(content_current==num){
    // 以圖搜圖
    console.log("SAME!")

  }else if(content_current>num){
    // 之前的比較大，往右滑
    $("#content_"+content_current).effect("slide",{direction: "right", mode:"hide", duration:250})
    $("#content_"+content_current).css({"top": pos+sc+"px"})
    $("#content_"+num).css({"top": pos+sc+"px"})
    $("#content_"+num).effect("slide",{direction: "left", mode:"show", duration:250})
    $("#content_"+num).css({"top": pos+sc+"px"})
  }else if(content_current<num){
    // 之前的比較小，往左滑
    $("#content_"+content_current).effect("slide",{direction: "left", mode:"hide", duration:250})
    $("#content_"+content_current).css({"top": pos+sc+"px"})
    $("#content_"+num).css({"top": pos+sc+"px"})
    $("#content_"+num).effect("slide",{direction: "right", mode:"show", duration:250})
    $("#content_"+num).css({"top": pos+sc+"px"})

  }
  content_current=num
}

function google(){
  console.log("google")
  $('#modal_custom_out').css({"display":"none"})
  var link="http://images.google.com/searchbyimage?image_url="+imgsrc
  window.open(link);
  console.log("!!!")
}

$('#modal_custom_out').click(function(){
  console.log("bye");
  $('#modal_custom_out').css({"display":"none"})
});

function google1 (id){
  console.log("googleeee?");
  var src=document.getElementById(id).src
  imgsrc=src
  console.log("imgsrc"+imgsrc)
  $('#modal_google').attr("src",src);
  $('#modal_custom_out').css({"display":"flex"})
  console.log(src)
}

// 點擊request
function like (id_click){
  // console.log(id_click)
  // console.log(id_click.substring(4, 5))
  var oper=1;
  var type="";
  var id_last="";
  var em = document.getElementById(id_click);
  var temp = window.getComputedStyle(em).getPropertyValue("opacity");
  if(id_click.substring(4, 5)=='s'){
    type="Source"
    id_last=id_click.substring(11, id_click.length);
    if(temp==1){
      oper=1;
      $('#'+id_click).animate({"opacity":'0.5'})
    }else{
      oper=0;
      $('#'+id_click).animate({"opacity":'1'})
    }

  }else if(id_click.substring(4, 6)=='pr'){
    type="Price"
    id_last=id_click.substring(10, id_click.length);
    if(temp==1){
      oper=1;
      $('#'+id_click).animate({"opacity":'0.5'})
    }else{
      oper=0;
      $('#'+id_click).animate({"opacity":'1'})
    }
  }else if(id_click.substring(4, 5)=='t'){
    type="Texture"
    id_last=id_click.substring(12, id_click.length);
    if(temp==1){
      oper=1
      $('#'+id_click).animate({"opacity":'0.5'})
    }else{
      oper=0
      $('#'+id_click).animate({"opacity":'1'})
    }
  }else if(id_click.substring(4, 6)=='pu'){
    type="Push"
    id_last=id_click.substring(9, id_click.length);
    if(temp==1){
      oper=1
      $('#'+id_click).animate({"opacity":'0.5'})
    }else{
      oper=0
      $('#'+id_click).animate({"opacity":'1'})
    }
  }else{
    console.log('wrong')
  }
  //console.log("request_id= "+id_last+"\ntype= "+type+"\noper= "+oper)
  $.ajax({
    url:"/modify_request",
    type:'post',
    dataType: "json",
    data:JSON.stringify({
      requestid: id_last,
      type: type,
      plus: oper
    }),
    contentType: "application/json",
    success: function(data){
      //console.log(data);
      //console.log(id_click.substring(4, id_click.length));
      $('#'+id_click.substring(4, id_click.length)).text(data.count);
    }
  });

}

$('.data_texture').click(function(){
  console.log("texture");
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
      x: xx+12,
      y: yy+8,
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
    // console.log("handle start")
    evt.preventDefault();
    x = event.changedTouches[0].pageX - $('#full').offset().left-40;
    y = event.changedTouches[0].pageY - $('#full').offset().top-40;

    //document.getElementById("x").innerHTML = x;
    //document.getElementById("y").innerHTML = y;
    xpx = -x +'px'
    ypx = -y +'px'
    document.getElementById('image').style.left = xpx;
    document.getElementById('image').style.top = ypx;
    // console.log("x= " + x + "y= "+y)
}

function handleMove(evt) {
  // console.log("handle move")
  evt.preventDefault();
  x = event.changedTouches[0].pageX - $('#full').offset().left-40;
  y = event.changedTouches[0].pageY - $('#full').offset().top-40;
  xx = x+40
  yy = y+40
  xpx = -x +'px'
  ypx = -y +'px'
  document.getElementById('image').style.left = xpx;
  document.getElementById('image').style.top = ypx;
  // console.log("x="+x+", y="+y)
  // console.log("evt.pageX="+evt.pageX+", evt.pageX="+evt.pageX)
  // console.log("$('#full').offset().left="+$('#full').offset().left+", $('#full').offset().left="+$('#full').offset().left)
}


function handleEnd(evt) {
  // console.log("handle end")
  evt.preventDefault();
  x = event.changedTouches[0].pageX - $('#full').offset().left-40;
  y = event.changedTouches[0].pageY - $('#full').offset().top-40;
  xx = x+40
  yy = y+40
  xpx = -x +'px'
  ypx = -y +'px'
  document.getElementById('image').style.left = xpx;
  document.getElementById('image').style.top = ypx;
  // console.log("x="+x+", y="+y)
}

function handleCancel(evt) {
  // console.log("handle cancel")
  evt.preventDefault();
  x = evt.pageX - $('#full').offset().left-40;
  y = evt.pageY - $('#full').offset().top-40;
  xx = x+40
  yy = y+40
  xpx = -x +'px'
  ypx = -y +'px'
  document.getElementById('image').style.left = xpx;
  document.getElementById('image').style.top = ypx;
  // console.log("x="+x+", y="+y)
}

var box1 = document.querySelector('.nav');
box1.addEventListener('touchstart', function(e){
  // console.log("event start")
  var touchobj = e.changedTouches[0];
  startx = parseInt(touchobj.clientX);
  starty = parseInt(touchobj.clientY);
  // console.log("event start done", startx,starty)
}, false);

var timeout ;

// $('#content_img_0').mousedown(function() {
//     timeout = setTimeout(function() {
//       $('#exampleModalCenter-4').modal('show');
//     }, 2000);
// });

// $('#content_img_0').mouseup(function() {
//     clearTimeout(timeout);
//     $('#exampleModalCenter-4').modal('show');
// });

// $('#content_img_0').mouseout(function() {
//     clearTimeout(timeout);
//     $('#exampleModalCenter-4').modal('show');
// });
