var Image = require("./Image_util.js");
var Formality_aux = require("./Parse_Formality.js");

// var image_info = [];

function init(){
  // Read and get info
  var image_name = "sprite_test.png";
  Image.read_image("sprite_test.png")
    .then( image_info => {
      Formality_aux.make_fm_file(image_info, image_name);
    })
    .catch( err => console.log("index.js: got an error: ", err) );
}

init();