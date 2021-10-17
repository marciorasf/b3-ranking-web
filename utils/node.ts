import ReactDOM from "react-dom"

export function renderComponent(id: string, component: JSX.Element) {
  let node = document.getElementById(id)

  if (node) {
    ReactDOM.unmountComponentAtNode(node)
  } else {
    node = document.createElement("div")
    node.setAttribute("id", id)
    document.body.appendChild(node)
  }

  const where = document.getElementById("root") || document.body

  const expectedRendering = ReactDOM.createPortal(component, where)

  ReactDOM.render(expectedRendering, node)
}
