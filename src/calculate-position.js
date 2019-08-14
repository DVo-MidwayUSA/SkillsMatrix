const calculate = (link, node, label, RADIUS, FONT_SIZE, simulation) =>
  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y)

    node.attr("cx", d => d.x).attr("cy", d => d.y)
    label
      .attr("x", d => d.x + RADIUS + FONT_SIZE * 0.5)
      .attr("y", d => d.y + RADIUS)
  })

export default calculate
