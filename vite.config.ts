import { defineConfig } from 'vite' 
import react from '@vitejs/plugin-react' 
export default defineConfig({ plugins: [react()], server: { allowedHosts: ['postcard-galley-penalty.ngrok-free.dev'], }, })