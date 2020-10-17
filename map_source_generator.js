const fs = require('fs');
var path = require("path");
var Image = require("./Image_util.js");

// const blocked = { r: 0, g: 0, b: 0, a: 255 }
// const map_path = { r: 101, g: 108, b: 127, a: 255 }
// const construction = { r: 132, g: 42, b: 88, a: 255 }
// const mon = { r: 223, g: 62, b: 70, a: 255 }
// const portal = { r: 130, g: 200, b: 172, a: 255 }
// const map_path2 = { r: 114, g: 122, b: 142, a: 255 }

// const grass_0 = { r: 52, g: 110, b: 116, a: 255} // clean grass
// const grass_1 = { r: 130, g: 200, b: 172, a: 255} // grass
// const grass_2 = { r: 73, g: 143, b: 135, a: 255} // mini bush grass

// const casa0_0 = { r: 250, g: 100, b: 47, a: 255 }
// const casa0_1 = { r: 239, g: 169, b: 63, a: 255 }
// const casa0_2 = { r: 251, g: 232, b: 150, a: 255 }

// h3-h6
// const casa1_0 = { r: 159, g: 91, b: 68, a: 255 }
// const casa1_1 = { r: 95, g: 25, b: 52, a: 255 }
// const casa1_2 = { r: 140, g: 11, b: 44, a: 255 }
// const casa1_3 = { r: 162, g: 36, b: 44, a: 255 }

// >> H0 - H3
// 1st floor
// const casa2a_0 = { r: 132, g: 42, b: 88, a: 255 }
// const casa2a_1 = { r: 160, g: 59, b: 97, a: 255 }
// const casa2a_2 = { r: 191, g: 80, b: 108, a: 255 }
// const casa2a_3 = { r: 219, g: 97, b: 118, a: 255 }
// 2nd floor
// const casa2b_0 = { r: 172, g: 73, b: 153, a: 255 }
// const casa2b_1 = { r: 199, g: 87, b: 166, a: 255 }
// const casa2b_2 = { r: 250, g: 131, b: 169, a: 255 }
// const casa2b_3 = { r: 113, g: 30, b: 81, a: 255 }

// h7-h9
// 1st floor
// const casa3a_0 = { r: 70, g: 98, b: 161, a: 255 }
// const casa3a_1 = { r: 81, g: 118, b: 184, a: 255 }
// const casa3a_2 = { r: 121, g: 156, b: 211, a: 255 }
// // 2n floor
// const casa3b_0 = { r: 39, g: 41, b: 96, a: 255 }
// const casa3b_1 = { r: 47, g: 55, b: 112, a: 255 }
// const casa3b_2 = { r: 57, g: 76, b: 135, a: 255 }

// H4-H7
// const casa4_0 = { r: 185, g: 107, b: 51, a: 255 }
// const casa4_1 = { r: 204, g: 131, b: 60, a: 255 }
// const casa4_2 = { r: 210, g: 150, b: 67, a: 255 }
// const casa4_3 = { r: 218, g: 176, b: 77, a: 255 }

// 1st floor
// const casa5a_0 = { r: 231, g: 220, b: 193, a: 255 }
// const casa5a_1 = { r: 95, g: 53, b: 56, a: 255 }
// const casa5a_2 = { r: 111, g: 64, b: 59, a: 255 }
// // 2nd floor
// const casa5b_0 = { r: 174, g: 147, b: 121, a: 255 }
// const casa5b_1 = { r: 187, g: 163, b: 138, a: 255 }
// const casa5b_2 = { r: 202, g: 184, b: 157, a: 255 }

// const fountain = {r: 142, g: 74, b: 157, a: 255}

const map_info = [
  { name: "blocked", code: "bb", color: { r: 0, g: 0, b: 0, a: 255 }},
  { name: "map_path", code: ".g", color: { r: 101, g: 108, b: 127, a: 255 }},
  { name: "grass_0", code: ".n", color: { r: 52, g: 110, b: 116, a: 255} }, // clean grass
  { name: "grass_1", code: ".b", color: { r: 130, g: 200, b: 172, a: 255} }, // grass
  { name: "grass_2", code: ".v", color: { r: 73, g: 143, b: 135, a: 255} }, // mini bush grass
  
  { name: "casa0_0", code: "z0", color: { r: 250, g: 100, b: 47, a: 255 } },
  { name: "casa0_1", code: "z1", color: { r: 239, g: 169, b: 63, a: 255 } },
  { name: "casa0_2", code: "z2", color: { r: 251, g: 232, b: 150, a: 255 } },

  { name: "casa1_0", code: "x0", color: { r: 159, g: 91, b: 68, a: 255 } },
  { name: "casa1_2", code: "x1", color: { r: 95, g: 25, b: 52, a: 255 } },
  { name: "casa1_3", code: "x2", color: { r: 140, g: 11, b: 44, a: 255 } },
  { name: "casa1_4", code: "x3", color: { r: 162, g: 36, b: 44, a: 255 } },

  // 1st floor
  { name: "casa2a_0", code: "c0", color: { r: 132, g: 42, b: 88, a: 255 } },
  { name: "casa2a_1", code: "c1", color: { r: 160, g: 59, b: 97, a: 255 } },
  { name: "casa2a_2", code: "c2", color: { r: 191, g: 80, b: 108, a: 255 } },
  { name: "casa2a_3", code: "c3", color: { r: 219, g: 97, b: 118, a: 255 } },
  // 2nd floor
  { name: "casa2b_0", code: "d0", color: { r: 172, g: 73, b: 153, a: 255 } },
  { name: "casa2b_1", code: "d1", color: { r: 199, g: 87, b: 166, a: 255 } },
  { name: "casa2b_2", code: "d2", color: { r: 250, g: 131, b: 169, a: 255 } },
  { name: "casa2b_3", code: "d3", color: { r: 113, g: 30, b: 81, a: 255 } },

  // 1st floor
  { name: "casa3a_0", code: "v0", color: { r: 70, g: 98, b: 161, a: 255 } },
  { name: "casa3a_1", code: "v1", color: { r: 81, g: 118, b: 184, a: 255 } },
  { name: "casa3a_2", code: "v2", color: { r: 121, g: 156, b: 211, a: 255 } },
  // 2nd floor
  { name: "casa3b_0", code: "f0", color: { r: 39, g: 41, b: 96, a: 255 } },
  { name: "casa3b_1", code: "f1", color: { r: 47, g: 55, b: 112, a: 255 } },
  { name: "casa3b_2", code: "f2", color: { r: 57, g: 76, b: 135, a: 255 } },

  { name: "casa4_0", code: "b0", color: { r: 185, g: 107, b: 51, a: 255 } },
  { name: "casa4_1", code: "b1", color: { r: 204, g: 131, b: 60, a: 255 } },
  { name: "casa4_2", code: "b2", color: { r: 210, g: 150, b: 67, a: 255 } },
  { name: "casa4_3", code: "b3", color: { r: 218, g: 176, b: 77, a: 255 } },

   // 1st floor
   { name: "casa5a_0", code: "n0", color: { r: 231, g: 220, b: 193, a: 255 } },
   { name: "casa5a_1", code: "n1", color: { r: 95, g: 53, b: 56, a: 255 } },
   { name: "casa5a_2", code: "n2", color: { r: 111, g: 64, b: 59, a: 255 } },
   // 2nd floor
   { name: "casa5b_0", code: "h0", color: { r: 174, g: 147, b: 121, a: 255 } },
   { name: "casa5b_1", code: "h1", color: { r: 187, g: 163, b: 138, a: 255 } },
   { name: "casa5b_2", code: "h2", color: { r: 202, g: 184, b: 157, a: 255 } },

  // Other objects
  { name: "fountain", code: "ft", color: {r: 142, g: 74, b: 157, a: 255} },

]

var image_name = "lvl1.png";

function main(){
  var map_content = "";
  Image.read_image("img/maps/"+image_name)
  .then( image_info => {
    const pixels = image_info.pixels;
    var line = "";
    pixels.forEach( pixel => {
      console.log("Pixel: ", pixel);
      line += get_color_is_equal(pixel, map_info);
      if (is_full_line(line, image_info.width)){
        map_content += '"'+line+'",\n';
        line = "";
      }
    })

    save_fm_file(image_name, map_content)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  })
  .catch( err => console.warn(err));
  // "index.js: got an error of MIME for Buffer from Jimp"
}

function is_same_color(pixel, color) {
  return pixel.r === color.r && pixel.g === color.g && pixel.b === color.b;
}

function get_color_is_equal(pixel, map_info){
  let code = "";
  for (var i = 0; i < map_info.length; i++) {
    let obj = map_info[i]
    code = is_same_color(pixel.color, obj.color) ? obj.code : ""
  }
  return code === "" ? "S0" : code;
}

  // if (is_same_color(pixel.color, blocked)){
  //   return code_reference.blocked;
  // } else if (is_same_color(pixel.color, map_path)) {
  //   return code_reference.map_path;
  // } else if (is_same_color(pixel.color, construction)) {
  //   return code_reference.construction;
  // } else if (is_same_color(pixel.color, mon)) {
  //   return code_reference.mon;
  // } else if (is_same_color(pixel.color, portal)) {
  //   return code_reference.portal;
  // } else if (is_same_color(pixel.color, grass)) {
  //   return code_reference.grass;
  // } else if (is_same_color(pixel.color, casa0_0)) {
  //   return code_reference.casa0_0;
  // } else if (is_same_color(pixel.color, casa0_1)) {
  //   return code_reference.casa0_1;
  // } else if (is_same_color(pixel.color, casa0_2)) {
  //   return code_reference.casa0_2;
  // } else if (is_same_color(pixel.color, casa1_0)) {
  //   return code_reference.casa1_0;
  // } else if (is_same_color(pixel.color, casa1_1)) {
  //   return code_reference.casa1_1;
  // } else if (is_same_color(pixel.color, casa1_2)) {
  //   return code_reference.casa1_2;
  // } else if (is_same_color(pixel.color, casa1_3)) {
  //   return code_reference.casa1_3;
  // } else if (is_same_color(pixel.color, casa2_0)) {
  //   return code_reference.casa2_0;
  // } else if (is_same_color(pixel.color, casa2_1)) {
  //   return code_reference.casa2_1;
  // } else if (is_same_color(pixel.color, casa2_2)) {
  //   return code_reference.casa2_2;
  // } else if (is_same_color(pixel.color, casa2_3)) {
  //   return code_reference.casa2_3;
  // } else if (is_same_color(pixel.color, casa3_0)) {
  //   return code_reference.casa3_0;
  // } else if (is_same_color(pixel.color, casa3_1)) {
  //   return code_reference.casa3_1;
  // } else if (is_same_color(pixel.color, casa3_2)) {
  //   return code_reference.casa3_2;
  // } else if (is_same_color(pixel.color, casa4_0)) {
  //   return code_reference.casa4_0;
  // } else if (is_same_color(pixel.color, casa4_1)) {
  //   return code_reference.casa4_1;
  // } else if (is_same_color(pixel.color, casa4_2)) {
  //   return code_reference.casa4_2;
  // } else if (is_same_color(pixel.color, casa4_3)) {
  //   return code_reference.casa4_3;
  // } else if (is_same_color(pixel.color, casa5_0)) {
  //   return code_reference.casa5_0;
  // } else if (is_same_color(pixel.color, casa5_1)) {
  //   return code_reference.casa5_1;
  // } else if (is_same_color(pixel.color, casa5_2)) {
  //   return code_reference.casa5_2;
  // } else {
  //   return code_reference.other;
  // }
// }

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