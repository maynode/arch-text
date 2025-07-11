import { defineConfig } from "vite";
import { resolve } from "path";
import { minify } from "terser";

export default defineConfig({
  define: { "process.env": {} },
  build: {
    minify: false,
    outDir: "dist",
    lib: {
      entry: resolve(__dirname, "./src/core.ts"),
      name: "arch-text",
      fileName: `arch-text.min`,
      formats: ["es"],
    },
    rollupOptions: {
      plugins: [
        {
          name: "terser-final-minify",
          async generateBundle(_, bundle) {
            for (const fileName of Object.keys(bundle)) {
              const chunk = bundle[fileName];
              if (
                chunk &&
                chunk.type === "chunk" &&
                typeof chunk.code === "string"
              ) {
                const result = await minify(chunk.code, {
                  compress: {
                    drop_console: true,
                    drop_debugger: true,
                    unused: true,
                    dead_code: true,
                  },
                  mangle: {
                    toplevel: true,
                  },
                  format: {
                    beautify: false,
                    comments: false,
                  },
                });
                if (result.code) {
                  chunk.code = result.code;
                }
              }
            }
          },
        },
      ],
    },
  },
});
