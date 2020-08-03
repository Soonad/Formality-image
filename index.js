var Image = require("./Image_util.js");
var Formality_aux = require("./Parse_Formality.js");
var fs = require("fs");

function init(){
  var dirname = "./char/";
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      console.log(err);
      return;
    }

    filenames.forEach( image_name => {
      // Read and get info like pixels formatted, width and height
      Image.read_image(dirname + image_name)
      .then( image_info => 
        // Create a .fm format file and save it in /fm_images
        Formality_aux.make_fm_file(image_info, image_name)
        .then ( res => console.log(res) )
        .catch( err => console.log(err) )
      )
      .catch( err => console.log("index.js: got an error: ", err) );
    });
  })
}

init();

// Obs: there is an error with jimp that idk what is, but the code is working