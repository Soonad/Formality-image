const fs = require('fs');

async function write_file(path, contents){

}

function image_to_hex(image_array){
  // console.log("Format image: ", image_array);
  var b = new Buffer.alloc(2 * 6); //new Buffer.alloc(image_array.length * 6);
  for(var i=0; i < image_array.length; i++){
    var pixel = image_array[i];
    // var b = format_pixel_buffer(image_array[i]);
    b[i]   = pixel.x;
    b[i+1] = pixel.y;
    b[i+2] = 0;
    b[i+3] = pixel.color.r;
    b[i+4] = pixel.color.g;
    b[i+5] = pixel.color.b;
  }
  var hex = b.toString("hex");
  return hex;

}
/* 
{ index: number,
  x: number, 
  y: number, 
  color: {
    r: number,
    g: number,
    b: number,
    a: number
}} 
*/
function format_pixel_buffer(pixel){
  // 3D image size in Formality = 256 x 256
  const x_center = 128, y_center = 128, z_center = 0
  var b = new Buffer.alloc(6);
  b[0] = pixel.x;
  b[1] = pixel.y;
  b[2] = 0;
  b[3] = pixel.color.r;
  b[4] = pixel.color.g;
  b[5] = pixel.color.b;
  return b;
}

module.exports = {image_to_hex};