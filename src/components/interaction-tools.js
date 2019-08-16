import nodes from "../data/nodes/"
import display from "../utils/display-maps"

const distinct = (value, index, self) => {
  return self.indexOf(value) === index
}

const groups = nodes.map(node => node.group).filter(distinct)

const detailMenu = document.getElementById("detail")

const bindToggle = (element, group) =>
  element.addEventListener("click", e => {
    e.preventDefault()
    document.querySelectorAll(`[data-group="${group}"]`).forEach(element => {
      if (element.style.display === "none") {
        element.style.display = "block"
        return
      }

      element.style.display = "none"
    })
  })

groups.map(group => {
  const button = document.createElement("button")
  const color = display.groupColor(group)
  button.style.backgroundColor = color
  button.title = `show/hide: ${color}`
  bindToggle(button, group)
  detailMenu.append(button)
})

document.getElementById("help").addEventListener("click", e => {
  e.preventDefault()
  const message = `Technical Skills Map - Help:
    \u2022 Drag a skill to move or reposition
    \u2022 Drag an anchor to fix position
    \u2022 Click a skill release an anchor
    \u2022 Hover over a skill to view description
    \u2022 Toggle label display by color using menus in bottom left
    \u2022 Zoom using click wheel`
  alert(message)
})

document.querySelectorAll("text").forEach(element => {
  element.addEventListener("dblclick", e => {
    const description = e.currentTarget.querySelector("title").textContent
    alert(description)
  })
})
