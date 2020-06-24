var invocation = new XMLHttpRequest();
var url = 'https://cors-anywhere.herokuapp.com/?fbclid=IwAR2U6gg_Vp2555f3PM1Ty236RfzOUpAO6UBBE9nFE-3RvMqj4BAIvuKRPPs';

$(document).ready(function() {

  /* Magicline for scrollMenu */
  var $el, leftPos, newWidth, ori_new;
  $(".active a").addClass("default_color")

  /* Cube animate */
  $(document).on("click",".cube", function(){
    $('.page_title').toggleClass('clicked');
  });
  $(document).on("click",".square_one", function(){
    $('.page_title').toggleClass('clicked');
    $('.content_background').data('bgcolor', $('.content_background').css('background-color')).css('background-color', '#848484');
    $('.page_title').data('bgcolor', $('.page_title').css('background-color')).css('background-color', '#848484');
    $('#Theme').text('Space');
    $('.Theme').addClass('space_one');
    var Theme = document.getElementsByClassName('Theme');
    if(Theme[0].classList.contains("space_two"))
      Theme[0].classList.remove("space_two");
    if(Theme[0].classList.contains("space_three"))
      Theme[0].classList.remove("space_three");
    var html = ""
    html = html+ `
      <li class="item active" id="start"><a href="#All">All</a></li>\
      <li class="item"><a href="#客廳">客廳</a></li>\
      <li class="item"><a href="#臥室">臥室</a></li>\
      <li class="item"><a href="#書房">書房</a></li>\
      <li class="item"><a href="#浴室">浴室</a></li>\
      <li class="item"><a href="#套房">套房</a></li>\
      <li class="item"><a href="#雅房">雅房</a></li>\
      <li class="item"><a href="#餐廚">餐廚</a></li>\
      <li class="item"><a href="#玄關">玄關</a></li>\
      <li class="item"><a href="#戶外空間">戶外空間</a></li>\
      <li id='magic-line'></li>`
    $('#Menu').html(html)
    $(".active a").addClass("default_color")
  });
  $(document).on("click",".square_two", function(){
    $('.page_title').toggleClass('clicked');
    $('.content_background').data('bgcolor', $('.content_background').css('background-color')).css('background-color', '#D28B8B');
    $('.page_title').data('bgcolor', $('.page_title').css('background-color')).css('background-color', '#D28B8B');
    $('#Theme').text('Product');
    var Theme = document.getElementsByClassName('Theme');
    if(Theme[0].classList.contains("space_three"))
      Theme[0].classList.remove("space_three");
    if(Theme[0].classList.contains("space_one"))
      Theme[0].classList.remove("space_one");
    $('.Theme').addClass('space_two');
    var html = ""
    html = html+ `
      <li class="item active" id="start"><a href="#All">All</a></li>\
      <li class="item"><a href="#桌子">桌子</a></li>\
      <li class="item"><a href="#沙發">沙發</a></li>\
      <li class="item"><a href="#燈具">燈具</a></li>\
      <li class="item"><a href="#椅子">椅子</a></li>\
      <li class="item"><a href="#收納櫃">收納櫃</a></li>\
      <li class="item"><a href="#寢具">寢具</a></li>\
      <li class="item"><a href="#衣櫃">衣櫃</a></li>\
      <li class="item"><a href="#衛浴用品">衛浴用品</a></li>\
      <li class="item"><a href="#窗簾">窗簾</a></li>\
      <li id='magic-line'></li>`
    $('#Menu').html(html)
    $(".active a").addClass("default_color")

  });

  $(document).on("click",".square_three", function(){
    $('.page_title').toggleClass('clicked');
    $('.content_background').data('bgcolor', $('.content_background').css('background-color')).css('background-color', '#8BA9D2');
    $('.page_title').data('bgcolor', $('.page_title').css('background-color')).css('background-color', '#8BA9D2');
    $('#Theme').text('Designer');
    var Theme = document.getElementsByClassName('Theme');
    if(Theme[0].classList.contains("space_two"))
      Theme[0].classList.remove("space_two");
    if(Theme[0].classList.contains("space_one"))
      Theme[0].classList.remove("space_one");
    $('.Theme').addClass('space_three');
    var html = ""
    html = html+ `
      <li class="item active" id="start"><a href="#All">All</a></li>\
      <li class="item"><a href="#住宅空間">住宅空間</a></li>\
      <li class="item"><a href="#商業空間">商業空間</a></li>\
      <li class="item"><a href="#辦公空間">辦公空間</a></li>\
      <li id='magic-line'></li>`
    $('#Menu').html(html)
    $(".active a").addClass("default_color")
  });

  $(document).on("click",".square_four", function(){
    $('.page_title').toggleClass('clicked');
    $('.content_background').data('bgcolor', $('.content_background').css('background-color')).css('background-color', '#FFFFFF');
    $('.page_title').data('bgcolor', $('.page_title').css('background-color')).css('background-color', '#0F4C81');
    $('#Theme').text('Activity');
  });
  var target_tag = $("#magic-line").context.URL.split("#")[1];
  
  $.ajax({
    url:"https://luffy.ee.ncku.edu.tw:7575/get_post_with_tag",
    type:'post',
    dataType: "json",
    contentType: "application/json",
    xhrFields: {
      withCredentials: true
    },
    data: JSON.stringify({tag:target_tag}),
    success: function(data){
      console.log(data.object[0])
      var html = ""
      for(i=0; i<data.object.length; i++){
          html = html+ `
          <div class="col-6 h-100 single_post" id="${data.object[i].id}">\
            <img class="tags_img" src="${data.object[i].post_icon}">\
                <div class="row no-gutters intro align-items-center">\
                  <div class="col-6 intro_title">${data.object[i].title}</div>\
                  <div class="col-4 intro_account_id">${data.object[i].name}</div>\
                  <div class="col-2">\
                    <img class="intro_account_img" src="${data.object[i].user_icon}"></img>\
                  </div>\
                </div>\
            </img>\
          </div>`
      }
        $('#myposts').html(html)
    }
  });

  $(document).on("click",".scrollmenu li a", function(){
    console.log("a click");
    var $magicLine = $("#magic-line");
    
    if($(".active a").hasClass("default_color")){
      $(".active a").removeClass("default_color");
    }
    $('.scrollmenu li a').data('bgcolor', $('.scrollmenu li a').css('color')).css('color', '#5F5F5F');
    $el = $(this);
    $el.data('bgcolor', $el.css('color')).css('color', '#FFFFFF');
    leftPos = $el.position().left - $("#start").position().left;
    ori_new = $el.parent().width();
    newWidth = ori_new * 0.7;
    leftPos = leftPos + 0.5*(ori_new-newWidth);
    $magicLine.stop().animate({
      left: leftPos,
      width: newWidth
    });
    $magicLine
      .data("origLeft", $(this).position().left)
      .data("origWidth", $(this).position().width);
  });

  $(document).on("click",".single_post", function(){
    console.log(this);
    localStorage.setItem("post_id",this.id);
    window.location= "./post.html" 
  });
  


  $('.addpost').click(function(){
    window.location= "./post2.html" 
  });

});


