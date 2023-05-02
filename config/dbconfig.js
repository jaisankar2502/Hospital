const mongoose= require('mongoose');


const connectDatabase = async ()=>{
    try {
         const connect = await mongoose.connect(process.env.URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
          }
         );

         console.log("Database connected",connect.connection.host,
         connect.connection.name);

    } catch (error) {
        
  console.log("Database connected a Failed",error);
  process.exit(1)
    }
}
module.exports = connectDatabase;