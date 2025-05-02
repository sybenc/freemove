import d3 from "../d3"

export class Tooltip {
  container = d3.create('div')
      .style('position', 'fixed')
      .style('background', '#333')
      .style('color', '#FFF')
      .style('padding', '3px 5px')
      .style('border-radius', '4px')
      .style('pointer-events', 'none')
      .style('font-size', '12px')
      .style('display', 'none')

  mount(){
    document.body.append(this.container.node()!)
    return this
  }

  unmount(){
    this.container.remove()
  }

  show() {
    this.container.style('display', 'block')
    return this
  }

  hidden() {
    this.container.style('display', 'none')
    return this
  }

  html(html: string) {
    this.container.html(html)
    return this
  }

  fixed(x: number, y: number) {
    this.container
        .style('top', `${y}px`)
        .style('left',`${x}px`)
    return this
  }
}