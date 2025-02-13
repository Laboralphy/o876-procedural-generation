import json from '@rollup/plugin-json';

export default {
    input: "src/main.js",
    output: {
        file: "web/dist/bundle.js",
        format: "iife", // Format auto-exécutable compatible avec les navigateurs
        sourcemap: true
    },
    plugins: [json()]
}