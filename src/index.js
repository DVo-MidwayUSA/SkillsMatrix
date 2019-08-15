import "./main.css"
import * as d3 from "d3"

import linkData from "./data/links/"
import nodeData from "./data/nodes/"

import { dragNode, dragLabel } from "./utils/drag-events"
import calculate from "./utils/calculate-position"

import display from "./utils/display-maps"

const links = linkData.map(d => Object.create(d))
const nodes = nodeData.map(d => Object.create(d))

const simulation = d3
  .forceSimulation(nodes)
  .force("link", d3.forceLink(links).id(d => d.id))
  .force("charge", d3.forceManyBody())
  .force("center", d3.forceCenter(display.width / 2, display.height / 2))

const svg = d3
  .select("main")
  .append("svg")
  .attr("viewBox", [0, 0, display.width, display.height])

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
  .attr("stroke", "#999")
  .attr("stroke-width", 1)
  .attr("stroke-opacity", 0.6)
  .selectAll("circle")
  .data(nodes)
  .join("circle")
  .attr("r", display.nodeRadius)
  .attr("fill", d => display.groupColor(d.group))
  .call(dragNode(simulation))

node.append("title").text(d => d.id + ": " + d.description)

const label = svg
  .append("g")
  .selectAll("text")
  .data(nodes)
  .join("text")
  .text(d => d.id)
  .attr("font-size", d => `${1 - d.weight / 10}em`)
  .attr("font-weight", d => (d.weight === 0 ? "bold" : "normal"))
  .attr("font-style", d => (d.weight < 2 ? "normal" : "italic"))
  .attr("fill", d => display.groupColor(d.group))
  .attr("fill-opacity", d => 1 - d.weight / 10)
  .attr("background", "white")
  .call(dragLabel(simulation))

label.append("title").text(d => d.id + ": " + d.description)

const elements = [link, node, label]
calculate(...elements, display.nodeRadius, display.fontSize, simulation)
