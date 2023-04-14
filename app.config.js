import "dotenv/config";

export default {
  expo: {
    name: "Lean Fitness",
    slug: "lean-fitness",
    owner: process.env.OWNER,
    githubUrl: process.env.GITHUB_URL,
    platforms: ["android"],
    version: "1.3.0",
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
      bundleIdentifier: process.env.PACKAGE_NAME,
    },
    android: {
      package: process.env.PACKAGE_NAME,
      adaptiveIcon: {
        foregroundImage: "./assets/icon_foreground.png",
        backgroundColor: "#ffffff",
      },
    },
    extra: {
      eas: { projectId: process.env.PROJECT_ID },
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
