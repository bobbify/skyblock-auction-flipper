
import * as Elementa from "../Elementa";
const Color = Java.type("java.awt.Color");

export default class FlipGui {
  constructor() {
    this.center = {
      x: Renderer.screen.getWidth() / 2,
      y: Renderer.screen.getHeight() / 2
    };
    this.radius = 150; // 300 px wide

    this.left = this.center.x - this.radius;
    this.right = this.center.x + this.radius;
    this.top = this.center.y - this.radius;
    this.bottom = this.center.y + this.radius;

    this.width = this.right - this.left;
    this.height = this.bottom - this.top;

    this.gridBackground = new Elementa.UIBlock(new Color(0.7, 0.7, 0.7))
      .setX(new Elementa.CenterConstraint())
      .setY(new Elementa.CenterConstraint())
      .setWidth(new Elementa.PixelConstraint(this.width))
      .setHeight(new Elementa.PixelConstraint(this.height));

    this.gui = new Gui();

    this.inputContainer = new Elementa.UIContainer()
  .setX(new Elementa.PixelConstraint(10, false))
  .setY(new Elementa.CenterConstraint())
  .setWidth(new Elementa.ChildBasedSizeConstraint())
  .setHeight(new Elementa.ChildBasedMaxSizeConstraint())

/*  const setAllInactive = comp => {
    if (comp.children.length) comp.children.forEach(child => this.setAllInactive(child));
    if (comp instanceof UITextInput) comp.active = false;
  }

  register("guiOpened", e => {
    if (Client.currentGui.get() !== this.gui) setAllInactive(this.window);
  });*/


 open() {
  this.gui.open();
  this.recalculateTicks();
}

 draw() {
  this.window.draw();
  this.graph();
}

  }

}
