
  var books = [
    {"BookID" : "1", "Title" : "Book 1", "Author" : "Author 1"},
    {"BookID" : "2", "Title" : "Book 2", "Author" : "Author 2"},
    {"BookID" : "3", "Title" : "Book 3", "Author" : "Author 3"}
]

function handle_request(msg, callback){
   
    console.log("Inside book kafka backend");
    console.log("Message inside kafka backend : "+msg);

    books.push(msg);
    callback(null, books);
    console.log("After callback in Kafka : ");
};

exports.handle_request = handle_request;


