import line from "d3-shape/src/line"
import arc from "d3-shape/src/arc"
import curveLinear from "d3-shape/src/curve/linear"

export const lineBuilder = ({
  data,
  curve = curveLinear,
  canvasContext,
  className,
  classID
}) => {
  const lineGen = line().curve(curve)

  const builder = {
    type: "path",
    className,
    classID,
    data
  }

  if (canvasContext) {
    lineGen.context(canvasContext)
    builder.pathMethods = lineGen
  } else {
    builder.attrs = {
      d: lineGen(data)
    }
  }

  return builder
}

export const pathBuilder = ({
  d,
  curve = curveLinear,
  canvasContext,
  className,
  classID
}) => {
  const lineGen = line().curve(curve)

  const builder = {
    type: "path",
    className,
    classID
  }

  if (canvasContext) {
    lineGen.context(canvasContext)
  } else {
    builder.attrs = {
      d
    }
  }

  return builder
}

export const arcBuilder = ({ data, canvasContext, className, classID }) => {
  const builder = {
    type: "path",
    className,
    classID,
    data
  }

  const arcShape = arc()
    .innerRadius(data.innerRadius || 0)
    .outerRadius(data.outerRadius || data.radius || 2)
    .startAngle(data.startAngle || 0)
    .endAngle(data.endAngle || 2 * Math.PI)

  if (canvasContext) {
    arcShape.context(canvasContext)
  } else {
    builder.attrs = {
      d: arcShape()
    }
  }

  return builder
}
