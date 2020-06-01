$(document).ready(function() {
    $.ajax({
        url: '/hot_tag',
        type: 'get',
        dataType: "json",
        contentType: "application/json",
        xhrFields: {
        withCredentials: true
        },
        success: function (data) {        
            console.log(data)
    }})
    var mask = document.getElementsByClassName('background_mask');
    var centered = document.getElementsByClassName('centered');
    for(var i = 0; i < mask.length; i++) {
        (function(index) {
            mask[index].addEventListener("click", function() {
                if (this.classList.contains("background_mask_active")) {
                    this.classList.remove("background_mask_active");
                    this.classList.add("double_click");
                    if(centered[index].classList.contains("centered_click")){
                        centered[index].classList.remove("centered_click");
                    }
                  } else {
                    this.classList.add("background_mask_active");
                    centered[index].classList.add("centered_click");
                    if (this.classList.contains("double_click")) {
                        this.classList.remove("double_click");
                    }
                }
           })
        })(i);
      }
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
    var single = document.getElementsByClassName('single');
    var centered_single = document.getElementsByClassName('centered_single');
    for(var i = 0; i < single.length; i++) {
        (function(index) {
            single[index].addEventListener("click", function() {
                if (this.classList.contains("single_click")) {
                    this.classList.remove("single_click");
                    this.classList.add("double_click");
                    if(centered_single[index].classList.contains("centered_click")){
                        centered_single[index].classList.remove("centered_click");
                    }
                } else {
                    this.classList.add("single_click");
                    centered_single[index].classList.add("centered_click");
                    if (this.classList.contains("double_click")) {
                        this.classList.remove("double_click");
                    }
                }
            })
        })(i);
    }
    var confirm = document.getElementById('confirm');
    confirm.addEventListener("click",function(){
        var tags = new Array();
        var single = new Array();
        var space = new Array();
        var tmp = document.getElementsByClassName('tags_click');
        for(var i = 0; i < tmp.length; i++) {
            (function(index) {
                tags.push(tmp[i].textContent);
            })(i);
        }
        tmp = document.getElementsByClassName('background_mask_active');
        for(var i = 0; i < tmp.length; i++) {
            (function(index) {
                space.push(tmp[i].textContent);
            })(i);
        }
        tmp = document.getElementsByClassName('single_click');
        for(var i = 0; i < tmp.length; i++) {
            (function(index) {
                single.push(tmp[i].textContent);
            })(i);
        }
        console.log(space,single,tags)
        $.ajax({
            url: '/modify_tags',
            type: 'POST',
            dataType: "json",
            contentType: "application/json",
            xhrFields: {
            withCredentials: true
            },
            data: JSON.stringify({
                space:space,
                tags:tags,
                single:single
            }),
            success: function (data) {
                //上傳成功之後，返回物件data         
                console.log(data)
                if(data.success === false){
                    alert("請先登入您的帳號")
                    window.location = '/html/login.html';
                }
                else if(data.success === true){
                    window.location = '/home.html';
                }
        }})
    })
})