// ### CUTIMG library ###
//
// AUTHOR: Luca Leon Happel
// DATE: 19.10.2019

// cut an image
// cut :: Image -> Float -> Float -> Float -> Float -> Image
export function cut(image, x, y, width, height) {
  let c = document.createElement("canvas");
  let ctx = c.getContext("2d");
  c.width = width;
  c.height = height;
  ctx.drawImage(image, -1 * x, -1 * y);
  let out = new Image();
  out.src = c.toDataURL("image/png");
  return out;
}

// split an image into tiles of specific width and height
// split :: Image -> Float -> Float -> [[Image]]
export function split(image, tileWidth, tileHeight) {
  let c = document.createElement("canvas");
  let ctx = c.getContext("2d");
  return new Array(Math.floor(image.height / tileHeight))
    .fill(0)
    .map((_, y) =>
      new Array(Math.floor(image.width / tileWidth))
        .fill(0)
        .map((_, x) =>
          cut(image, x * tileWidth, y * tileHeight, tileWidth, tileHeight),
        ),
    );
}

// join two images together (2nd image is offset by x and y)
// join :: Img -> Img -> Int -> Int -> Img
export function join(a, b, x, y) {
  let c = document.createElement("canvas");
  let ctx = c.getContext("2d");
  c.width = a.width + b.width + Math.abs(x - a.width);
  c.height = a.height + b.height + Math.abs(y - a.height);
  ctx.drawImage(a, 0, 0);
  ctx.drawImage(b, x, y);
  let out = new Image();
  out.src = c.toDataURL("image/png");
  return out;
}

// mirror an image along one or two specified axes
// mirror :: Image -> Bool -> Bool -> Promise<Image>
export async function mirror(image, flipX = true, flipY = false) {
  let c = document.createElement("canvas");
  let ctx = c.getContext("2d");
  c.width = image.width;
  c.height = image.height;

  ctx.save(); // Save the current state of the canvas
  ctx.translate(flipX ? c.width : 0, flipY ? c.height : 0); // Move to the appropriate corner
  ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1); // Flip the image based on the specified axes
  ctx.drawImage(image, 0, 0); // Draw the mirrored image
  ctx.restore(); // Restore the original state of the canvas

  // Convert canvas to a Blob and create an Image object
  let blob = await new Promise((resolve) => c.toBlob(resolve, "image/png"));
  let out = new Image();
  out.src = URL.createObjectURL(blob);

  // Wait for the image to load before returning
  await new Promise((resolve) => (out.onload = resolve));

  return out;
}

// wait for images being loaded using `await`
// load :: Img -> Promise
export const load = async (img) =>
  new Promise((resolve) => (img.onload = resolve(img)));
