const hoverTime = 2000;
let t;

function showTooltip() {
  const node = document.createElement("span");
  const textnode = document.createTextNode("Tooltip text");
  node.className = "tooltiptext";
  node.appendChild(textnode);
  document.getElementById("example").appendChild(node);
}

function startHover() {
  t = setTimeout(showTooltip(), hoverTime);
}

function stopHover() {
  clearTimeout(t);
  if (document.getElementById("example").childNodes[1]){
    document
      .getElementById("example")
      .removeChild(document.getElementById("example").childNodes[1]);
  }
}
