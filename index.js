var Image = require("./Image_util.js");
var Formality_aux = require("./Parse_Formality.js");
var fs = require("fs");

async function parse_dir(dirname){
  await fs.readdir(dirname, function(err, filenames) {
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
    // note: this error this happening but the code works
    .catch( err => console.warn("\nindex.js: got an error of MIME for Buffer in Jimp") );
}

function set_font_content(dirname){
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      console.log(err);
      return;
    }
    Formality_aux.set_font_content(filenames)
    .then(res => console.log(res+"\n"))
    .catch(err => console.log(err))
  })
}

// Runs the script in a folder
parse_dir("./moonad_img/font/")
.then(() => { set_font_content("./fm_font/") })
.catch((err) => console.log(err));


// Runs the script for a single file
// parse_single_image("./moonad_img/", "char_000_z4p.png");

// Rename images in a folder
// Image.rename_images("./temp/casa_dentro_bg/", "home_inside_bg", 11, 8);

// Obs: there is an error with jimp that idk what it is, but the code is working