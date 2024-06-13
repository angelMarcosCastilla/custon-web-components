---
title: Time ago
---

<script setup>
import Examples from '../share/Example.vue'
</script>

# Time ago
Componente que muestra cuanto tiempo ha pasado desde una fecha dada. [ver codigo](https://github.com/angelMarcosCastilla/custon-web-components/blob/main/web/public/timeAgo.js)

## Ejemplos

```html
  <an-time-ago
    datetime="2024-06-13T14:39:00"
    languaje="en"
  ></an-time-ago>

  <an-time-ago
    datetime="2024-06-12T14:39:00"
    languaje="es"
  ></an-time-ago>
```

<ClientOnly>
  <Examples  url="timeAgo.js"  >
  <div style="padding: 10px; display: flex; flex-direction: row; gap: 30px;">
    <an-time-ago
      datetime="2024-06-13T14:39:00"
      languaje="en"></an-time-ago>
    <an-time-ago
      datetime="2024-06-12T14:39:00"
      languaje="es"></an-time-ago>
  </div>
</Examples>
</ClientOnly>

## Atributos

| name  | type   | default | description                                                      |
| ----  | ------ | ------- | ---------------------------------------------------------------- |
| datetime  | iso date |         | fecha                                               |
| languaje  | string | es | idioma de la fecha                                               |