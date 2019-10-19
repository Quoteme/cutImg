// ### CUTIMG library ###
//
// AUTHOR: Luca Leon Happel
// DATE: 19.10.2019

export {
	cut
}

cc = document.createElement("canvas");
// make this canvas invisible, so it does not distract the user
cc.style.display = "none";

// this function takes in an image, then cuts it into a portion of the previous image and returns a new image
function cut(image, x, y, width, height){
	cc.width = width;
	cc.height = height;
	cc.getContext("2d").drawImage(image, -1 * x, -1 * y);
	let out = new Image();
	out.src = cc.toDataURL("image/png");
	return out;
}
