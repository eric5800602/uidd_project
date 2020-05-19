var invocation = new XMLHttpRequest();
var url = 'https://cors-anywhere.herokuapp.com/?fbclid=IwAR2U6gg_Vp2555f3PM1Ty236RfzOUpAO6UBBE9nFE-3RvMqj4BAIvuKRPPs';

$(document).ready(function() {
//  $('#ajax-form button[type="submit"]').click((event) => {
//    event.preventDefault()
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
  $('#back').click(function(){
    window.location= "./home.html"
  })

})

 $.ajax({
   url:"https://luffy.ee.ncku.edu.tw:7575/get_post",
   type:'post',
   dataType: "json",
   data: JSON.stringify({
    id: localStorage.getItem("object_id")
    }), 
   contentType: "application/json",
   success: function(data){
      console.log(data);
      $("#title").text(data.post.title);
      $("#user").text(data.post.name);
      $("#user_icon").attr("src",data.post.user_icon);
      $("#post_icon").attr("src",data.post.post_icon);
      $("#like").val(data.post.like);
      $("#pen").val(data.post.request);
      $("#content").text(data.post.explanation)
   }
 });
});
