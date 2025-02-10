declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    APPWRITE_API_KEY: string;
    NEXT_PUBLIC_HOSTNAME: string;
  }
}
