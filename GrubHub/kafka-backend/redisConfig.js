const redis = require('redis')

const redisClient = redis.createClient(6379);

redisClient.on('connect', function(err) {
    if(err) {
        console.log('Error occured while connecting to redis');
    }
    else {
        console.log('Connected to redis');
    }
});

module.exports = redisClient;