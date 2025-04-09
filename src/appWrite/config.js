import conf from "../config/config";
import { Client, Account, ID , Databases , Storage, Query} from "appwrite";

export class Service {
    client = new Client()
    databases;
    bucket;

    constructor() {
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId)

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client);
    }

    async createPost({tittle , slug , content , status , userId , imageId}) {
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    tittle,
                    content,
                    imageId,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Service Error :: createPost :: error :",error)
        }
    }

    async updatePost(slug , {tittle , content , status , imageId}) {
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    tittle,
                    content,
                    imageId,
                    status
                }
            )
        } catch (error) {
            console.log("Service Error :: createPost :: error :",error)
        }
    }

    async deletePost(slug) {
        try {
             await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )

            return true;
        } catch (error) {
            console.log("Service Error :: createPost :: error :",error)
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocumentDocument(
               conf.appWriteDatabaseId,
               conf.appWriteCollectionId,
               slug
           )

           
       } catch (error) {
           console.log("Service Error :: createPost :: error :",error)
           
       }
    }

    async getPosts(queries = [Query.equal("status","Active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                queries
                
            )
        } catch (error) {
            console.log("Service Error :: createPost :: error :",error)
        }
    }

    // Upload Images

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Service Error :: createPost :: error :",error)
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
             await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
                
            )
            return true;
        } catch (error) {
            console.log("Service Error :: createPost :: error :",error)
            return false;
        }
    }

    async getFilePreview(fileId) {
        try {
            return await this.Storage.getFilePreview(
                conf.appWriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Service Error :: createPost :: error :",error)
        }
    }

}

const service = new Service();
export default service;