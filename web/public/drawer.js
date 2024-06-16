const NAME_DRAWER = "an-drawer"
const NAME_DRAWER_HEADER = "an-drawer-header"
const NAME_DRAWER_FOOTER = "an-drawer-footer"
const NAME_DRAWER_CONTENT = "an-drawer-content"

class Drawer extends HTMLElement {
  $root;
  $drawerContainer;
  $drawer;
  $isOpen = false;
  $btnClose = null;

  static sideMap = {
    top: "top",
    left: "left",
    right: "right",
    bottom: "bottom",
  };

  side = Drawer.sideMap.left;
  size = 600;
  static get styles() {
    return /*css*/ `
    :host {
      --padding: 16px;
      --bg-color: white;
      --width: 100%;
      --height: 100%;
      visibility: hidden;
      z-index: 999999;
      position: fixed;
      inset: 0;
      transition: visibility 0.3s ease-in-out;
    }
      .drawer-container {
      display: block;
      position: fixed;
      top: 0;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      }
      .drawer {
        position: fixed;
        background-color: var(--bg-color);
        display: flex;
        flex-direction: column;
        overflow: auto;
        width: min(100dvw, var(--width));
        height: min(100dvh, var(--height));
        transition: transform 0.3s ease-in-out;
      }

      .drawer[data-side="left"] {
        left: 0;
        height: 100%;
        transform: translateX(-100vw);
      }

      .drawer[data-side="right"] {
        right: 0;
        height:  100%;
        transform: translateX(100vw);
      }
      .drawer[data-side="bottom"] {
        bottom: 0;
        width: 100%;
        transform: translateY(100vh);
      }

      .drawer[data-side="top"] {
        top: 0;
        width: 100%;
        transform: translateY(-100vh);
      }

      .close{
        position: absolute;
        z-index: 10;
        top: var(--padding);
        right: var(--padding);
        cursor: pointer;
      }
      :host([open]) .drawer {
        transform: translateX(0) translateY(0);
        transition: transform 0.2s ease-in-out;
      }
      `;
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.elements();
    this.events();
    this.update();
    this.updateSize();
  }

  static get observedAttributes() {
    return ["open", "side", "size"];
  }

  closePressEscape = (e) => {
    if (e.key === "Escape") {
      if(this.$isOpen){
        this.handleToggle();
      }
    }
  };

  scrollLock() {
    const scrollBarWidth = window.innerWidth - document.body.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.marginRight = `${scrollBarWidth}px`;
  }

  removeScrollLock() {
    document.body.style.overflow = "auto";
    document.body.style.marginRight = "0px";
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "open") {
      this.$isOpen = true;
      this.update();
    }

    if (name === "size") {
      this.size = Number(newValue);
    }

    if (name === "side") {
      this.side = Drawer.sideMap[newValue] ?? Drawer.sideMap.left;
      if(this.$drawer) this.$drawer.dataset.side = this.side;
      this.updateSize();
    }
  }

  handleToggle = () => {
    this.$isOpen = !this.$isOpen;
    this.update();
  };

  elements() {
    this.$root = this.shadowRoot;
    this.$drawerContainer = this.$root.querySelector(".drawer-container");
    this.$drawer = this.$root.querySelector(".drawer");
    this.$btnClose = this.$root.querySelector(".close");
  }

  events() {
    this.$drawerContainer.addEventListener("pointerdown", this.handleToggle);
    this.$drawer.addEventListener("pointerdown", (e) => e.stopPropagation());
    this.$btnClose.addEventListener("click", this.handleToggle);
    document.addEventListener("keydown", this.closePressEscape);
  }

  update() {
    if (this.$isOpen) {
      this.style.visibility = "visible";
      this.scrollLock();
    } else {
      this.removeAttribute("open");
      this.style.visibility = "hidden";
      this.removeScrollLock();
    }
  }

  updateSize() {
    if(!this.$drawer) return;
    if (["left", "right"].includes(this.side)) {
      this.$drawer.style.setProperty("--width", `${this.size}px`);
    } else {
      this.$drawer.style.setProperty("--height", `${this.size}px`);
    }
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/ `
    <style>
      ${Drawer.styles}
    </style>
    <div class="drawer-container">
      <div class="drawer" data-side="${this.side}" >
        <button class="close">X</button>
        <slot></slot>
      </div>
    </div>
    `;
  }
}
window.customElements.define(NAME_DRAWER, Drawer);

/*Drawer header */
class DrawerHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /*css*/ `
    :host {
      display: block;
      padding: var(--padding);
      position: sticky;
      top: 0;
      background-color: var(--bg-color);
    }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/ `
    <style>
      ${DrawerHeader.styles}
    </style>
    <header class="drawer-header">
      <slot></slot>
    </header>
    `;
  }
}
window.customElements.define(NAME_DRAWER_HEADER, DrawerHeader);

/*Drawer footer */
class DrawerFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /*css*/ `
    :host {
      display: block;
      padding: var(--padding);
      position: sticky;
      bottom: 0;
      background-color: var(--bg-color);
    }
    `;
  }
  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/ `
    <style>
      ${DrawerFooter.styles}
    </style>
    <footer class="drawer-footer">
      <slot></slot>
    </footer>
    `;
  }
}
window.customElements.define(NAME_DRAWER_FOOTER, DrawerFooter);

/*Drawer content */
class DrawerContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /*css*/ `
    :host {
      display: block;
      padding: var(--padding);
      flex: 1 1 0;
    }
    `;
  }
  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/ `
    <style>
      ${DrawerContent.styles}
    </style>
    <div class="drawer-content">
      <slot></slot> 
    </div>
    `;
  }
}
window.customElements.define(NAME_DRAWER_CONTENT, DrawerContent);
