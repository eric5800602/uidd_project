var invocation = new XMLHttpRequest();
var url = 'https://cors-anywhere.herokuapp.com/?fbclid=IwAR2U6gg_Vp2555f3PM1Ty236RfzOUpAO6UBBE9nFE-3RvMqj4BAIvuKRPPs';

$(document).ready(function() {
//  $('#ajax-form button[type="submit"]').click((event) => {
//    event.preventDefault()
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../sw.js')
    .then(reg => {
      console.log(`SW is registered with scope: ${reg.scope}`)
    })
    .catch(err => {
      console.log('SW Error ', err)
    })
  }

  const fetchData = () => {
    $('#hello').text(`fetching...`)

    $.get('./hello', res => {
      $('#hello').text(`server: ${res}`)
    })
  }

  $('#fetch-data').click(fetchData)
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
    },
    error:function(data){
      console.log(data)
    }
  });

  $(document).on("click",".posts_post", function(){
    console.log(this);
    localStorage.setItem("post_id",this.id);
    window.location= "./post.html" 
  });

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

});


