// ### CUTIMG library ###
//
// AUTHOR: Luca Leon Happel
// DATE: 19.10.2019

let c = document.createElement("canvas");
c.style.display = "none";

let ctx = c.getContext("2d")

// cut an image
// cut :: Image -> Float -> Float -> Float -> Float -> Image
export function cut(image, x, y, width, height){
	c.width = width;
	c.height = height;
	ctx.drawImage(image, -1 * x, -1 * y);
	let out = new Image();
	out.src = c.toDataURL("image/png");
	return out;
}

// split an image into tiles of specific width and height
// split :: Image -> Float -> Float -> [[Image]]
export function split(image, tileWidth, tileHeight){
	return new Array(Math.floor(image.height/tileHeight))
		.fill(0)
		.map((_,y) => new Array(Math.floor(image.width/tileWidth))
			.fill(0)
			.map((_,x) => cut(
				image,
				x*tileWidth,
				y*tileHeight,
				tileWidth,
				tileHeight
			)))
}

// join two images together (2nd image is offset by x and y)
// join :: Img -> Img -> Int -> Int -> Img
export function join(a,b,x,y){
	c.width = a.width + b.width + Math.abs( x-a.width );
	c.height = a.height + b.height + Math.abs( y-a.height );
	ctx.drawImage(a,0,0);
	ctx.drawImage(b,x,y);
	let out = new Image();
		out.src = c.toDataURL("image/png");
	return out;
}

// mirror an image along one or two specified axes
// mirror :: Img -> Bool -> Bool -> Img
export function mirror(image, x=true,y=false){
	c.width = image.width;
	c.height = image.height;
	ctx.translate(c.width, 0);
	ctx.scale(
		x?-1:1,
		y?-1:1,
	)
	ctx.drawImage(image,0,0);
	let out = new Image();
		out.src = c.toDataURL("image/png");
	return out;
}

// wait for images being loaded using `await`
// load :: Img -> Promise
export const load = async img => new Promise(resolve => img.onload = resolve(img))
