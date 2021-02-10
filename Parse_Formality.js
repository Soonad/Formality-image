const fs = require('fs');
var path = require("path");

function image_to_hex(image_name, image_info) {
  var pixels = image_info.pixels;
  var width  = image_info.width;
  var height = image_info.height;
  // For each pixel, use 6 bytes to write the info
  var b = new Buffer.alloc(pixels.length * 6);
  var c = 0;
  var s = z_scale(image_name);
  for(var i = 0; i < pixels.length; i++){
    var pixel = pixels[i];
    if(pixel.color.a !== 0){
      b[c*6]   = pixel.x + (128 - (width / 2));
      b[c*6+1] = s ? pixel.y + (128 - height + 8) : pixel.y + (128 - (height / 2));
      b[c*6+2] = z_index(image_name) + (s ? (height - pixel.y - 1) : 0); // z
      b[c*6+3] = pixel.color.r;
      b[c*6+4] = pixel.color.g;
      b[c*6+5] = pixel.color.b;
      // console.log("i: ", i, pixel.y, height, z_index(image_name), b[c*6+2]);
      c++;
    }
  }
  return b.slice(0, c * 6).toString("hex");
}

// Example
// [
//   [(GRASS, z=1)],
//   [(BUSH_BACK, z=2), (BUSH_FRONT, z=16)]
//   [(HERO, z=4..28), (BUSH_ANIM, z=30)]
// ]

// Return the value of the z_index
const z_index = (image_name) => {
  var z_index = has_z_index(image_name);
  return z_index ? Number(z_index.split("z")[1].replace("p", "")) : 2;
}

// Return true if z_index will scale based on the "y"
const z_scale = (image_name) => {
  var z_index = has_z_index(image_name);
  return z_index ? z_index.includes("p") : false;
}

// Return the match of z_index given a Regex if name have it
const has_z_index = (image_name) => {
  var match = new RegExp("z[0-9]+p?");
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
const file_content = (image_name, folder_name, image_info) => {
  var hex_content = image_to_hex(image_name, image_info);
  var z_index_comment = "// z_index: "+z_index(image_name);
  var scale = z_scale(image_name) ? ", will scale on y\n" : "\n";
  return z_index_comment+scale+"Mons.Assets."+folder_name+"."+term_name(image_name)+": Image3D\n" + 
    '  Image3D.parse("'+hex_content+'")';
}

async function save_fm_file(folder, image_name, content){
  var path = "./fm_images/"+folder+"/"+"Mons.Assets."+folder+"."+term_name(image_name)+".fm";
  // console.log("Will save: ",path);
  try {
    fs.writeFileSync(path, content);
    return "Saved "+path;
  } catch (e) {
    throw e;
  }
}

function make_fm_file(dirname, image_info, image_name){
  var only_name = image_name.slice(0,-4);
  var folder_name = dirname.split("/")[2];
  var content = file_content(only_name, folder_name, image_info);
  // console.log(content);
  return save_fm_file(folder_name, only_name, content);
}

module.exports = { make_fm_file };