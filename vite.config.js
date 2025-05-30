import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    // server:{
    //     host:'192.168.211.16',
    //     port: 5173,
    //     cors: {
    //         origin: '*',
    //         credentials: true,
    //     }
    // }
});
