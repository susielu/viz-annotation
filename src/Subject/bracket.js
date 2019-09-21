import { lineBuilder, pathBuilder } from "../Builder"

//This curly brace function was
//made by Alex Hornbake
//http://bl.ocks.org/alexhornbake/6005176
function makeCurlyBrace(x1, y1, x2, y2, w, q) {
  //Calculate unit vector
  let dx = x1 - x2
  let dy = y1 - y2
  let len = Math.sqrt(dx * dx + dy * dy)
  dx = dx / len
  dy = dy / len

  //Calculate Control Points of path,
  let qx1 = x1 + q * w * dy
  let qy1 = y1 - q * w * dx
  let qx2 = x1 - 0.25 * len * dx + (1 - q) * w * dy
  let qy2 = y1 - 0.25 * len * dy - (1 - q) * w * dx
  let tx1 = x1 - 0.5 * len * dx + w * dy
  let ty1 = y1 - 0.5 * len * dy - w * dx
  let qx3 = x2 + q * w * dy
  let qy3 = y2 - q * w * dx
  let qx4 = x1 - 0.75 * len * dx + (1 - q) * w * dy
  let qy4 = y1 - 0.75 * len * dy - (1 - q) * w * dx

  return (
    "M " +
    x1 +
    " " +
    y1 +
    " Q " +
    qx1 +
    " " +
    qy1 +
    " " +
    qx2 +
    " " +
    qy2 +
    " T " +
    tx1 +
    " " +
    ty1 +
    " M " +
    x2 +
    " " +
    y2 +
    " Q " +
    qx3 +
    " " +
    qy3 +
    " " +
    qx4 +
    " " +
    qy4 +
    " T " +
    tx1 +
    " " +
    ty1
  )
}

export default ({ height, width, depth, type, editMode }) => {
  let handles = []
  let data
  let bracket


  let w = 0, h=0

  if (height && height >0){
    h = height
  } else if (width && width > 0){
    w = width
  }


  if (type === "square") {
    if (h) {
      data = [[0, 0], [depth, 0], [depth, h], [0, h]]
    } else if (w) {
      data = [[0, 0], [0, depth], [w, depth], [w, 0]]
    }
    bracket = lineBuilder({ data, className: "subject" })
  } else if (type === "curly") {
    bracket = pathBuilder({
      d: makeCurlyBrace(
        0,
        0,
        w,
        h,
        (h > 0) || (w < 0) ? -depth : depth,
        0.55
      ),
      className: "subject"
    })
  }

  if (editMode) {
    handles = [
      {
        x: h ? depth : w / 2,
        y: h ? h / 2 : depth,
        key: "depth",
        type: h ? "X" : "Y"
      },
      {
        x: w || 0,
        y: h || 0,
        key: h ? "height" : "width"
      }
    ]
  }

  bracket.attrs["fill-opacity"] = 0.1
  return { components: [bracket], handles }
}
