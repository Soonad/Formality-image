## Formality-image

Reads a directory or file and creates a `.kind` file for each image.

**Image Util:** read and format format information about every pixel in an image  
**Parse Formality:** prepares and save a `.kind` file formatted for `Kaelin.Assets.`

### Usage
```
npm i
node index.js
```

```
// Runs the script in a folder
parse_dir("./img/");

// Runs the script for a single file
parse_single_image("./img/", "dark_grass_0_z1.png");
```

To work with `PixelFont` use the `font` branch.