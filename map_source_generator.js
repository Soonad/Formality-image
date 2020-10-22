const fs = require('fs');
var path = require("path");
var Image = require("./Image_util.js");

const map_info = [
  { name: "mid_city_0_1", code: "c0", color: { r: 36, g: 33, b: 38, a: 255 }},
  { name: "mid_city_0_2", code: "c1", color: { r: 0, g: 0, b: 0, a: 255 }},
  { name: "mid_city_1_0", code: "c2", color: { r: 73, g: 77, b: 94, a: 255 }}

]

var image_name = "lvl0.png";
const is_big_img = true;

function main(){
  if (is_big_img) {
    Image.read_big_image("img/maps/"+image_name)
    .then( image_info => { 
      const map_content = set_content(image_info, map_info)
      save_fm_file(image_name, map_content)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    })
    .catch( err => console.warn(err));

  } else {
    Image.read_image("img/maps/"+image_name)
    .then( image_info => {
      const map_content = set_content(image_info, map_info)
      save_fm_file(image_name, map_content)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    })
    .catch( err => console.warn(err));
  }
}
// "index.js: got an error of MIME for Buffer from Jimp"

function set_content(image_info, map_info){
  // Image_info: 74x74
  var map_content = "";
  var line = "";
  const pixels = image_info.pixels;
  pixels.forEach( pixel => {
    line += color_is_equal(pixel, map_info);
    if (is_full_line(line, image_info.width)){
      map_content += '"'+line+'",\n';
      line = "";
    }
  })
  return map_content;
}

function is_same_color(pixel, color) {
  return pixel.r === color.r && pixel.g === color.g && pixel.b === color.b;
}

function color_is_equal(pixel, map_info){
  let code = "";
  for (var i = 0; i < map_info.length; i++) {
    let obj = map_info[i];
    code += is_same_color(pixel.color, obj.color) ? obj.code : ""
  }
  return code === "" ? 
    "xx" // transparent bg or unidentified color
    : code;
}

function is_full_line(line, width){
  return line.length === width*2 ? true : false; // x2 = code os 2 characteres
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