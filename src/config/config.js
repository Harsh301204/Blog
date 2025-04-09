const conf = {
    appWriteUrl : String(import.meta.VITE_APPWRITE_URL),
    appWriteDatabaseId : String(import.meta.VITE_APPWRITE_DATABASE_ID),
    appWriteProjectId : String(import.meta.VITE_PROJECT_ID),
    appWriteCollectionId : String(import.meta.VITE_APPWRITE_COLLECTION_ID),
    appWriteBucketId : String(import.meta.VITE_APPWRITE_BUCKET_ID)
}

export default conf
