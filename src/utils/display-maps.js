const groupColor = group =>
  ({
    1: "blue",
    2: "green",
    3: "red"
  }[group])

const width = window.innerWidth - 10
const height = window.innerHeight - 50

const RADIUS = 3
const FONT_SIZE = 10

export default {
  groupColor: groupColor,
  width: width,
  height: height,
  nodeRadius: RADIUS,
  fontSize: FONT_SIZE
}
