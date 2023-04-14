import "dotenv/config";

export default {
  expo: {
    name: "Lean Fitness",
    slug: "lean-fitness",
    owner: "kushendesilva",
    githubUrl: "https://github.com/kushendesilva/lean-fitness",
    platforms: ["android"],
    version: "2.1.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "npc.cipher.leanfitness",
    },
    android: {
      package: "npc.cipher.leanfitness",
      adaptiveIcon: {
        foregroundImage: "./assets/icon_foreground.png",
        backgroundColor: "#ffffff",
      },
    },
    extra: {
      eas: { projectId: "9bdddd60-4660-495d-8796-e203b10ac528" },
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
    },
  },
};
