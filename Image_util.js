const jimp = require('jimp');

function read_pixel(jimp_image, x, y){
    var pixel_color = jimp.intToRGBA(jimp_image.getPixelColour(x, y));
    var pixel_idx   = jimp_image.getPixelIndex(x, y)/4;
    var pixel = {"index": pixel_idx, "x": x, "y": y, color: pixel_color};
    return pixel;
}

/*
  Return the formated pixel for the image
  - image: a path to a image
  - return: a format like 
    {pixel: { index: 1, x: 1, y: 1, color: { r: 255, g: 255, b: 255, a: 255 },
     width: 16, 
     height: 16}
*/
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
      return {pixels, width, height};
    })
    .catch(err => {
      throw err;
    });
}

module.exports = { read_image };