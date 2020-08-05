## Formality-image

Reads a directory or file and creates a `.fm` file for each image.

**Image Util:** read and format format information about every pixel in an image  
**Parse Formality:** prepares and save a `.fm` file formatted for `Mons.Assets.`

### Usage
```
npm i
node index.js
```

```
// Runs the script in a folder
parse_dir("./moonad_img/");

// Runs the script for a single file
parse_single_image("./moonad_img/", "bush_0_z2.png");

// Rename images in a folder
Image.rename_images("./temp/big_construction/", "supermarket", 11, 8);
```

