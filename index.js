var Image = require("./Image_util.js");
var Formality_aux = require("./Parse_Formality.js");
var fs = require("fs");

function parse_dir(dirname){
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      console.log(err);
      return;
    }
    filenames.forEach( image_name => parse_single_image(dirname, image_name));
  })
}

// Read and get info like pixels formatted, width and height
function parse_single_image(dirname, image_name){
  Image.read_image(dirname + image_name)
    .then( image_info => 
      // Create a .fm format file and save it in /fm_images
      Formality_aux.make_fm_file(image_info, image_name)
      .then ( res => console.log(res) )
      .catch( err => console.log(err) )
    )
    .catch( err => console.log("index.js: got an error: ", err) );
}

parse_dir("./moonad_img/");
// parse_single_image("./moonad_img/", "char_000_z4p.png");
// Image.rename_images("./temp/casa_dentro_bg/", "home_inside_bg", 11, 8);

// Obs: there is an error with jimp that idk what is, but the code is working