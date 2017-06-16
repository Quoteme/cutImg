# cutImg
A minimalist javascript library for cutting images into smaller rectangular sections / copying them

use like this:
```javascript
originalImage = new Image();
originalImage.src = "url/to/image.png";

newImage = cutImg(originalImage, 100, 200, 450, 600);
```
![original image](http://kids.nationalgeographic.com/content/dam/kids/photos/animals/Fish/A-G/clown-anemonefish-tentacles.jpg "original image")
![cut image](http://i.imgur.com/wjC4zVm.png "cut image")
