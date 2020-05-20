$(document).ready(function() {
    var mask = document.getElementsByClassName('background_mask')
    for(var i = 0; i < mask.length; i++) {
        (function(index) {
            mask[index].addEventListener("click", function() {
                if (this.classList.contains("background_mask_active")) {
                    this.classList.remove("background_mask_active");
                  } else this.classList.add("background_mask_active");
           })
        })(i);
      }
    var tags = document.getElementsByClassName('tags')
    for(var i = 0; i < mask.length; i++) {
        (function(index) {
            tags[index].addEventListener("click", function() {
                if (this.classList.contains("tags_click")) {
                    this.classList.remove("tags_click");
                  } else this.classList.add("tags_click");
           })
        })(i);
      }
    var tags = document.getElementsByClassName('single')
    for(var i = 0; i < mask.length; i++) {
        (function(index) {
            tags[index].addEventListener("click", function() {
                if (this.classList.contains("single_click")) {
                    this.classList.remove("single_click");
                } else this.classList.add("single_click");
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
                console.log(data);
        }})
    })
})