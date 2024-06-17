
const NAME = "an-avatar";
class Avatar extends HTMLElement {
  $avatarImage = null;
  $initials = null;

  src = "";
  alt = "";
  name = "";

  sizeMap = {
    "sm": "24px",
    "md": "32px",
    "lg": "40px",
  }

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

    if (name === "size") {
      this.style.setProperty("--avatar-size", this.sizeMap[newValue]);
    }

    if (name === "name") {
      this.name = newValue;
      this.update();
    }
  }

  static get observedAttributes() {
    return ["src", "alt", "name", "size"];
  }

  getColorForName(name) {
    const bgcolors = [
      "#fef3c7",
      "#edfde8",
      "#e2f1fc",
      "#d0f7eb",
      "#f1eafd",
      "#fee2e2",
      "#f9eaf3",
      "#dcffd9",
      "#effef6",
      "#fbfee7",
    ];

    const textColors = [
      "#d87607",
      "#22b313",
      "#1380be",
      "#198872",
      "#702ec2",
      "#cb2020",
      "#a6305f",
      "#146c0f",
      "#0c894a",
      "#81a20e",
    ];
    if(!name) return ["#d1d1d0", "#4f504e"];
    const hash = this.hashStringToNumber(name);
    const index = hash % bgcolors.length;
    return [bgcolors[index], textColors[index]];
  }

  hashStringToNumber() {
    const str = this.name.toLowerCase();
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash += str.charCodeAt(i);
    }
    return hash % 10;
  }

  static get styles() {
    return /*css*/ `
      :host{
        --avatar-size: 50px;
        display: block;
        width: var(--avatar-size);
        height: var(--avatar-size);
        border-radius: 50%;
        background-color: red;
        overflow: hidden;
        font-size: calc(var(--avatar-size) / 2.5);
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
      this.$initials.innerHTML = this.getInitials() || '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
      this.$avatarImage.style.display = "none";
    } else {
      this.$avatarImage.style.display = "block";
      this.$initials.style.display = "none";
    }
  }

  update() {
    if (!this.$avatarImage) return;

    if (this.src && this.src !== "") {
      this.$avatarImage.src = this.src;
      this.$avatarImage.alt = this.alt;
      this.$avatarImage.onerror = () => this.showinitial(true);
      this.$avatarImage.onload = () => this.showinitial(false);
    }

    if (!this.src) {
      this.showinitial(true);
    }

      const [bgcolor, textcolor] = this.getColorForName(this.name);
      this.style.backgroundColor = bgcolor;
      this.style.color = textcolor;
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

window.customElements.define(NAME, Avatar);
