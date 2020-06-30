var htmlItems = '';
var productData = [];
var editNum = 1;
var axisX = 0, axisY = 0, rank = 0;
var options = {
  selected_symbol_type: 'utf8_star', // Must be a key from symbols
  max_value: 5,
  step_size: 1,
  initial_value: rank

};
var serverUrl = 'https://luffy.ee.ncku.edu.tw:7575/'

//單品敘述
$(document).ready(function () {

  $.ajax({
    type: 'POST',
    url: serverUrl + 'get_post_image',
    dataType: 'json',
    data: {
      id: '5efa0614bb4c462c15abad46'
    },
    success: function (resData) {
      console.log('resData => ', resData);
      $('#myimage').attr('src', serverUrl + resData.url);
    }
  });

  htmlItems += '<div id="original1" class="img-zoom-result mouseAxis' + editNum + '" style="display: inline-block;"><img src="" /></div>';
  $("#imgblock").html(htmlItems);

  //找單品
  window.is_myimage_touching = false;
  var MYIMAGE_SELECTOR = '#myimage', $myimage = $(MYIMAGE_SELECTOR), myimageOffset = $myimage.offset();
  $(document).on('touchstart touchend', MYIMAGE_SELECTOR, function (e) {
    window.is_myimage_touching = e.type === 'touchstart';
  });
  //$('.img-zoom-result').css('background-image',$myimage.attr('src'));
  //window.is_handle_myimage_touching = false;

  
  $(document).on('touchmove', MYIMAGE_SELECTOR, function (e) {
    //if(!window.is_myimage_touching){return;}
    //if(window.is_handle_myimage_touching){return;}
    //window.is_handle_myimage_touching = true;
    var $imgzoomresult = $('.mouseAxis' + editNum );
    console.log(e.touches[0].clientX, e.touches[0].clientY, myimageOffset.top, myimageOffset.left);
    var tmp = e.touches[0];
    var x = tmp.clientX - 50; ///window.innerWidth; // - myimageOffset.left + 0*$imgzoomresult.width()/2;
    var y = (tmp.clientY - myimageOffset.top - 20 - window.innerHeight * 0.04); // *(window.innerWidth/375); // - myimageOffset.top + 0*$imgzoomresult.height()/2;
    console.log(x, y);
    axisX = x;
    axisY = y;
    console.log("111");
    var haha = $imgzoomresult.find('img').css({ top: -y, left: -x }).attr('src', $myimage.attr('src'));
    console.log(haha);
    //window.is_handle_myimage_touching = false;
    //新增圖片框
   
  });
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
    $("#productName").val('');
    $("#remark").val('');
    $(".rating").rate("setValue", 0);
    console.log(productData);
    editNum += 1;
    $.ajax({
      type: 'POST',
      url: "https://luffy.ee.ncku.edu.tw:7575/add_single",
      dataType: 'json',
      data: {
        x: axisX,
      y: axisY,
      name: $("#productName").val(),
       evaluation:rank,
       description: $('#remark').val()
      },
      success: function (msg) {
        console.log(msg);
        if (msg.success) {
         console.log("success");
        }
      }
    });
    htmlItems += '<div id="original' + editNum + '" class="img-zoom-result mouseAxis' + editNum + '" style="display: inline-block;"><img src="" /></div>';
    $("#imgblock").html(htmlItems);
    

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
