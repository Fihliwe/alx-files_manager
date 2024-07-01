import { createClient } from "redis";
const { promisify } = require('util');

class RedisClient {
    constructor() {
        this.client = createClient();
        this.client.on('error', (err) => console.log(err));
        this.connected = false;
        this.client.on('connect', () => {
            this.connected = true;
        });
    }

    isAlive() {
        return this.connected;
    }

    async get(key) {
        const getAsync = promisify(this.client.set).bind(this.client);
        return await getAsync(key);
    }
    

    async set(key, val, dur) {
        const setAsync = promisify(this.client.set).bind(this.client);
        await setAsync(key, val, 'EX', dur);
    }

    async del(key) {
        const delAsync = promisify(this.client.del).bind(this.client);
        await delAsync(key);
    }
}

    const redisClient = new RedisClient();

    module.exports = redisClient;