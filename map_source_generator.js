const fs = require('fs');
var path = require("path");
var Image = require("./Image_util.js");

const blocked = { r: 44, g: 51, b: 61, a: 255 }
const map_path = { r: 101, g: 108, b: 127, a: 255 }
const others = { r: 132, g: 42, b: 88, a: 255 }

const code_reference = { 
  blocked: "bb",
  map_path: ".g",
  others: "pg"
}
var image_name = "lvl0.png";

function main(){
  var map_content = "";
  Image.read_image("temp/"+image_name)
  .then( image_info => {
    const pixels = image_info.pixels;
    var line = "";
    pixels.forEach( pixel => {
      line += get_color_is_equal(pixel, code_reference);
      if (is_full_line(line, image_info.width)){
        map_content += '"'+line+'",\n';
        line = "";
      }
    })
    save_fm_file(image_name, map_content)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  })
  .catch( err => console.warn("index.js: got an error of MIME for Buffer from Jimp"));
}

function is_same_color(pixel, color) {
  return pixel.r === color.r && pixel.g === color.g && pixel.b === color.b;
}

function get_color_is_equal(pixel, code_reference){
  if (is_same_color(pixel.color, blocked)){
    return code_reference.blocked;
  } else if (is_same_color(pixel.color, map_path)) {
    return code_reference.map_path;
  } else if (is_same_color(pixel.color, others)) {
    return code_reference.others;
  } else {
    return "._";
  }
}

function is_full_line(line, width){
  return line.length === width*2 ? true : false;
}

async function save_fm_file(image_name, content){
  var image_name = image_name.slice(0,-4);
  var path = "./fm_images/map_code/"+image_name+".fm";
  var content = content;
  try {
    fs.writeFileSync(path, content);
    return "Saved "+path;
  } catch (e) {
    throw e;
  }
}

main()