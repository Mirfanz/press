"use client";

import { Client, Account, Storage } from "appwrite";

import { appwriteConfig } from "@/config/appwrite";

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

export const account = new Account(client);

export const storage = new Storage(client);
