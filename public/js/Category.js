var invocation = new XMLHttpRequest();
var url = 'https://cors-anywhere.herokuapp.com/?fbclid=IwAR2U6gg_Vp2555f3PM1Ty236RfzOUpAO6UBBE9nFE-3RvMqj4BAIvuKRPPs';

$(document).ready(function() {

  /* Magicline for scrollMenu */
  var $el,
    leftPos,
    newWidth,
    $mainNav = $(".scrollmenu");
  $(".active a").addClass("default_color")
  $mainNav.append("<li id='magic-line'></li>");

  var $magicLine = $("#magic-line");
  $magicLine
    .width($(".active").width())
    .css("left", $(".active a").position().left)
    .data("origLeft", $magicLine.position().left)
    .data("origTop", $magicLine.position().top)
    .data("origWidth", $magicLine.width());

  $('.scrollmenu li a').click(function(){
    if($(".active a").hasClass("default_color")){
      $(".active a").removeClass("default_color");
    }
    $('.scrollmenu li a').data('bgcolor', $('.scrollmenu li a').css('color')).css('color', '#5F5F5F');
    $el = $(this);
    $el.data('bgcolor', $el.css('color')).css('color', '#FFFFFF');
    leftPos = $el.position().left - $("#start").position().left;
    newWidth = $el.parent().width();
    $magicLine.stop().animate({
      left: leftPos,
      width: newWidth
    });
    $magicLine
      .data("origLeft", $(this).position().left)
      .data("origWidth", $(this).position().width);
    /*$(".single_post").remove();*/
  });

  $('.cube').on('click', function(){
    $('.page_title').toggleClass('clicked');
  });

  $.ajax({
    url:"https://luffy.ee.ncku.edu.tw:7575/recommend",
    type:'get',
    dataType: "json",
    contentType: "application/json",
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

  $(document).on("click",".single_post", function(){
    console.log(this);
    localStorage.setItem("post_id",this.id);
    window.location= "./post.html" 
  });
  


  $('.addpost').click(function(){
    window.location= "./post2.html" 
  });

});


