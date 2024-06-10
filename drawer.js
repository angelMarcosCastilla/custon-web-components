class Drawer extends HTMLElement {
  $root;
  $drawerContainer;
  $drawer;
  $isOpen = false;

  static get styles() {
    return /*css*/ `
    :host {
      display: none;
      --padding: 16px;
      --bg-color: white;
    }
      .drawer-container {
      display: block;
      position: fixed;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      }
      .drawer {
        position: fixed;
        max-width: 600px;
        inset: 0;
        margin-left: auto;
        background-color: var(--bg-color);
        display: flex;
        flex-direction: column;
        overflow: auto;
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
  }

  static get observedAttributes() {
    return ["open"];
  }

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
  }

  handleToggle = () => {
    this.$isOpen = !this.$isOpen;
    this.update();
  };

  elements() {
    this.$root = this.shadowRoot;
    this.$drawerContainer = this.$root.querySelector(".drawer-container");
    this.$drawer = this.$root.querySelector(".drawer");
  }

  events() {
    this.$drawerContainer.addEventListener("click", this.handleToggle);
    this.$drawer.addEventListener("click", (e) => e.stopPropagation());
  }

  update() {
    if (this.$isOpen) {
      this.style.display = "block";
      this.scrollLock();
    } else {
      this.removeAttribute("open");
      this.style.display = "none";
      this.removeScrollLock();
    }
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/ `
    <style>
      ${Drawer.styles}
    </style>
    <div class="drawer-container">
      <div class="drawer" >
        <slot></slot>
      </div>
    </div>
    `;
  }
}
window.customElements.define("lmry-drawer", Drawer);

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
window.customElements.define("lmry-drawer-header", DrawerHeader);

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
window.customElements.define("lmry-drawer-footer", DrawerFooter);

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
window.customElements.define("lmry-drawer-content", DrawerContent);
