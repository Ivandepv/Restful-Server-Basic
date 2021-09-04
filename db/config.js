const mongoose  = require("mongoose");

const dbConnection = async()=>{
    try {

        // 2 Opciones que antes eran obligatorias fueron removidas
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
   
}


module.exports =  {
    dbConnection
}