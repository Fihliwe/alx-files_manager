const { MongoClient } = require("mongodb");
import mongodb from 'mongodb';

class DBClient {
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATBASE || 'files_manager';
        const url = `mongodb://${host}:${port}/${database}`;

        this.client = new mongodb.MongoClient(url, { useUnifiedTopology: true });
        this.client.connect();
    };

    isAlive() {
        this.client.isConnected();
    };

    async nbUsers() {
        let usersCount = await db().collection('users').countDocuments();
        return usersCount;
    };

    async nbFiles() {
        let filesCount =  await this.client.db().collection('files').countDocuments();
        return filesCount;
    };
}
const dbClient = new DBClient();
export default dbClient;
