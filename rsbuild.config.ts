import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],

  server: {
    port: 1420,
    strictPort: true,
},
  tools: {
    rspack: {
        watchOptions: {
            ignored: "**/src-tauri/**"
        }
    }
}
});
