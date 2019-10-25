// ### CUTIMG library ###
//
// AUTHOR: Luca Leon Happel
// DATE: 19.10.2019

export{
	cut,
	split
}

let cc = document.createElement("canvas");
// make this canvas invisible, so it does not distract the user
cc.style.display = "none";

// cut :: Image -> Float -> Float -> Float -> Float -> Image
function cut(image, x, y, width, height){
	cc.width = width;
	cc.height = height;
	cc.getContext("2d").drawImage(image, -1 * x, -1 * y);
	let out = new Image();
	out.src = cc.toDataURL("image/png");
	return out;
}

// split :: Image -> Float -> Float -> [[Image]]
function split(image, tileWidth, tileHeight){
	return new Array(Math.floor(image.height/tileHeight))
		.fill(0)
		.map((a,y) => new Array(Math.floor(image.width/tileWidth))
			.fill(0)
			.map((b,x) => cut(
				image,
				x*tileWidth,
				y*tileHeight,
				tileWidth,
				tileHeight
			)))
}
