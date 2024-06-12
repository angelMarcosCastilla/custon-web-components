import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "web components",
  description: "este pagina tiene web components reutilizables",
  themeConfig: {
    sidebar: {
      "/components/": [
        {
          text: "components",
          items: [
            {
              text: "avatar",
              link: "/components/avatar",
            },
            {
              text: "drawer",
              link: "/components/drawer",
            },
            {
              text: "time-ago",
              link: "/components/time-ago",
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
