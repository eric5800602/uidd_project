// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")
// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
};
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    var formData = new FormData();
    formData.append('picture', cameraSensor.toDataURL("image/webp"));
    $.ajax({
        url: "/upload_image", 
        type: "POST", 
        cache: false,
        contentType: false,
        processData: false,
        data: formData,
        success: function(msg){
            cameraOutput.src = msg.url;
            cameraOutput.classList.add("taken");
            setTimeout(function () {
                $("#div1").css('display','none');
            }, 1000);
            setTimeout(function () {
            $("#posting").css('opacity','1');
            }, 1000);
            setTimeout(function () {
            $("#tag").css('opacity','1');
            }, 1000);
            stream.getTracks().forEach(function(track) {
                track.stop();
              });
                },
        error:function(err){
            cameraOutput.src = cameraSensor.toDataURL("image/webp");
        }
    })
};
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
/*
cameraTrigger.addEventListener("click",function(){
	
})
*/

//上傳照片
$('#file').change(function() {
  var file = $('#file')[0].files[0];
  var reader = new FileReader;
  reader.onload = function(e) {
    
    var formData = new FormData();
    formData.append('picture', e.target.result);
    $.ajax({
        url: "/upload_image", 
        type: "POST", 
        cache: false,
        contentType: false,
        processData: false,
        data: formData,
        success: function(msg){
            cameraOutput.classList.add("taken");
            cameraOutput.src = msg.url;
            setTimeout(function () {
                $("#div1").css('display','none');
            }, 1000);
            setTimeout(function () {
            $("#posting").css('opacity','1');
            }, 1000);
            setTimeout(function () {
            $("#tag").css('opacity','1');
            }, 1000);
            cameraView.srcObject.getTracks().forEach(function(track) {
                track.stop();
              });
                },
        error:function(err){
            cameraOutput.src =  e.target.result;
        }
    })
  };
  reader.readAsDataURL(file);
});
file.onclick = function() {
	
};
 var tags = document.getElementsByClassName('tags')
    for(var i = 0; i < tags.length; i++) {
        (function(index) {
            console.log(i);
            tags[index].addEventListener("click", function() {
                if (this.classList.contains("tags_click")) {
                    this.classList.add("tags_double_click");
                    this.classList.remove("tags_click");
                } else {
                    this.classList.add("tags_click");
                    if (this.classList.contains("tags_double_click")) {
                        this.classList.remove("tags_double_click");
                    }
                }
           })
        })(i);
      }
	  var confirm = document.getElementById('Submit_button');
    confirm.addEventListener("click",function(){
        var tags = new Array();
        var tmp = document.getElementsByClassName('tags_click');
        for(var i = 0; i < tmp.length; i++) {
            (function(index) {
                tags.push(tmp[i].textContent);
            })(i);
        }
		        console.log(tags)
	 $(document).ready(function () {
		 $('#Submit_button').click((event) => {
    $.post({
      url: "https://luffy.ee.ncku.edu.tw:7575/add_post",
      dataType: "json",
      contentType: "application/json",
      xhrFields: {
        withCredentials: true
      },
		data: JSON.stringify({
		space: $("#space").val(),
		room:$("#room").val(),
		pings: $("#pings").val(),
        title: $('#ajax-form input[name=fName]').val(),
        explanation: $('#explanation').val(),
		tags: $('#ajax-form3 input[name=tName]').val(),
		tags:tags,
      }), 
	  
      success: function (msg) {
        console.log(msg);
        if(msg.success){
          console.log("success");
         
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
    })
  })
	 })
	 })
/*
//上傳照片
        var file = $("#file")[0];
        //這裡使用的是onchange事件，所以當你選擇完檔案之後，就觸發事件上傳
        file.onchange = function () {
            //建立一個FormDate
            var formData = new FormData();
            //將檔案資訊追加到其中
            formData.append('file', file.files[0]);
            //利用split切割，拿到上傳檔案的格式
            var src = file.files[0].name,
                formart = src.split(".")[1];
            //使用if判斷上傳檔案格式是否符合                                                          
            if (formart == "jpg" || formart == "png" || formart == "PNG" ||
                formart == "docx" || formart == "txt" ||
                formart == "ppt" || formart == "xlsx" ||
                formart == "zip" || formart == "rar" ||
                formart == "doc") {
                //只有滿足以上格式時，才會觸發ajax請求
                $.ajax({
                    url: '/upload',
                    type: 'POST',
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        //上傳成功之後，返回物件data         
                        if (data.success===true) {
                            var src = data.data;
                            console.log(formart)
                            if (formart == "png" || formart == "jpg") {
                                $('#img').attr('src',src)
                            }
                            console.log(`Url of img: ${data.data}`)
                            // 這裡將msg 追加到你要顯示的區域 
                            localStorage.setItem("url", data.data)
                        }
                    }})
                    //不滿足上傳格式時 
            }
            console.log(sessionStorage.getItem("url"));
        }*/
