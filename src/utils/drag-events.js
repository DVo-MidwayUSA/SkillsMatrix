import * as d3 from "d3"

const dragstarted = (d, simulation) => {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart()
  d.fx = d.x
  d.fy = d.y
}

const dragged = d => {
  d.fx = d3.event.x
  d.fy = d3.event.y
}

const dragended = (d, simulation) => {
  if (!d3.event.active) simulation.alphaTarget(0)
  d.fx = null
  d.fy = null
}

const dragNode = simulation => {
  return d3
    .drag()
    .on("start", d => dragstarted(d, simulation))
    .on("drag", dragged)
}

const dragLabel = simulation => {
  return d3
    .drag()
    .on("start", d => dragstarted(d, simulation))
    .on("drag", dragged)
    .on("end", d => dragended(d, simulation))
}

export { dragLabel, dragNode }
