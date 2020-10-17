const fs = require('fs');
var path = require("path");
var Image = require("./Image_util.js");

const map_info = [
  { name: "blocked", code: "bb", color: { r: 36, g: 33, b: 38, a: 255 }},
  { name: "brick_floor", code: ".g", color: { r: 119, g: 126, b: 146, a: 255 }},
  { name: "grass_0", code: ".n", color: { r: 52, g: 110, b: 116, a: 255} }, // clean grass
  { name: "grass_1", code: ".b", color: { r: 130, g: 200, b: 172, a: 255} }, // grass
  { name: "grass_2", code: ".v", color: { r: 73, g: 143, b: 135, a: 255} }, // mini bush grass
  
  { name: "house0_0", code: "z0", color: { r: 250, g: 100, b: 47, a: 255 } },
  { name: "house0_1", code: "z1", color: { r: 239, g: 169, b: 63, a: 255 } },
  { name: "house0_2", code: "z2", color: { r: 251, g: 232, b: 150, a: 255 } },

  { name: "house1_0", code: "x0", color: { r: 159, g: 91, b: 68, a: 255 } },
  { name: "house1_2", code: "x1", color: { r: 95, g: 25, b: 52, a: 255 } },
  { name: "house1_3", code: "x2", color: { r: 140, g: 11, b: 44, a: 255 } },
  { name: "house1_4", code: "x3", color: { r: 162, g: 36, b: 44, a: 255 } },

  // 1st floor
  { name: "house2a_0", code: "c0", color: { r: 132, g: 42, b: 88, a: 255 } },
  { name: "house2a_1", code: "c1", color: { r: 160, g: 59, b: 97, a: 255 } },
  { name: "house2a_2", code: "c2", color: { r: 191, g: 80, b: 108, a: 255 } },
  { name: "house2a_3", code: "c3", color: { r: 219, g: 97, b: 118, a: 255 } },
  // 2nd floor
  { name: "house2b_0", code: "d0", color: { r: 172, g: 73, b: 153, a: 255 } },
  { name: "house2b_1", code: "d1", color: { r: 199, g: 87, b: 166, a: 255 } },
  { name: "house2b_2", code: "d2", color: { r: 250, g: 131, b: 169, a: 255 } },
  { name: "house2b_3", code: "d3", color: { r: 113, g: 30, b: 81, a: 255 } },

  // 1st floor
  { name: "house3a_0", code: "v0", color: { r: 70, g: 98, b: 161, a: 255 } },
  { name: "house3a_1", code: "v1", color: { r: 81, g: 118, b: 184, a: 255 } },
  { name: "house3a_2", code: "v2", color: { r: 121, g: 156, b: 211, a: 255 } },
  // 2nd floor
  { name: "house3b_0", code: "f0", color: { r: 39, g: 41, b: 96, a: 255 } },
  { name: "house3b_1", code: "f1", color: { r: 47, g: 55, b: 112, a: 255 } },
  { name: "house3b_2", code: "f2", color: { r: 57, g: 76, b: 135, a: 255 } },

  { name: "house4_0", code: "b0", color: { r: 185, g: 107, b: 51, a: 255 } },
  { name: "house4_1", code: "b1", color: { r: 204, g: 131, b: 60, a: 255 } },
  { name: "house4_2", code: "b2", color: { r: 210, g: 150, b: 67, a: 255 } },
  { name: "house4_3", code: "b3", color: { r: 218, g: 176, b: 77, a: 255 } },

   // 1st floor
   { name: "house5a_0", code: "n0", color: { r: 231, g: 220, b: 193, a: 255 } },
   { name: "house5a_1", code: "n1", color: { r: 95, g: 53, b: 56, a: 255 } },
   { name: "house5a_2", code: "n2", color: { r: 111, g: 64, b: 59, a: 255 } },
   // 2nd floor
   { name: "house5b_0", code: "h0", color: { r: 174, g: 147, b: 121, a: 255 } },
   { name: "house5b_1", code: "h1", color: { r: 187, g: 163, b: 138, a: 255 } },
   { name: "house5b_2", code: "h2", color: { r: 202, g: 184, b: 157, a: 255 } },

  // Other objects
  { name: "fountain", code: "ft", color: {r: 142, g: 74, b: 157, a: 255} },
  { name: "crytal", code: "ct", color: {r: 199, g: 200, b: 92, a: 255} },

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
  return code === "" ? "S0" : code;
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