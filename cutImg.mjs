// ### CUTIMG library ###
//
// AUTHOR: Luca Leon Happel
// DATE: 19.10.2019

export{
	cut,
	split,
	join
}

let c = document.createElement("canvas");
c.style.display = "none";

let ctx = c.getContext("2d")

// cut :: Image -> Float -> Float -> Float -> Float -> Image
function cut(image, x, y, width, height){
	c.width = width;
	c.height = height;
	ctx.drawImage(image, -1 * x, -1 * y);
	let out = new Image();
	out.src = c.toDataURL("image/png");
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

// join :: Img -> Img -> Int -> Int -> Img
function join(a,b,x,y){
	c.width = a.width + b.width + Math.abs( x-a.width );
	c.height = a.height + b.height + Math.abs( y-a.height );
	ctx.drawImage(a,0,0);
	ctx.drawImage(b,x,y);
	let out = new Image();
		out.src = c.toDataURL("image/png");
	return out;
}
