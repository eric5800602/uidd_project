var invocation = new XMLHttpRequest();
var url = 'https://cors-anywhere.herokuapp.com/?fbclid=IwAR2U6gg_Vp2555f3PM1Ty236RfzOUpAO6UBBE9nFE-3RvMqj4BAIvuKRPPs';

$(document).ready(function() {
//  $('#ajax-form button[type="submit"]').click((event) => {
//    event.preventDefault()

  $.ajax({
    url:"https://luffy.ee.ncku.edu.tw:7575/recommend",
    type:'get',
    dataType: "json",
    contentType: "application/json",
    success: function(data){
      //console.log(data.object.length)
      var html = ""
      for(i=0; i<data.object.length; i++){
        html = html+ `<div class="posts_post">\
            <img class="posts_post_img" src="${data.object[i].post_icon}">\
            <div class="posts_post_detail">\
              <p class="posts_post_detail_title">Modern room</p>\
              <div class="posts_post_detail_account">\
                <p class="posts_post_detail_account_id">eric_50336</p>\
                <img class="posts_post_detail_account_img" src="./res/img/request_1.png">\
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
});
