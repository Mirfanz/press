import { Account, Client, Databases, Users } from "node-appwrite";

import { appwriteConfig } from "@/config/appwrite";

const adminClient = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setKey(process.env.APPWRITE_API_KEY)
  .setSelfSigned(true);

export const account = new Account(adminClient);

export const db = new Databases(adminClient);

export const users = new Users(adminClient);
