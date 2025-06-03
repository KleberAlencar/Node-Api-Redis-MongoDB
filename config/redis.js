'use strict';

const redis = require('redis');

const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://:secret123456@127.0.0.1:6379'
});

(async () => {
  redisClient.on("error", (err) => {
    console.error("Redis cliet error: ", err);
  });
  redisClient.on("connect", () => {
    console.log("Redis client started");
  });

  await redisClient.connect();
})();

module.exports = redisClient;