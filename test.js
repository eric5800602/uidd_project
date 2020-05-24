var Jimp = require('jimp');
var crypto = require('crypto');
function image_crop(x,y){
    width = 50;
    height = 50;
    Jimp.read('./public/image/post/page_prev__zh_tw_15713869350.jpeg')
    .then(image => {
        var w = image.bitmap.width/256;
        var h = image.bitmap.height/256;
        var store = crypto.randomBytes(16).toString('hex');
        var extension = image.getExtension();
        console.log(store,extension);
        return image
        .crop(x-25*w,y-25*h,50*w,50*h)
        .write('./public/image/post/'+store+'.'+extension);
    })
    .catch(err => {
        console.error(err);
    });
}
image_crop(643,399.0749969482422);