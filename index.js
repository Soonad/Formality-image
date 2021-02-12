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
      Formality_aux.make_fm_file(dirname, image_info, image_name)
      .then ( res => console.log(res) )
      .catch( err => console.log(err) )
    )
    .catch( err => console.warn(err) );
    // An error about EISDIR: illegal operation on a directory, read appears but everything works
} //"index.js: got an error of MIME for Buffer from Jimp"

// Runs the script in a folder
parse_dir("./img/screen/");

// Runs the script for a single file
// parse_single_image("./img/screen/", "battle_bg_z1.png");

// Rename images in a folder
// Image.rename_images("./temp/casa_dentro_bg/", "home_inside_bg", 11, 8);

// Obs: there is an error with jimp that idk what it is, but the code is working
