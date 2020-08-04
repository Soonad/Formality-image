const fs = require('fs');
var path = require("path");

function image_to_hex(image_name, image_info) {
  var pixels = image_info.pixels;
  var width  = image_info.width;
  var height = image_info.height;
  // For each pixel, use 6 bytes to write the info
  var b = new Buffer.alloc(pixels.length * 6);
  console.log("z for: ",image_name, z_index(image_name));
  for(var i = 0; i < pixels.length; i++){
    var pixel = pixels[i];
    if(pixel.color.a !== 0){
      b[i*6]   = pixel.x + (128 - (width / 2));
      b[i*6+1] = pixel.y + (128 - (height / 2));
      b[i*6+2] = z_index(image_name); // z
      b[i*6+3] = pixel.color.r;
      b[i*6+4] = pixel.color.g;
      b[i*6+5] = pixel.color.b;
    }
  }
  return b.toString("hex");
}

// Return the value of the z_index
const z_index = (image_name) => {
  var z_index = has_z_index(image_name);
  return z_index ? z_index.split("z")[1] : 16;
}

// Return the match of z_index given a Regex if name have it
const has_z_index = (image_name) => {
  var match = new RegExp("z+[0-9]");
  var match_name = match.exec(image_name);
  return match_name ? match_name[0] : null;
}

// Get a formatted term_name for the file (without z_index)
const term_name = (image_name) => {
  var z_index = has_z_index(image_name);
  var name = image_name.split("_"+z_index)[0];
  return name ? name : image_name;
}

// Content to be on .fm file
const file_content = (image_name, image_info) => {
  var hex_content = image_to_hex(image_name, image_info);
  return "Mons.assets."+term_name(image_name)+": Image3D\n" + 
    '  Image3D.parse("'+hex_content+'")';
}

async function save_fm_file(image_name, content){
  var path = "./fm_images/"+"Mons.assets."+term_name(image_name)+".fm";
  try {
    fs.writeFileSync(path, content);
    return "Saved "+path;
  } catch (e) {
    throw e;
  }
}

function make_fm_file(image_info, image_name){
  var only_name = image_name.slice(0,-4);
  var content = file_content(only_name, image_info);
  // console.log(image_info);
  return save_fm_file(only_name, content);
}

module.exports = { make_fm_file };