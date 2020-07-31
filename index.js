var Image = require("./Image_util.js");
var Formality_aux = require("./Parse_Formality.js");

var image_info = [];

function init(){
  // Read and get info
  Image.read_image("row-1-col-5.png")
    .then( image => {
      image_info = image;
      // console.log(image_info);
      var image_to_hex = Formality_aux.image_to_hex(image);
      console.log(image_to_hex);
    })
    .catch( err => console.log("index.js: got an error: ", err) );

    // console.log(image_info)
  // if(image_info !== []){
  //   console.log(image_info);
  //   Formality_aux.format_image(image_info);
  // } else {
  //   console.log("Don't have an image info");
  // }

}

init();