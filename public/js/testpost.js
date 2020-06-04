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
            cameraView.srcObject.getTracks().forEach(function(track) {
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
//select

var colleges=['商學院','工學院','建設學院','金融學院','建築專業學院','國際科技與管理學院','資電學院','人文社會學院','理學院','經營管理學院','跨領域設計學院','跨科系學習'];
			var collegeSelect=document.getElementById("college-list");
			var inner="";
			for(var i=0;i<colleges.length;i++){
				inner=inner+'<option value=i>'+colleges[i]+'</option>';
			}
			collegeSelect.innerHTML=inner;
			
			
			var sectors=new Array();
			sectors[0]=['會計學系 ',' 國際經營與貿易學系' ,' 國際經營與貿易學系國際企業管理全英語學士班' ,' 財稅學系' ,' 合作經濟暨社會事業經營學系' ,' 統計學系 ',' 經濟學系' ,' 企業管理學系' ,' 行銷學系' ,' 國際企業管理學士學位學程(英語專班)' ,' 商學進修學士學位學程' ,'財經法律研究所' ,' 科技管理碩士學位學程' ,' 產業碩士專班' ,' 商學專業碩士在職學位學程' ,'商學博士學位學程 '];
			sectors[1]=['機械與電腦輔助工程學系 ',' 纖維與複合材料學系 ',' 工業工程與系統管理學系 ',' 化學工程學系 ',' 航太與系統工程學系 ',' 精密系統設計學士學位學程 ','電聲碩士學位學程 ',' 綠色能源科技碩士學位學程 ',' 創意設計碩士學位學程 ',' 材料與製造工程碩士在職專班 ',' 智能製造與工程管理碩士在職學位學程 ','機械與航空工程博士學位學程 '];	
			sectors[2]=['土木工程學系 ',' 水利工程與資源保育學系 ',' 都市計畫與空間資訊學系 ',' 運輸與物流學系 ',' 土地管理學系 ','景觀與遊憩碩士學位學程 ',' 專案管理碩士在職學位學程 ',' 建設碩士在職學位學程 ','土木水利工程與建設規劃博士學位學程 '];	
			sectors[3]=['風險管理與保險學系 ',' 財務金融學系 ',' 財務工程與精算學士學位學程 ','金融碩士在職學位學程 ','金融博士學位學程 '];
			sectors[4]=['建築專業學院學士班 ',' 建築學士學位學程 ',' 室內設計學士學位學程 ',' 室內設計進修學士班 ',' 創新設計學士學位學程 ',' 建築碩士學位學程 ',' 建築碩士在職學位學程','澳洲墨爾本皇家理工大學商學與創新雙學士學位學程 ','美國聖荷西州立大學商學大數據分析雙學士學位學程 ']
			sectors[5]=['美國普渡大學電機資訊雙學士學位學程 ','西班牙薩拉戈薩大學物流供應鏈管理與創新創業雙碩士學位學程 ','國際經營管理碩士學位學程 '];
			sectors[6]=['資訊工程學系 ',' 電機工程學系 ',' 電子工程學系 ',' 自動控制工程學系 ',' 通訊工程學系',' 資電不分系榮譽班 ','資訊電機工程碩士在職學位學程 ',' 產業研發碩士專班 ',' 生醫資訊暨生醫工程碩士學位學程 ',' 視光科技碩士在職學位學程 ','電機與通訊工程博士學位學程 ',' 智慧聯網產業博士學位學程'];
			sectors[7]=['中國文學系 ',' 外國語文學系 ','歷史與文物研究所 ',' 公共事務與社會創新研究所 '];
			sectors[8]=['應用數學系 ',' 環境工程與科學學系 ',' 材料科學與工程學系 ',' 光電學系 ','微積分教學中心 ',' 物理教學研究中心 '];
			sectors[9]=['經營管理碩士在職學位學程 ',' 電子商務碩士在職專班 '];
			sectors[10]=[];
			sectors[11]=['通識教育中心 ',' 雲端學院 ','外語教學中心 ',' 國語文教學中心 ','全校國際生大一不分系學士班 '];
			function changeCollege(index){
				var Sinner="";
				for(var i=0;i<sectors[index].length;i++){
					Sinner=Sinner+'<option value=i>'+sectors[index][i]+'</option>';
				}
				var sectorSelect=document.getElementById("sector-list");
				sectorSelect.innerHTML=Sinner;
			}
			changeCollege(document.getElementById("college-list").selectedIndex);
