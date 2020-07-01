var invocation = new XMLHttpRequest();
var url = 'https://cors-anywhere.herokuapp.com/?fbclid=IwAR2U6gg_Vp2555f3PM1Ty236RfzOUpAO6UBBE9nFE-3RvMqj4BAIvuKRPPs';

$(document).ready(function() {
  var category = localStorage.getItem("c");
  console.log(category)
  if(category=="空間"){
    console.log("!")


  }else if(category=="單品"){
    console.log("?")
    $('#cube').click()
    $('#two').click()
  }else if(category=="臥室"||category=="廚房"||category=="客廳"||category=="書房"||category=="浴室"||category=="套房"||category=="雅房"||category=="餐廚"||category=="玄關"||category=="戶外空間"){
    console.log("> <")
    $('#one').click()
    $(category).click()
  }
  /* Magicline for scrollMenu */
  var $el, leftPos, newWidth, ori_new;
  /* Function for remove the class added in activity page */
  var remove_activity_class = function (){
    var scrollbar = document.getElementsByClassName('scrollmenu');
    if(scrollbar[0].classList.contains("activity_menu")){
      scrollbar[0].classList.remove("activity_menu");
      scrollbar[0].classList.remove("actclicked");
    }

    var activity_space = document.getElementsByClassName('activity_space');
    if(activity_space[0].classList.contains("clicked"))
      activity_space[0].classList.remove("clicked");
    var Theme = document.getElementsByClassName('Theme');
    if(Theme[0].classList.contains("Theme_hidden"))
      Theme[0].classList.remove("Theme_hidden");

    $('#Activity_tags_img').remove();
    $('#slogan').remove();
    $('#comment').remove();

    var myposts = document.getElementById('myposts');
    if(myposts.classList.contains("clicked"))
      myposts.classList.remove("clicked");
  };
  /* Cube animate */
  $(document).on("click",".cube", function(){
    var scrollbar = document.getElementsByClassName('scrollmenu');
    if(scrollbar[0].classList.contains("activity_menu")){
      $('.activity_menu').addClass('actclicked');
    }
    var page_title = document.getElementsByClassName('page_title');
    if(page_title[0].classList.contains("activity_clicked"))
      page_title[0].classList.remove("activity_clicked");
    $('.page_title').toggleClass('clicked');
    $('.activity_space').toggleClass('clicked');
  });
  $(document).on("click",".square_one", function(){
    $('.page_title').toggleClass('clicked');
    $('.activity_space').toggleClass('clicked');
    $('.content_background').data('bgcolor', $('.content_background').css('background-color')).css('background-color', '#848484');
    $('.page_title').data('bgcolor', $('.page_title').css('background-color')).css('background-color', '#848484');
    $('#Theme').text('Space');
    $('.Theme').addClass('space_one');
    var Theme = document.getElementsByClassName('Theme');
    if(Theme[0].classList.contains("space_two"))
      Theme[0].classList.remove("space_two");
    if(Theme[0].classList.contains("space_three"))
      Theme[0].classList.remove("space_three");
    remove_activity_class();
    var html = ""
    html = html+ `
      <li class="item" id="start"><a href="#All" id="All">All</a></li>\
      <li class="item"><a href="#客廳" id="客廳">客廳</a></li>\
      <li class="item"><a href="#臥室" id="臥室">臥室</a></li>\
      <li class="item"><a href="#書房" id="書房">書房</a></li>\
      <li class="item"><a href="#浴室" id="浴室">浴室</a></li>\
      <li class="item"><a href="#套房" id="套房">套房</a></li>\
      <li class="item"><a href="#雅房" id="雅房">雅房</a></li>\
      <li class="item"><a href="#餐廚" id="餐廚">餐廚</a></li>\
      <li class="item"><a href="#玄關" id="玄關">玄關</a></li>\
      <li class="item"><a href="#戶外空間" id="戶外空間">戶外空間</a></li>\
      <li id='magic-line'></li>`
    $('#Menu').html(html)
    $('#All').click();
  });
  $(document).on("click",".square_two", function(){
    $('.page_title').toggleClass('clicked');
    $('.activity_space').toggleClass('clicked');
    $('.content_background').data('bgcolor', $('.content_background').css('background-color')).css('background-color', '#D28B8B');
    $('.page_title').data('bgcolor', $('.page_title').css('background-color')).css('background-color', '#D28B8B');
    $('#Theme').text('Product');
    var Theme = document.getElementsByClassName('Theme');
    if(Theme[0].classList.contains("space_three"))
      Theme[0].classList.remove("space_three");
    if(Theme[0].classList.contains("space_one"))
      Theme[0].classList.remove("space_one");
    $('.Theme').addClass('space_two');
    remove_activity_class();
    var html = ""
    html = html+ `
      <li class="item" id="start"><a href="#All" id="All">All</a></li>\
      <li class="item"><a href="#桌子" id="桌子">桌子</a></li>\
      <li class="item"><a href="#沙發" id="沙發">沙發</a></li>\
      <li class="item"><a href="#燈具" id="燈具">燈具</a></li>\
      <li class="item"><a href="#椅子" id="椅子">椅子</a></li>\
      <li class="item"><a href="#收納櫃" id="收納櫃">收納櫃</a></li>\
      <li class="item"><a href="#寢具" id="寢具">寢具</a></li>\
      <li class="item"><a href="#衣櫃" id="衣櫃">衣櫃</a></li>\
      <li class="item"><a href="#衛浴用品" id="衛浴用品">衛浴用品</a></li>\
      <li class="item"><a href="#窗簾" id="窗簾">窗簾</a></li>\
      <li id='magic-line'></li>`
    $('#Menu').html(html)
    $('#All').click();
  });

  $(document).on("click",".square_three", function(){
    $('.page_title').toggleClass('clicked');
    $('.activity_space').toggleClass('clicked');
    $('.content_background').data('bgcolor', $('.content_background').css('background-color')).css('background-color', '#8BA9D2');
    $('.page_title').data('bgcolor', $('.page_title').css('background-color')).css('background-color', '#8BA9D2');
    $('#Theme').text('Designer');
    var Theme = document.getElementsByClassName('Theme');
    if(Theme[0].classList.contains("space_two"))
      Theme[0].classList.remove("space_two");
    if(Theme[0].classList.contains("space_one"))
      Theme[0].classList.remove("space_one");
    remove_activity_class();
    $('.Theme').addClass('space_three');
    var html = ""
    html = html+ `
      <li class="item" id="start"><a href="#All" id="All">All</a></li>\
      <li class="item"><a href="#住宅空間"  id="住宅空間">住宅空間</a></li>\
      <li class="item"><a href="#商業空間" id="商業空間">商業空間</a></li>\
      <li class="item"><a href="#辦公空間" id="辦公空間">辦公空間</a></li>\
      <li id='magic-line'></li>`
    $('#Menu').html(html)
    $('#All').click();
  });

  $(document).on("click",".square_four", function(){
    $('.page_title').toggleClass('clicked');
    $('.activity_space').toggleClass('clicked');
    $('.content_background').data('bgcolor', $('.content_background').css('background-color')).css('background-color', '#FFFFFF');
    $('.page_title').data('bgcolor', $('.page_title').css('background-color')).css('background-color', '#0F4C81');
    $('#Theme').text('Activity');
    var scrollbar = document.getElementsByClassName('scrollmenu');
    if(scrollbar[0].classList.contains("activity_menu")){
      scrollbar[0].classList.remove("actclicked");
    }
    var html = ""
    html = html+ `
      <p class="scrollmenu_text">貼文內加入標籤「經典藍」，即會出現於活動頁面 !</p>`
    $('#Menu').html(html)
    $('.scrollmenu').addClass('activity_menu');
    //$('.page_title').addClass('activity_page_title');
    $('.Theme').addClass('Theme_hidden');
    $('#myposts').addClass('clicked');
    $('.page_title').addClass('activity_clicked');

    var html = ""
    html = html+ `
      <p class="activity slogan changing" id="slogan">2020代表色<br>&emsp;&emsp;&emsp;經典藍</p>\
      <p class="activity comment changing" id="comment">經典藍給人的感覺是一個平靜的色彩，為人類心靈<br>帶來平和與寧靜，提供庇護。</p>\
      <img class="activity Activity_tags_img changing" id="Activity_tags_img" src="./image/Category/Activity/Activity.png">`
    $('#activity_text_space').html(html);
    $('#myposts').html("");
  });


  $(document).on("click",".scrollmenu li a", function(){
    var $magicLine = $("#magic-line");
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
    var now_tag = this.id;
    $.ajax({
      url:"https://luffy.ee.ncku.edu.tw:7575/get_post_with_space",
      type:'post',
      dataType: "json",
      contentType: "application/json",
      xhrFields: {
        withCredentials: true
      },
      data: JSON.stringify({space:now_tag}),
      success: function(data){
        var html = ""
        for(i=0; i<data.object.length; i++){
            if(!data.object[i].post_icon){
              data.object[i].post_icon = 'image/user/c006ca7fd14cb00b74ca03b7977019b8.png';
            }
            html = html+ `
            <div class="col-6 h-100 single_post" id="${data.object[i].id}">\
              <div class="img_of_post">\
                <img class="tags_img" alt="..." src="${data.object[i].post_icon}">\
              </div>\
              <div class="row no-gutters intro align-items-center">\
                <div class="col-6 intro_title">${data.object[i].title}</div>\
                <div class="col-4 intro_account_id">${data.object[i].name}</div>\
                <div class="col-2">\
                  <img class="intro_account_img" alt="..."src="${data.object[i].user_icon}"></img>\
                </div>\
              </div>\
            </div>`
        }

        $('#myposts').html(html)
      }
    });
    return false;
  });

  $(document).on("click",".single_post", function(){
    localStorage.setItem("post_id",this.id);
    window.location= "./post.html"
  });

  $('#back').click(function(){
    window.history.back();
  })

  $('.addpost').click(function(){
    $.ajax({
      url:"https://luffy.ee.ncku.edu.tw:7575/check_login",
      type:'get',
      dataType: "json",
      contentType: "application/json",
      success: function(data){
        console.log(data);
        if(data.success){
          window.location= "./post2.html"
        }else{
          alert('您還未登入，將導向登入頁面');
          window.location= "./login.html"
        }
      },
      error:function(data){
        console.log(data)
      }
    });
  });

  document.getElementById("cube").click();
  document.getElementById("one").click();
});


