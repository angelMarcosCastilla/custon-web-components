class Dialog extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
      this.render();
      this.setupEventListeners();
  }

  render() {
      const style = document.createElement('style');
      style.textContent = `
          :host {
              display: none;
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0);
              justify-content: center;
              align-items: center;
              z-index: 1000;
              transition: background-color 0.3s ease-in-out;
          }

          :host([open]) {
              display: flex;
          }

          :host([open][animated]) {
              background-color: rgba(0, 0, 0, 0.5);
          }

          .popup-content {
              background-color: hsl(var(--popover));
              color: hsl(var(--popover-foreground));
              padding: 1.5rem;
              border-radius: var(--radius);
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
              max-width: 28rem;
              width: 90%;
              max-height: 90%;
              overflow: auto;
              position: relative;
              opacity: 0;
              transform: scale(0.9) translateY(20px);
              transition: opacity 0.3s ease-out, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          }

          :host([open][animated]) .popup-content {
              opacity: 1;
              transform: scale(1) translateY(0);
          }

          .close-button {
              position: absolute;
              top: 0.75rem;
              right: 0.75rem;
              background: none;
              border: none;
              font-size: 1.25rem;
              cursor: pointer;
              color: hsl(var(--muted-foreground));
              transition: color 0.2s ease-in-out, transform 0.2s ease-in-out;
          }

          .close-button:hover {
              color: hsl(var(--foreground));
              transform: rotate(90deg);
          }

          ::slotted(h2) {
              margin-top: 0;
              font-size: 1.5rem;
              font-weight: 600;
              color: hsl(var(--foreground));
          }

          ::slotted(p) {
              color: hsl(var(--muted-foreground));
          }
      `;

      const wrapper = document.createElement('div');
      wrapper.setAttribute('class', 'popup-content');
      wrapper.innerHTML = `
          <button class="close-button" aria-label="Close popup">&times;</button>
          <slot></slot>
      `;

      this.shadowRoot.appendChild(style);
      this.shadowRoot.appendChild(wrapper);
  }

  setupEventListeners() {
      this.shadowRoot.querySelector('.close-button').addEventListener('click', () => this.close());
      this.addEventListener('click', (e) => {
          if (e.target === this) {
              this.close();
          }
      });
  }

  open() {
      this.setAttribute('open', '');
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
          this.setAttribute('animated', '');
      });
  }

  close() {
      this.removeAttribute('animated');
      const transitionDuration = 300; // Match this with the CSS transition duration
      setTimeout(() => {
          this.removeAttribute('open');
          document.body.style.overflow = '';
      }, transitionDuration);
  }
}

customElements.define('an-dialog', Dialog);