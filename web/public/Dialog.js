const DIALOG_NAME = "an-dialog"
const DIALOG_HEADER_NAME = "an-dialog-header"
const DIALOG_FOOTER_NAME = "an-dialog-footer"
const DIALOG_CONTENT_NAME = "an-dialog-content"

class Dialog extends HTMLElement {
  #open = true;  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get style() {
    return /*css*/ `
    :host {
      --size: 600px;
      --padding: 16px;
      --bg-color: white;
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 999999;
      visibility: hidden;
      transition: visibility 0.3s ease-in-out;
    }

    #close-button{
      position: absolute;
      top: var(--padding);
      right: var(--padding);
      cursor: pointer;
      z-index: 10;
    }

    .dialog-backdrop {
      position: fixed;
      width: 100%;
      height: 100%;
      display: grid;
      place-content: center;
      background-color: rgba(0, 0, 0, 0.5);
    }

    .dialog{
      position: relative;
      background: white;
      border-radius: 10px;
      width: min(100vw, var(--size));
      display: flex;
      flex-direction: column;
      overflow: auto;
      max-height: 90vh;
      background-color: var(--bg-color);
      transform: scale(0);
      transition: transform 0.1s ease-in-out;
    }

    .dialog[data-open]{
      transform: scale(1);
    }
    
    
    `;
  }

  connectedCallback() {
    this.render();
    this.elements();
    this.events();
    this.update();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if(name === "open"){
      this.#open = newValue;
      this.update();  
    }
  }
  static get observedAttributes() {
    return ["open"];
  }

  elements(){
    this.$backdrop = this.shadowRoot.querySelector("#dialog-backdrop");
    this.$content = this.shadowRoot.querySelector("#dialog-content");
    this.$dialog = this.shadowRoot.querySelector(".dialog");
    this.$closeButton = this.shadowRoot.querySelector("#close-button");
  }

  handleClose = () => {
    this.#open = false;
    this.update();
  };

  events(){
    this.$backdrop.addEventListener("click", this.handleClose);
    this.$dialog.addEventListener("click", (e) => e.stopPropagation());
    this.$closeButton.addEventListener("click", this.handleClose);
  }

  update(){
    if(!this.$dialog) return;
    this.$dialog.removeAttribute("data-open");
    if(this.#open){
      this.$dialog.setAttribute("data-open", "");
      this.style.visibility = "visible";
    }else{
      this.style.visibility = "hidden";
    }
  }

  render(){
    this.shadowRoot.innerHTML = /*html*/ `
    <style>
      ${Dialog.style}
    </style>
    <div class="dialog-backdrop" id="dialog-backdrop">
        <div class="dialog">
          <button class="an-icon-close" id="close-button">X</button>
          <slot ></slot>
        </div>
    </div>
      
    `;
  }
}

window.customElements.define(DIALOG_NAME, Dialog);

/*Dialog header */
class DialogHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get style() {
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

  render(){
    this.shadowRoot.innerHTML = /*html*/ `
    <style>
      ${DialogHeader.style}
    </style>
      <slot></slot>
    `;
  }
}

window.customElements.define(DIALOG_HEADER_NAME, DialogHeader);

/*Dialog footer */
class DialogFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get style() {
    return /*css*/ `
    :host {
      display: block;
      position: sticky;
      bottom: 0;
      padding: var(--padding);
      background-color: var(--bg-color);
      border-top: 1px solid gray;
    }
    `;
  }
  connectedCallback() {
    this.render();
  }

  render(){
    this.shadowRoot.innerHTML = /*html*/ `
    <style>
      ${DialogFooter.style}
    </style>
      <slot></slot>
    `;
  }
}
window.customElements.define(DIALOG_FOOTER_NAME, DialogFooter);

/*Dialog content */
class DialogContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get style() {
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

  render(){
    this.shadowRoot.innerHTML = /*html*/ `
    <style>
      ${DialogContent.style}
    </style>
      <slot></slot> 
    `;
  }
}
window.customElements.define(DIALOG_CONTENT_NAME, DialogContent);