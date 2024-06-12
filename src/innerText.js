const INNER_NAME = "an-inner-text";
class InnerText extends HTMLElement {
  constructor() {
    super();
    this.style.display = "block";
    this.style.width = "100%";
  }

  getWidthText = (text, font) => {
    const $canvas = document.createElement("canvas");
    const context = $canvas.getContext("2d");

    context.font = font;
    const metrics = context?.measureText(text);

    return metrics.width;
  };

  createInnerString(width, arrayString, font, separator) {
    const localSeparator = separator || ", ";

    if (arrayString.length === 0) {
      return { innerString: "", pending: 0 };
    }

    if (!width) {
      return { innerString: arrayString.join(localSeparator), pending: 0 };
    }

    let localInnerString = "";
    let pendingArrayString = arrayString.length;

    const widthSeparator = this.getWidthText(localSeparator, font);

    for (let i = 0; i < arrayString.length; i++) {
      const currentString = arrayString[i];
      const currentWidthString = this.getWidthText(currentString, font);
      // si la lista tiene solo un String en el array
      if (arrayString.length === 1) {
        localInnerString += currentString;
        pendingArrayString = 0;
        break;
      }

      // si hay varios en el array, siempre mostramos el primero
      if (i === 0) {
        if (currentWidthString > width) {
          localInnerString += currentString;
          pendingArrayString--;
          break;
        }
        if (currentWidthString < width) {
          localInnerString += currentString;
          localInnerString += localSeparator;
          pendingArrayString--;
          continue;
        }
      }

      // si estamos en el ultimo emails (no hay badge)
      if (i === arrayString.length - 1) {
        // caso cabe
        const accInnerString =
          this.getWidthText(localInnerString, font) + currentWidthString;

        // cabe
        if (accInnerString < width) {
          localInnerString += currentString;
          pendingArrayString--;
          break;
        }

        if (accInnerString > width) {
          break;
        }
      }

      // para los string del medio
      const bagdeText = ` y ${pendingArrayString} mas`;
      const widthBadgeText = this.getWidthText(bagdeText, font);
      const accWidthText =
        this.getWidthText(localInnerString, font) +
        currentWidthString +
        widthSeparator +
        widthBadgeText;

      // se pasa
      if (accWidthText > width) {
        break;
      }

      // no se pasa
      if (accWidthText < width) {
        localInnerString += currentString;
        localInnerString += separator;
        pendingArrayString--;
        continue;
      }
    }

    return {
      innerString: localInnerString,
      pending: pendingArrayString,
    };
  }

  connectedCallback() {
    window.addEventListener("resize", () => this.render());
    this.render();
  }

  render() {
    // el ancho de la caja
    const width = this.clientWidth;
    const data = this.getAttribute("data")
      ? JSON.parse(this.getAttribute("data"))
      : [];
    const font = getComputedStyle(this).font;
    const separator = this.getAttribute("separator") || ", ";
    const { innerString, pending } = this.createInnerString(
      width,
      data,
      font,
      separator
    );
    this.innerHTML = `
      <div style="width: 100%;display: flex; justify-content: space-between; align-items: center;">
      <span style="width: 100%;  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
        ${innerString}
      </span>
       ${pending > 0 ? `<span style="color: red; flex-shrink: 0;">y ${pending} mas</span>` : ""}
      </div>
    `;
  }
}

window.customElements.define(INNER_NAME, InnerText);
