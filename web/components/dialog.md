---
title: Dialog
---

<script setup>
  import Examples from '../share/Example.vue'
  import { onMounted } from 'vue'

  onMounted(() => {
    document.addEventListener("click", (e) => {
      if (e.target.closest("#open-dialog")) {
        const dialog = document.querySelector("an-dialog")
        dialog.setAttribute("open", "true");
      }
    });
  });
</script>

# Avatar

es un componente que se sobreopone en la  ventana principal [ver codigo](https://github.com/angelMarcosCastilla/custon-web-components/blob/main/web/public/Dialog.js)

## Ejemplos

```html
 <an-dialog open >
    <an-dialog-header>
      header
    </an-dialog-header>
    <an-dialog-content>
      contenido
    </an-dialog-content>
    <an-dialog-footer>
      footer
    </an-dialog-footer>
  </an-dialog>
```

<ClientOnly>
  <Examples  url="Dialog.js" >
    <div>
      <button class="btn" id="open-dialog">Open </button>
      <an-dialog style="visibility: hidden; color: black">
        <an-dialog-header>
          header
        </an-dialog-header>
        <an-dialog-content>
          contenido
        </an-dialog-content>
        <an-dialog-footer>
          footer
        </an-dialog-footer>
      </an-dialog>
    </div>  
  </Examples>
</ClientOnly>

## Atributos

| name | type   | default | description                                                      |
| ---- | ------ | ------- | ---------------------------------------------------------------- |
| open  | boolean | false |  para mostrar el componente                                 |
| size | string |         | tamaño maximo del panel de contenido                                 |
