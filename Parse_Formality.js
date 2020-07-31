const fs = require('fs');
var path = require("path");

function image_to_hex(image_info) {
  // For each pixel, use 6 bytes to write the info
  var b = new Buffer.alloc(image_info.length * 6);
  // console.log("Info: ", image_info);
  for(var i = 0; i < image_info.length; i++){
    console.log(i);
    var pixel = image_info[i];
    b[i*6]   = pixel.x + 120;
    b[i*6+1] = pixel.y + 120;
    b[i*6+2] = 0; // z
    b[i*6+3] = pixel.color.r;
    b[i*6+4] = pixel.color.g;
    b[i*6+5] = pixel.color.b;
  }
  return b.toString("hex");
}

const file_content = (image_name, image_info) => {
  var hex_content = image_to_hex(image_info);
  return "Asset."+image_name+": VoxModel\n" + 
    '  VoxModel.parse("'+hex_content+'")';
}

async function save_fm_file(image_name, content){
  var path = "./fm_images/"+image_name+".fm";
  try {
    console.log("Saved "+path);
    fs.writeFileSync(path, content);
  } catch (e) {
    console.log("I couldn't save the file");
  }
}

function make_fm_file(image_info, image_name){
  var only_name = image_name.slice(0,-4);
  var content = file_content(only_name, image_info);
  // console.log(content);
  save_fm_file(only_name, content);
}

module.exports = {make_fm_file};