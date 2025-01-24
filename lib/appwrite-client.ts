"use client";

import { appwriteConfig } from "@/config/appwrite";
import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

export const account = new Account(client);
