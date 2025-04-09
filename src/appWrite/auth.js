import conf from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({ userEmail, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), userEmail, password, name)
            if (userAccount) {
                return this.login({ userEmail, password })
            } else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    async login({ userEmail, password }) {
        try {
            return await this.account.createEmailPasswordSession(userEmail, password);
        } catch (error) {
            throw error;
        }
    }

    async getUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("AppWrite Service : getUser : error : ",error)
        }

        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService