import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';


export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
        visualizer({
            open: true,
            gzipSize: true,
          }),
    ],
    build:{
        rollupOptions: {
            output: {
              manualChunks: {
                pdf: ['@react-pdf/renderer'],
              },
            },
          },
        chunkSizeWarningLimit: 2000, // atau 2000 jika perlu
    },
    // server:{
    //     host:'192.168.211.16',
    //     port: 5173,
    //     cors: {
    //         origin: '*',
    //         credentials: true,
    //     }
    // }
});
