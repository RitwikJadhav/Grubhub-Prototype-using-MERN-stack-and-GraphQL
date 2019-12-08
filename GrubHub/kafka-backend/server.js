//topics files
//var signin = require('./services/signin.js');
var createUser = require('./services/createUser');
var createUserOwner = require('./services/createUserOwner');
var getProfileBuyer = require('./services/getProfileBuyer');
var updateProfileBuyer = require('./services/updateProfileBuyer');
var updateProfileOwner = require('./services/updateProfileOwner');
var createItem = require('./services/createItem');
var createSection = require('./services/createSection');
var getMenu = require('./services/getMenu');
var deleteItem = require('./services/deleteItem');
var deleteSection = require('./services/deleteSection');
var getSections = require('./services/getSections');
var getItems = require('./services/getItems');
var updateSection = require('./services/sectionUpdate');
var getSearchedItems = require('./services/itemToSearch');
var updateItem = require('./services/itemUpdate');
var getRestaurantSections = require('./services/getRestaurantSections');
var getRestaurantItems = require('./services/getRestaurantItems');
var getRestaurantOrders = require('./services/getOrderForRestaurant');
var createOrders = require('./services/createOrders');
var updateOrderStatus = require('./services/updateOrder');
var getActiveOrders = require('./services/getActiveOrders');
var getDeliveredOrders = require('./services/getDeliveredOrders');
var sendMessage = require('./services/sendMessage');
var getMessage = require('./services/getMessage');
var sendReply = require('./services/sendReply');
var getReply = require('./services/getReply');
const mongoose = require('mongoose');
var connection = require('./kafka/Connection');

mongoose.connect('mongodb+srv://root:ritwik@grubhub-pqhor.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser : true, poolSize : 10
},{
    userMongoClient : true
},{
    useUnifiedTopology: true
})

mongoose.set('useFindAndModify', false);

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('Kafka Backend : Server is running ');
    console.log('Topic Request handler attached with ',topic_name);
    consumer.on('message', function (message) {
        console.log('Message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('Request has been handled by the Kafka server');
            console.log('After Request is handled in Kafka : '+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log('Kafka-Backend : Inside server file : '+data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
//handleTopicRequest("post_book",Books)
handleTopicRequest("get_searched_items",getSearchedItems);


