
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.23c1e51ca30d49e09b83af86d7cc9e3f',
  appName: 'bharat-stock-ai-insight',
  webDir: 'dist',
  server: {
    url: "https://23c1e51c-a30d-49e0-9b83-af86d7cc9e3f.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: null,
      keystoreAlias: null,
    }
  }
};

export default config;
