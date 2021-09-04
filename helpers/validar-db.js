const Users = require("../models/user")

const existeEmail = async(email = '')=>{
    const emailExiste = await Users.findOne({email});

    if(emailExiste){
        throw new Error(`El email ${email} ya existe`);
    }
}

const existeUser = async(id)=>{
    const user = await Users.findById(id);
    if(!user){
        throw new Error(`El usuario con el id ${id} no existe`);
    }
}


module.exports = {
    existeEmail,
    existeUser
}