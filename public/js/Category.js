var invocation = new XMLHttpRequest();
var url = 'https://cors-anywhere.herokuapp.com/?fbclid=IwAR2U6gg_Vp2555f3PM1Ty236RfzOUpAO6UBBE9nFE-3RvMqj4BAIvuKRPPs';

$(document).ready(function() {

  /* Magicline for scrollMenu */
  $(function() {
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
    $(".scrollmenu li a ").hover(
      function() {
        if($(".active a").hasClass("default_color")){
          $(".active a").removeClass("default_color");
        }
        $el = $(this);
        $el.data('bgcolor', $el.css('color')).css('color', '#FFFFFF');
        leftPos = $el.position().left - $("#start").position().left;
        newWidth = $el.parent().width();
        $magicLine.stop().animate({
          left: leftPos,
          width: newWidth
        });
      },
      function() {
        $el = $(this);
        $el.css('color', $el.data('bgcolor'));
        $magicLine.stop().animate({
          left: $magicLine.data("origLeft"),
          top: $magicLine.data("origTop"),
          width: $magicLine.data("origWidth")
        });
      }
    );
  });
  /* Scale Text to Fit in Fixed Div */

  $.ajax({
    url:"https://luffy.ee.ncku.edu.tw:7575/recommend",
    type:'get',
    dataType: "json",
    contentType: "application/json",
    success: function(data){
      console.log(data.object[0])
      var html = ""
      for(i=0; i<data.object.length; i++){
        html = html+ `<div class="posts_post" id="${data.object[i].id}">\
            <img class="posts_post_img" src="${data.object[i].post_icon}">\
            <div class="posts_post_detail">\
              <p class="posts_post_detail_title">${data.object[i].title}</p>\
              <div class="posts_post_detail_account">\
                <p class="posts_post_detail_account_id">${data.object[i].name}</p>\
                <img class="posts_post_detail_account_img" src="${data.object[i].user_icon}">\
              </div>\
            </div>\
          </div>`
      }
        $('#posts').html(html)
        // data.object.forEach(element => console.log(element));
        // $("#post_img").attr("src",data.object[0].post_icon)
        // $("#user_img").attr("src",data.object[0].user_icon)
    }
  });

  $(document).on("click",".posts_post", function(){
    console.log(this);
    localStorage.setItem("post_id",this.id);
    window.location= "./post.html" 
  });

  $('.addpost').click(function(){
    window.location= "./post2.html" 
  });

});


