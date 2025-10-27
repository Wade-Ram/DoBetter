import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',        // Firebase Hosting output folder
    emptyOutDir: true,     // Clear old build files
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        afrikaans: resolve(__dirname, 'afrikaans.html'),
        article1: resolve(__dirname, 'article1.html'),
        blog: resolve(__dirname, 'blog.html'),
        contact: resolve(__dirname, 'contact.html'),
        english: resolve(__dirname, 'english.html'),
        FAQs: resolve(__dirname, 'faqs.html'),
        geography: resolve(__dirname, 'geography.html'),
        'life-science': resolve(__dirname, 'life-science.html'),
        math: resolve(__dirname, 'math.html'),
        privacypol: resolve(__dirname, 'privacypol.html'),
        profile: resolve(__dirname, 'profile.html'),
        'signup-login': resolve(__dirname, 'signup-login.html'),
        subjects: resolve(__dirname, 'subjects.html'),
        termsofservice: resolve(__dirname, 'termsofservice.html'),
        premium: resolve(__dirname, 'premium.html'), // 👈 Add this line
      }
    }
  }
});
