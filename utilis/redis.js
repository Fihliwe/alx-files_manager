import { rejects } from "assert";
import { resolve } from "path";
import { createClient } from "redis";
import { connect } from "superagent";

class RedisClient {
    constructor() {
        this.client = createClient();

        this.client.on('error', (err) => {
            console.log('Redis client not connected to the server:', err.toString());
          });
        
    }

    isAlive() {
        return this.client.connect;
    }

    async get(key) {
        return new Promise((resolve, reject) => {

            this.client.get(key, (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(reply);
                }
            });
        });
    };

    async set(key, value, duration) {
        return new Promise((resolve, reject) => {
            this.client.set(key,value, duration, (err,reply) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(err);
                }
            });
        });
    };

    async del(key) {
        return new Promise((resolve,reject) => {
            this.client.del(key, (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(err);
                }
            });
        });
    };
};

const redisClient = new RedisClient();

module.exports = redisClient;