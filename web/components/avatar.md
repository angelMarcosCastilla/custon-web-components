---
title: Avatar
---

<script setup>
import Examples from '../share/Example.vue'
</script>

# Avatar

Un componente para mostrar una imagen, cuenta con un fallback. Si no hay imagen o no es válida tomaría las iniciales del atributo. `name` para mostrar como texto y con colores que se calcula automáticamente. [ver codigo](https://github.com/angelMarcosCastilla/custon-web-components/blob/main/web/public/Avatar.js)

## Ejemplos

```html
// muestra la imagen
<an-avatar
  size="lg"
  src="https://avatars.githubusercontent.com/u/78944493?s=96&v=4"
  alt="avatar"
  name="Angel Marcos"
></an-avatar>

// si no hay imagen o no es valida, muestra el nombre
<an-avatar size="md" alt="avatar" name="Angel Marcos"></an-avatar>

// por defecto
<an-avatar size="sm"></an-avatar>
```

<ClientOnly>
  <Examples  url="Avatar.js" >
    <div style="display: flex; flex-direction: row; gap: 20px; align-items: center;">
    <an-avatar
      size="lg"
  src="https://avatars.githubusercontent.com/u/78944493?s=96&v=4"
  alt="avatar"
  name="Angel Marcos"
></an-avatar>

<an-avatar size="md" alt="avatar" name="Angel Marcos"></an-avatar>

<an-avatar size="sm"></an-avatar>
</div>
</Examples>
</ClientOnly>

## Atributos

| name | type   | default | description                                                      |
| ---- | ------ | ------- | ---------------------------------------------------------------- |
| src  | string |         | url de la imagen                                                 |
| alt  | string |         | descripción de la imagen                                         |
| name | string |         | nombre adicional si en caso no hay imagen, obtiene las iniciales |
| size | sm, md, lg | sm      | tamaño de la imagen                                              |
