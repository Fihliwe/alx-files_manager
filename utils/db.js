const { MongoClient } = require("mongodb");

class DBClient {
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATBASE || 'files_manager';
        const url = `mongodb://${host}:${port}/${database}`;

        this.client = new MongoClient(url, {useUnifiedTopology: true});
        this.client.connect();
    }

    isAlive() {
        this.client.connect();
    };

    async nbUsers() {
        return this.client.db.collection('users').count();
    }

    async nbFiles() {
        return this.client.db.collection('files').count();
    }
}
const dbClient = new DBClient();
export default dbClient;
