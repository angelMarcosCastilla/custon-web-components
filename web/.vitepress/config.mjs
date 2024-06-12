import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "custom web components",
  description: "este pagina tiene web components reutilizables",
  themeConfig: {
    sidebar: {
      "/components/": [
        {
          text: "components",
          items: [
            {
              text: "drawer",
              link: "/components/drawer",
            },
            {
              text: "time-ago",
              link: "/components/time-ago",
            },
            {
              text: "avatar",
              link: "/components/avatar",
            },
            {
              text: "inner-text",
              link: "/components/inner-text",
            },
          ],
        },
      ],
    },
  },
  
});
