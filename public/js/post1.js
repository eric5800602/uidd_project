var htmlItems = '';
var productData = [];
var editNum = 1;
var complete = false;
var axisX = 0, axisY = 0, rank = 0;
var options = {
  selected_symbol_type: 'utf8_star', // Must be a key from symbols
  max_value: 5,
  step_size: 1,
  initial_value: rank

};
var serverUrl = 'https://luffy.ee.ncku.edu.tw:7575/'
function isNull( str ){
  if ( str == "" ||str == undefined) return true;
  str = str.replace(/\s+/g, '');
  if(str.length == 0) return true;
  else return false;
}
//單品敘述
$(document).ready(function () {
  if(!localStorage.getItem('add_post_id')){
    alert("請從正常路徑進入此頁面");
    window.location= "./home.html"
  }
  $.ajax({
    type: 'POST',
    url: serverUrl + 'get_post_image',
    dataType: 'json',
    data: {
      id: localStorage.getItem('add_post_id')
    },
    success: function (resData) {
      console.log('resData => ', resData);
      $('#myimage').attr('src', serverUrl + resData.url);
    }
  });

  htmlItems += '<div id="original1" class="img-zoom-result mouseAxis' + editNum + '" style="display: inline-block;"><img src="" /></div>';
  $("#imgblock").html(htmlItems);
  document.getElementById('dot1').style.top = `-${document.getElementById('myimage').clientHeight-20}px`;
  //找單品
  window.is_myimage_touching = false;
  var MYIMAGE_SELECTOR = '#myimage', $myimage = $(MYIMAGE_SELECTOR), myimageOffset = $myimage.offset();
  $(document).on('touchstart touchend', MYIMAGE_SELECTOR, function (e) {
    window.is_myimage_touching = e.type === 'touchstart';
  });
  //$('.img-zoom-result').css('background-image',$myimage.attr('src'));
  //window.is_handle_myimage_touching = false;
  document.getElementById('productName').addEventListener('change',function(){
    var dia = document.getElementById(`dialog${editNum}`);
    dia.innerText = document.getElementById('productName').value;
  })
  
  $(document).on('touchmove', MYIMAGE_SELECTOR, function (e) {
    //if(!window.is_myimage_touching){return;}
    //if(window.is_handle_myimage_touching){return;}
    //window.is_handle_myimage_touching = true;
    document.body.style.overflowY = "hidden";
    var $imgzoomresult = $('.mouseAxis' + editNum );
    var dot = document.getElementById(`dot${editNum}`);
    console.log(e.touches[0].clientX, e.touches[0].clientY, myimageOffset.top, myimageOffset.left);
    var tmp = e.touches[0];
    var x = tmp.clientX - 50; ///window.innerWidth; // - myimageOffset.left + 0*$imgzoomresult.width()/2;
    var y = (tmp.clientY - myimageOffset.top - 20 - window.innerHeight * 0.04); // *(window.innerWidth/375); // - myimageOffset.top + 0*$imgzoomresult.height()/2;
    console.log(x, y);
    axisX = x;
    axisY = y;
    var haha = $imgzoomresult.find('img').css({ top: -y, left: -x }).attr('src', $myimage.attr('src'));
    dot.style.top = `${-document.getElementById('myimage').clientHeight+y+8+39}px`;
    dot.style.left = `${x+34}px`;
    $imgzoomresult.find('img').css('max-height','50vh');
    console.log(haha);
    //window.is_handle_myimage_touching = false;
    //新增圖片框
  });
  $(document).on('touchend', MYIMAGE_SELECTOR, function (e) {
    document.body.style.overflowY = "scroll";
  });
  document.getElementById('complete').addEventListener('click', function(){
    if(document.getElementById(`original${editNum}`).childNodes[0].getAttribute('src')){
      complete = true;
      $("#addsingle").click();
    }
    else{
      $.ajax({
        type: 'POST',
        url: 'https://luffy.ee.ncku.edu.tw:7575/deploy_post',
        dataType: 'json',
        data: {
          id: localStorage.getItem('add_post_id')
        },
        success: function (resData) {
          alert('已成功發文')
        }
      });
      localStorage.removeItem('post2_url');
      localStorage.setItem('post_id',localStorage.getItem('add_post_id'));
      window.location= "./post.html";
    }
  })
  $("#addsingle").on('click', function () {
    
   // $("#original" + editNum).removeClass("mouseAxis");
    htmlItems = $("#imgblock").html();
    productData.push({
      axisX: axisX,
      axisY: axisY,
      name: $("#productName").val(),
      remark: $("#remark").val(),
      rank: rank
    });
    if(!axisX||!axisY||!document.getElementById(`original${editNum}`).childNodes[0].getAttribute('src')){
      alert('您還沒點選你想要新增的單品位置喔!');
    }
    else if(isNull($("#productName").val())){
      alert('單品名稱為空或有不可用字元')
    }
    else if(isNull($('#remark').val())){
      alert('說明為空或有不可用字元')
    }
    else{
      var temp = editNum;
      targety = -parseInt(document.getElementById(`original${temp}`).childNodes[0].style.top)+parseInt(window.getComputedStyle(document.getElementById("myimage")).getPropertyValue("padding-top"))/2+39;
      targetx = -parseInt(document.getElementById(`original${temp}`).childNodes[0].style.left)+39;
      targety < 0 ? targety = 0 : targety = targety;
      targetx < 0 ? targetx = 0 : targetx = targetx;
      $.ajax({
        type: 'POST',
        url: "https://luffy.ee.ncku.edu.tw:7575/cropimage",
        dataType: 'json',
        data:{
          url:document.getElementById('myimage').getAttribute('src').split(serverUrl)[1],
          x:targetx,
          y:targety,
          width:document.getElementById('myimage').clientWidth,
          height:document.getElementById('myimage').clientHeight,
          target_w:75,
          target_h:75
        },
        success:function (msg) {
          if(msg.success){
            document.getElementById(`original${temp}`).childNodes[0].setAttribute('src',msg.url);
            document.getElementById(`original${temp}`).childNodes[0].removeAttribute("style");
            $(`#original${temp}`).children().css("max-width","100%");
            $(`#original${temp}`).children().css("max-height","100%");
            $.ajax({
              type: 'POST',
              url: "https://luffy.ee.ncku.edu.tw:7575/add_single",
              dataType: 'json',
              data: {
                x: targetx,
                y: targety,
                name: $("#productName").val(),
                evaluation:rank,
                description: $('#remark').val(),
                postid:localStorage.getItem('add_post_id'),
                img:msg.url
              },
              success: function (msg) {
                console.log(msg);
                if (msg.success) {
                console.log("success");
                }
                  $("#productName").val('');
                  $("#remark").val('');
                  $(".rating").rate("setValue", 0);
                  editNum += 1;
                  htmlItems += '<div id="original' + editNum + '" class="img-zoom-result mouseAxis' + editNum + '" style="display: inline-block;"><img src="" /></div>';
                  $("#imgblock").html(htmlItems);
                  var a = document.createElement('div'),dia = document.createElement('div');
                  a.id = `dot${editNum}`;dia.id = `dialog${editNum}`;
                  a.className = "dot";dia.className = "text_dialog";
                  a.style.top = `-${document.getElementById('myimage').clientHeight-20}px`;
                  dia.innerText = "標註你想要描述的單品";
                  a.append(dia);
                  document.getElementById('image_content').append(a);
                  var old_element = document.getElementById("productName");
                  var new_element = old_element.cloneNode(true);
                  old_element.parentNode.replaceChild(new_element, old_element);
                  document.getElementById('productName').addEventListener('change',function(){
                    var dia = document.getElementById(`dialog${editNum}`);
                    dia.innerText = document.getElementById('productName').value;
                  })
                  if(complete){
                    $.ajax({
                      type: 'POST',
                      url: 'https://luffy.ee.ncku.edu.tw:7575/deploy_post',
                      dataType: 'json',
                      data: {
                        id: localStorage.getItem('add_post_id')
                      },
                      success: function (resData) {
                        alert('已成功發文')
                      }
                    });
                    localStorage.removeItem('post2_url');
                    localStorage.setItem('post_id',localStorage.getItem('add_post_id'));
                    window.location= "./post.html";
                  }
                },
              error: function(err){
                console.log(err);
                alert('發生錯誤，請洽工作人員');
              }
            });
          }else{
            alert('圖片錯誤了，請洽工作人員')
          }
        }
      });
    }
  });


});

/* $('.submit_button').click((event) => {
   $.post({
    url: "https://luffy.ee.ncku.edu.tw:7575/add_single",
     dataType: "json",
     contentType: "application/json",
     xhrFields: {
       withCredentials: true
     },
     data: JSON.stringify({
       username: $('#ajax-form input[name=fName]').val(),
       evaluation: $('#evaluation').val(),
       description: $('#ajax-form2 input[name=dName]').val()
     }),
     success: function (msg) {
       console.log(msg);
       if (msg.success) {
        console.log("success");
       }
       else {
         console.log("fail");
         alert(msg.text);
       }
     },
     error: function (data) {
       console.log("fail");
       console.log(data);
     }
   })
 });
 */

//評價
$(".rating").rate(options);

$(".rating").on("change", function (ev, data) {
  rank = data.to;
});
//返回
$('#back').click(function(){
    window.location= "./home.html"
  })
