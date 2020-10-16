const fs = require('fs');
var path = require("path");
var Image = require("./Image_util.js");

const blocked = { r: 44, g: 51, b: 61, a: 255 }
const map_path = { r: 101, g: 108, b: 127, a: 255 }
const construction = { r: 132, g: 42, b: 88, a: 255 }
const mon = { r: 223, g: 62, b: 70, a: 255 }
const portal = { r: 130, g: 200, b: 172, a: 255 }
const map_path2 = { r: 114, g: 122, b: 142, a: 255 }
const casa0_0 = { r: 118, g: 68, b: 138, a: 255 }
const casa0_1 = { r: 89, g: 86, b: 82, a: 255 }
const casa0_2 = { r: 105, g: 106, b: 106, a: 255 }
const casa1_0 = { r: 174, g: 89, b: 178, a: 255 }
const casa1_1 = { r: 142, g: 74, b: 157, a: 255 }
const casa1_2 = { r: 74, g: 43, b: 113, a: 255 }
const casa1_3 = { r: 52, g: 33, b: 99, a: 255 }
const casa2_0 = { r: 91, g: 110, b: 225, a: 255 }
const casa2_1 = { r: 99, g: 155, b: 255, a: 255 }
const casa2_2 = { r: 95, g: 205, b: 228, a: 255 }
const casa2_3 = { r: 203, g: 219, b: 252, a: 255 }
const casa3_0 = { r: 75, g: 105, b: 47, a: 255 }
const casa3_1 = { r: 82, g: 75, b: 36, a: 255 }
const casa3_2 = { r: 55, g: 148, b: 110, a: 255 }
const casa4_0 = { r: 251, g: 242, b: 54, a: 255 }
const casa4_1 = { r: 217, g: 160, b: 102, a: 255 }
const casa4_2 = { r: 143, g: 86, b: 59, a: 255 }
const casa4_3 = { r: 102, g: 57, b: 48, a: 255 }
const casa5_0 = { r: 215, g: 123, b: 186, a: 255 }
const casa5_1 = { r: 143, g: 151, b: 74, a: 255 }
const casa5_2 = { r: 138, g: 111, b: 48, a: 255 }

const code_reference = { 
  blocked: "bb",
  map_path: ".g",
  construction: "pg",
  mon: "()",
  portal: "ch",
  map_path2: ".n",
  casa0_0: "h0",
  casa0_1: "h1",
  casa0_2: "h2",
  casa1_0: "h3",
  casa1_1: "h4",
  casa1_2: "h5",
  casa1_3: "h6",
  casa2_0: "H0",
  casa2_1: "H1",
  casa2_2: "H2",
  casa2_3: "H3",
  casa3_0: "h7",
  casa3_1: "h8",
  casa3_2: "h9",
  casa4_0: "H4",
  casa4_1: "H5",
  casa4_2: "H6",
  casa4_3: "H7",
  casa5_0: "H8",
  casa5_1: "H9",
  casa5_2: "Ha",
  other: "S0"
}
var image_name = "lvl0.png";

function main(){
  var map_content = "";
  Image.read_image("img/maps/"+image_name)
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
  } else if (is_same_color(pixel.color, construction)) {
    return code_reference.construction;
  } else if (is_same_color(pixel.color, mon)) {
    return code_reference.mon;
  } else if (is_same_color(pixel.color, portal)) {
    return code_reference.portal;
  } else if (is_same_color(pixel.color, map_path2)) {
    return code_reference.map_path2;
  } else if (is_same_color(pixel.color, casa0_0)) {
    return code_reference.casa0_0;
  } else if (is_same_color(pixel.color, casa0_1)) {
    return code_reference.casa0_1;
  } else if (is_same_color(pixel.color, casa0_2)) {
    return code_reference.casa0_2;
  } else if (is_same_color(pixel.color, casa1_0)) {
    return code_reference.casa1_0;
  } else if (is_same_color(pixel.color, casa1_1)) {
    return code_reference.casa1_1;
  } else if (is_same_color(pixel.color, casa1_2)) {
    return code_reference.casa1_2;
  } else if (is_same_color(pixel.color, casa1_3)) {
    return code_reference.casa1_3;
  } else if (is_same_color(pixel.color, casa2_0)) {
    return code_reference.casa2_0;
  } else if (is_same_color(pixel.color, casa2_1)) {
    return code_reference.casa2_1;
  } else if (is_same_color(pixel.color, casa2_2)) {
    return code_reference.casa2_2;
  } else if (is_same_color(pixel.color, casa2_3)) {
    return code_reference.casa2_3;
  } else if (is_same_color(pixel.color, casa3_0)) {
    return code_reference.casa3_0;
  } else if (is_same_color(pixel.color, casa3_1)) {
    return code_reference.casa3_1;
  } else if (is_same_color(pixel.color, casa3_2)) {
    return code_reference.casa3_2;
  } else if (is_same_color(pixel.color, casa4_0)) {
    return code_reference.casa4_0;
  } else if (is_same_color(pixel.color, casa4_1)) {
    return code_reference.casa4_1;
  } else if (is_same_color(pixel.color, casa4_2)) {
    return code_reference.casa4_2;
  } else if (is_same_color(pixel.color, casa4_3)) {
    return code_reference.casa4_3;
  } else if (is_same_color(pixel.color, casa5_0)) {
    return code_reference.casa5_0;
  } else if (is_same_color(pixel.color, casa5_1)) {
    return code_reference.casa5_1;
  } else if (is_same_color(pixel.color, casa5_2)) {
    return code_reference.casa5_2;
  } else {
    return code_reference.other;
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