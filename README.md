# cutImg.js
A minimalist javascript library for cutting images into smaller rectangular sections / copying them

| Command | Effect |
|---------|--------|
| `cut(img, x, y, width, height)` | returns a cut version of the previous image |
| `split(img, tileWidth, tileHeight)` | returns a tilemap of the image based on the tilesize entered |
| join(a,b,x,y) | join two images together (2nd image is offset by x and y) |
| mirrir(img, x,y) | mirror an image along one or two specified axes (if x or y = true) |

### as a module module
```javascript
	// this file must be loaded as a module:
	// <script src="path/to/cutImg.mjs" type="module"></script>
	import * as CUTIMG from 'lib/cutImg/cutImg.mjs';

	originalImage = new Image();
	originalImage.src = "url/to/image.png";
	newImage = CUTIMG.cut(originalImage, 100, 200, 450, 600);
```

### as a script
```html
<head>
	<!-- [...] -->
	<script src="path/to/cutImg.js"></script>
	<!-- [...] -->
</head>
```
```javascript
originalImage = new Image();
originalImage.src = "url/to/image.png";

newImage = cutImg(originalImage, 100, 200, 450, 600);
```
![original image](http://kids.nationalgeographic.com/content/dam/kids/photos/animals/Fish/A-G/clown-anemonefish-tentacles.jpg "original image")
![cut image](http://i.imgur.com/wjC4zVm.png "cut image")
