const groupcolor = group =>
  ({
    1: "blue",
    2: "green",
    3: "red"
  }[group])

const width = window.innerWidth - 10
const height = window.innerHeight - 10

const RADIUS = 3
const FONT_SIZE = 5

export default {
  groupcolor: groupcolor,
  width: width,
  height: height,
  noderadius: RADIUS,
  fontsize: FONT_SIZE
}
