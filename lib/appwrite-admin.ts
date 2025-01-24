import { appwriteConfig } from "@/config/appwrite";
import { Account, Client } from "node-appwrite";

const adminClient = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setKey(process.env.APPWRITE_API_KEY);

export const account = new Account(adminClient);
