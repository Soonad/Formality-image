const jimp = require('jimp');

var img_formatted = [];

function read_pixel(jimp_image, x, y){
    // 1 pixel = 4
    var pixel_color = jimp.intToRGBA(jimp_image.getPixelColour(x, y));
    var pixel_idx   = jimp_image.getPixelIndex(x, y)/4;
    var pixel = {"index": pixel_idx, "x": x, "y": y, color: pixel_color};
    return pixel;
}

async function read_image(image){
  return await jimp.read(image)
    .then(image => {
      var height = image.getHeight();
      var width  = image.getWidth();
      var pixels = [];
      for(y = 0; y < height; y++){
        for(x = 0; x < width; x++){
          var pixel_info = read_pixel(image, x, y);
          pixels.push(pixel_info);
        }
      }
      return pixels;
    })
    .catch(err => {
      throw err;
    });
}

module.exports = {read_image};