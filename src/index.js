import "./main.css"
import * as d3 from "d3"
import data from "./data"

const links = data.links.map(d => Object.create(d))
const nodes = data.nodes.map(d => Object.create(d))

const width = window.innerWidth - 10
const height = window.innerHeight - 10
const color = group =>
  ({
    1: "#999",
    2: "#666",
    3: "#333"
  }[group])

const radius = 6

const simulation = d3
  .forceSimulation(nodes)
  .force("link", d3.forceLink(links).id(d => d.id))
  .force("charge", d3.forceManyBody())
  .force("center", d3.forceCenter(width / 2, height / 2))

const svg = d3
  .select("main")
  .append("svg")
  .attr("viewBox", [0, 0, width, height])

const link = svg
  .append("g")
  .attr("stroke", "#999")
  .attr("stroke-opacity", 0.6)
  .selectAll("line")
  .data(links)
  .join("line")
  .attr("stroke-width", d => Math.sqrt(d.value))

const drag = simulation => {
  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x
    d.fy = d.y
  }

  function dragged(d) {
    d.fx = d3.event.x
    d.fy = d3.event.y
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0)
    d.fx = null
    d.fy = null
  }

  return d3
    .drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended)
}

const node = svg
  .append("g")
  .attr("stroke", "#fff")
  .attr("stroke-width", 1.5)
  .selectAll("circle")
  .data(nodes)
  .join("circle")
  .attr("r", radius)
  .attr("fill", d => color(d.group))
  .call(drag(simulation))

node.append("title").text(d => d.description)

const label = svg
  .append("g")
  .selectAll("text")
  .data(nodes)
  .join("text")
  .text(d => d.id)
  .attr("font-size", radius * 2)
  .attr("fill", d => color(d.group))
  .attr("background", "white")
  .call(drag(simulation))

label.append("title").text(d => d.description)

simulation.on("tick", () => {
  link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y)

  node.attr("cx", d => d.x).attr("cy", d => d.y)
  label.attr("x", d => d.x + radius + radius * 0.7).attr("y", d => d.y + radius)
})
