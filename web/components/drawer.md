---
title: Drawer
---

<script setup>
import { onMounted } from 'vue'
import Examples from '../share/Example.vue'
onMounted(() => {
 const BUTTON_CLASS = ".button-drawer";
 document.addEventListener("click", (e) => {
  if (e.target.closest(BUTTON_CLASS)) {
    const drawer = document.querySelector("an-drawer")
    const {side} = e.target.dataset
    drawer.setAttribute("side", side)
    setTimeout(() => {
      drawer.setAttribute("open", "true")
    }, 300)
  
  }
  });
})

</script>

# Drawer

Un componente para mostrar un panel de contenido, con un header, footer y contenido. [ver codigo](https://github.com/angelMarcosCastilla/custon-web-components/blob/main/src/drawer.js)

## Ejemplos

```html
<an-drawer style="visibility: hidden;">
  <an-drawer-header>Header</an-drawer-header>
  <an-drawer-content>
    <div>content</div>
  </an-drawer-content>
  <an-drawer-footer>footer</an-drawer-footer>
</an-drawer>
```

<ClientOnly>
  <Examples  url="drawer.js"  >
  <div style="display: flex; flex-direction: row; gap: 20px;">
  <button class="button-drawer btn" data-side="left">left</button>
  <button class="button-drawer btn" data-side="right">right</button>
  <button class="button-drawer btn" data-side="bottom">bottom</button>
  <button class="button-drawer btn" data-side="top">top</button>
  </div>
    <Teleport to="body">
      <an-drawer style="visibility: hidden; color:black" side="left" size="500">
        <an-drawer-header>Header</an-drawer-header>
        <an-drawer-content>
          <div>content</div>
        </an-drawer-content>
        <an-drawer-footer>footer</an-drawer-footer>
      </an-drawer>
    </Teleport>
</Examples>
</ClientOnly>

## Atributos

| name  | type   | default | description                                                      |
| ----  | ------ | ------- | ---------------------------------------------------------------- |
| open  | string |    false     |  para mostrar el componente                                 |
| size  | string |   600      | tamaño del panel de contenido                                 |
| side | left, right, bottom, top | left | posición del panel de contenido                    |
