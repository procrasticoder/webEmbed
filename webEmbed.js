define(["qlik"], function (qlik) {
  return {
    support: {
      snapshot: true,
      export: true,
      exportData: false,
    },
    definition: {
      type: "items",
      component: "accordion",
      items: {
        embedOptions: {
          type: "items",
          label: "Embed Options",
          items: {
            embedType: {
              type: "string",
              component: "buttongroup",
              label: "Embed Type",
              ref: "custom.embedType",
              options: [
                {
                  value: "iframe",
                  label: "iFrame",
                },
                {
                  value: "link",
                  label: "Link",
                },
              ],
              defaultValue: "iframe",
            },
            link: {
              type: "string",
              label: (d) => {
                return d.custom.embedType === "link" ? "Link" : "iFrame";
              },
              ref: "custom.link",
              expression: "optional",
            },
          },
        },
        settings: {
          uses: "settings",
        },
      },
    },
    paint: function ($element, layout) {
      function renderIFrame() {
        let html =
          layout.custom.embedType === "iframe"
            ? layout.custom.link.slice(0, 7).toLowerCase() === "<iframe"
              ? layout.custom.link
              : "Invalid iFrame."
            : layout.custom.link.slice(0, 4).toLowerCase() === "http"
              ? `<iframe frameborder="0" src="${layout.custom.link}" style="height: 100%; width: 100%;"></iframe>`
              : "Invalid Link.";
        $element.html(html);
      }
      //add your rendering code here
      layout.custom.link.length > 0
        ? renderIFrame()
        : $element.html("Please provide a link to embed.");
      //renderIFrame();

      //needed for export
      return qlik.Promise.resolve();
    },
  };
});
