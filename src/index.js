import "./main.css"
import * as d3 from "d3"
import linkData from "./data/links"
import nodeData from "./data/nodes"
import drag from "./drag-events"

const links = linkData.map(d => Object.create(d))
const nodes = nodeData.map(d => Object.create(d))

const width = window.innerWidth - 10
const height = window.innerHeight - 10

const color = group =>
  ({
    1: "blue",
    2: "green",
    3: "red"
  }[group])

const RADIUS = 3
const FONT_SIZE = 5

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

const node = svg
  .append("g")
  .attr("stroke", "#ddd")
  .attr("stroke-width", 1)
  .selectAll("circle")
  .data(nodes)
  .join("circle")
  .attr("r", RADIUS)
  .attr("fill", d => color(d.group))
  .call(drag(simulation))

node.append("title").text(d => d.id + ": " + d.description)

const label = svg
  .append("g")
  .selectAll("text")
  .data(nodes)
  .join("text")
  .text(d => d.id)
  .attr("font-size", d => FONT_SIZE * (d.primary ? 2.2 : 2))
  //.attr("font-weight", d => (d.primary ? "bold" : "normal"))
  .attr("font-style", d => (d.primary ? "normal" : "italic"))
  .attr("fill", d => color(d.group))
  .attr("fill-opacity", d => (d.primary ? 1 : 0.6))
  .attr("background", "white")
  .call(drag(simulation))

label.append("title").text(d => d.id + ": " + d.description)

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
