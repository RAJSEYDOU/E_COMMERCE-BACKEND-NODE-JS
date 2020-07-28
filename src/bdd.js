const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    // mongoose.set('useFindAndModify', false);
mongoose.connection
    .once("open", function() {
        console.log("connection established with Ecommerce_DB with succes");
    })
    .on("error", function(error) {
        console.log("error occured", error)
    });


module.exports = mongoose;