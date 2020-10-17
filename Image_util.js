const jimp = require('jimp');
const fs = require('fs');

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
async function read_image(image_path){
  return await jimp.read(image_path)
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

async function read_big_image(image_path){
  return await jimp.read(image_path)
    .then(image => {
      const height = image.getHeight();
      const width  = image.getWidth();
      const width_small = width/16;
      const height_small = height/16;
      var pixels = [];
      for(var y = 0; y < height; y += 16){
        for(var x = 0; x < width; x += 16){
          var pixel_info = read_pixel(image, (x + 8), (y + 8));
          pixels.push(pixel_info);
        }
      }
      return {pixels, width: width_small, height: height_small};
    })
    .catch(err => {
      throw err;
    });
}

// Rename images downloaded from 
// https://www.imgonline.com.ua/eng/cut-photo-into-pieces.php
// - folder: a path to a folder
// - image_name: new name for the images
// - width : amount of tiles cut in the horizontal
// - height: amount of tiles cut in the vertical
// Ex: image of 64x32 cut in tiles of 16x16 gives 4 horizontal tiles 
// and 2 vertical
function rename_images(folder, image_name, width, height){
  var files = fs.readdirSync(folder);
  console.log("Renaming images in: "+folder);
  var new_names = [];

  for(var i = 0; i < width; i++){
    for(var j = 0; j < height; j++){
      var new_name = image_name+"_"+i+""+j+".png";
      new_names.push(new_name);
    }
  }
  
  for(var i = 0; i < files.length; i++){
    // console.log(folder+files[i]);
    fs.rename(folder+files[i], folder+new_names[i], (error) => {
      var output = error ? error : "File renamed! "+files[i]+" -> "+new_names[i];
      console.log(output);
    });
  }

}

module.exports = { read_image, rename_images, read_big_image };