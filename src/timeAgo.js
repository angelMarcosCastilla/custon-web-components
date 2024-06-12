class TimeAgo extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    
  }
  connectedCallback() {
    this.render();
  }

  static format(date) {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString("es-Es", options);
  }

  static timeAgoFormat(date) {
    const DATE_UNITS = [
      ['days', 86400],
      ['hours', 3600],
      ['minutes', 60],
      ['seconds', 1]
    ]

    const now = Date.now();
    const elapsed = (date - now) / 1000;
    for (const [unit, secondsInUnit] of DATE_UNITS) {
      if (Math.abs(elapsed) > secondsInUnit || unit === 'seconds') {
        const value = Math.floor(elapsed / secondsInUnit);
        return { value, unit };
      }
    }
  }

  render() {
    const date = new Date(this.getAttribute('datetime') || Date.now());
    const languaje = this.getAttribute('languaje') || 'es';
    const $span = document.createElement('span'); 
    const { value, unit } = TimeAgo.timeAgoFormat(date);
    const rtf = new Intl.RelativeTimeFormat(languaje, {
      localeMatcher: 'best fit',
      numeric: 'always',
      style: 'long',
    })
    $span.textContent = rtf.format(value, unit);
    $span.setAttribute('title', TimeAgo.format(date));
    this._shadowRoot.appendChild($span);
  }
}

customElements.define('time-ago', TimeAgo);