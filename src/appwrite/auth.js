import conf from "../conf/conf.js";
import { Client, Account, ID, Storage } from "appwrite";


export class AuthService {
  client = new Client();
  account;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
    this.storage = new Storage(this.client); // ✅ Initialize storage
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        const session = await this.login({ email, password });
        console.log("Create account session:", session);
        return session;
      } else {
        return userAccount;
      }
    } catch (error) {
      console.error("Create account error:", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(email, password);
      console.log("Login session:", session);
      return session;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  }

  
}

const authService = new AuthService();
export default authService;
