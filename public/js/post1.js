
//放大圖片
/*function imageZoom(imgID, resultID) {
  var img, lens, result, cx, cy;
  img = document.getElementById(imgID);
  result = document.getElementById(resultID);
  //create lens:
  lens = document.createElement("DIV");
  lens.setAttribute("class", "img-zoom-lens");
  //insert lens:
  img.parentElement.insertBefore(lens, img);
  //calculate the ratio between result DIV and lens:
  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight;
  //set background properties for the result DIV:
  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
  //execute a function when someone moves the cursor over the image, or the lens:
  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens)
  //and also for touch screens:
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);
  function moveLens(e) {
    var pos, x, y;
    //prevent any other actions that may occur when moving over the image:
    e.preventDefault();
    //get the cursor's x and y positions:
    pos = getCursorPos(e);
    //calculate the position of the lens:
    x = pos.x - (lens.offsetWidth / 2);
    y = pos.y - (lens.offsetHeight / 2);
    //prevent the lens from being positioned outside the image:
    if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
    if (x < 0) {x = 0;}
    if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
    if (y < 0) {y = 0;}
    //set the position of the lens:
    lens.style.left = x + "px";
    lens.style.top = y + "px";
    //display what the lens "sees":
    result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
  }
  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    //get the x and y positions of the image:
    a = img.getBoundingClientRect();
    //calculate the cursor's x and y coordinates, relative to the image:
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    //consider any page scrolling:
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }

}
imageZoom("myimage", "myresult");
*/

//單品敘述
$(document).ready(function () {
 /* $('#ajax-form button[type="submit"]').click((event) => {
    event.preventDefault()
    $.post({
      url: "http://luffy.ee.ncku.edu.tw:7575/add_post",
      dataType: "json",
      data: JSON.stringify({
        username: $('#ajax-form input[name=fName]').val(),
       evaluation: $('#evaluation').val(),
	   description: $('#ajax-form2 input[name=dName]').val()
      }), 
      contentType: "application/json",
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      },
      success: function (msg) {
        console.log(msg);
        if(msg.success){
			 console.log("success");
	 }
		 
        }
        else{
          console.log("fail");
          //window.location.href = "https://luffy.ee.ncku.edu.tw:7575/html/home.html";
          alert(msg.text);
        }
      },
      error: function(data){
        console.log("fail");
        console.log(data);
      }
      },
    )
  })
 });*/
 
 /*$('#myimage').click.function(){
	 $('.img-zoom-result').css('backgroundImage' , 'url("'../res/post1.png'")');
 })*/
 
 //放大圖片
 /*
 $(document).on("id_content",function(){
  $("#myimage").on("swipe",function(){
    $(".img-zoom-result").css(
  });                       
});
*/
window.is_myimage_touching = false;
var MYIMAGE_SELECTOR = '#myimage', $myimage = $(MYIMAGE_SELECTOR), myimageOffset = $myimage.offset();
$(document).on('touchstart touchend', MYIMAGE_SELECTOR, function(e){
	window.is_myimage_touching = e.type==='touchstart';
});
//$('.img-zoom-result').css('background-image',$myimage.attr('src'));
window.is_handle_myimage_touching=false;
var $imgzoomresult = $('.img-zoom-result');
$(document).on('touchmove',MYIMAGE_SELECTOR,function(e){
	//if(!window.is_myimage_touching){return;}
	//if(window.is_handle_myimage_touching){return;}
	window.is_handle_myimage_touching=true;
	console.log(e.touches[0].clientX, e.touches[0].clientY, myimageOffset.top, myimageOffset.left);
	var tmp = e.touches[0];
	var x = tmp.clientX - 100; ///window.innerWidth; // - myimageOffset.left + 0*$imgzoomresult.width()/2;
	var y = (tmp.clientY-myimageOffset.top - 100 - window.innerHeight*0.04); // *(window.innerWidth/375); // - myimageOffset.top + 0*$imgzoomresult.height()/2;
	console.log(x,y);
	$imgzoomresult.find('img').css({top:-y, left:-x}).attr('src',$myimage.attr('src'));
	window.is_handle_myimage_touching=false;
});


 		 $('#addsingle').click((event) => {
			 
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
        if(msg.success){
          console.log("success");        
        }
        else{
          console.log("fail");
          alert(msg.text);
        }
      },
      error: function(data){
        console.log("fail");
        console.log(data);
      }
    })
  })
  });
 
 //評價

  
