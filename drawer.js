class Drawer extends HTMLElement {
  $root;
  $drawerContainer;
  $drawer;
  $isOpen = false;

  static get styles() {
    return `
    :host {
      display: none;
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
        width: 600px;
        inset: 0;
        margin-left: auto;
        background-color: white;
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
    this.shadowRoot.innerHTML = `
    <style>
      ${Drawer.styles}
    </style>
    <div class="drawer-container">
      <div class="drawer" >
        <slot name="header"></slot>
        <slot name="content"></slot>
        <slot name="footer"></slot>
      </div>
    </div>
    `;
  }
}

window.customElements.define("lmry-drawer", Drawer);
