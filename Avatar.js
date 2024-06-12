class Avatar extends HTMLElement {
  $avatarImage = null;
  $initials = null;
  src = "";
  alt = "";
  name = "";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.elements();
    this.update();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "src") {
      this.src = newValue;
      this.update();
    }

    if (name === "alt") {
      this.alt = newValue;
      this.update();
    }

    if (name === "name") {
      this.name = newValue;
      this.update();
    }
  }

  static get observedAttributes() {
    return ["src", "alt", "name"];
  }

  static get styles() {
    return /*css*/ `
      :host{
        display: block;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: red;
        overflow: hidden;
      }

      .avatar{
        width: 100%;
        height: 100%;
      }
      #avatarImage{
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-color: orange;
        display: none;
      }

      #initials{
        display: none;
        height: 100%;
        width: 100%;
        place-content: center;
        font-size: 1.5rem;
        font-weight: bold;
      }
    `;
  }
  elements() {
    this.$avatarImage = this.shadowRoot.querySelector("#avatarImage");
    this.$initials = this.shadowRoot.querySelector("#initials");
  }

  getInitials() {
    const name = this.name.toUpperCase().split(" ");
    let initials = "";
    for (let i = 0; i < name.length; i++) {
      initials += name[i].charAt(0);
    }
    return initials;
    
  }


  showinitial(show) {
    if (show) {
      this.$initials.style.display = "grid";
      this.$initials.textContent = this.getInitials();
      this.$avatarImage.style.display = "none";

    } else {
      this.$avatarImage.style.display = "block";
      this.$initials.style.display = "none";
    }
  }
  update() {
    if (!this.$avatarImage) return;

    if (this.src !== "") {
      this.$avatarImage.src = this.src;
      this.$avatarImage.alt = this.alt;
      this.$avatarImage.onerror = () => this.showinitial(true);
      this.$avatarImage.onload = () => this.showinitial(false);
    }
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/ `
    <style>
      ${Avatar.styles}
    </style>
      <div class="avatar">
        <img id="avatarImage" />
        <div id="initials" class="initials"></div>
      </div>
      `;
  }
}

window.customElements.define("lmry-avatar", Avatar);
