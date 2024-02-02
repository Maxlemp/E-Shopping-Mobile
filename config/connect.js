const mongoose =  require("mongoose");
mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("connected to db"))
.catch(() => console.log("error"));

module.exports = {
    Connect: async() =>{
    await mongoose
            .connect(process.env.MONGO_URI)
            .then((conn) => console.log(`connected on ${conn.connection.host}`))
            .catch(() => console.log("error"));
    },
};
