const bcryptjs = require('bcryptjs');
const { check } = require('express-validator');

const { existeEmail } = require("../helpers/validar-db");
const Users = require("../models/user");


const getUsers = async(req, res)=>{

    const query = {estado:true};

    const users = await Users.find(query);
    
    res.json(users);
}

const getUser = async(req, res)=>{

    const {id} = req.params;

    const user = await Users.findById(id);

    res.json(user);
}

const postUser = async(req, res)=>{

    const {name, password, email, rol} = req.body;
   
    const user = new Users({name, password, email, rol});

    // Encriptar password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(toString(password), salt);

    // Guardar en DB
    await user.save();
    
    res.json(user);
}

const updateUser = async(req, res)=>{

   
    const {id} = req.params;

    const {name, password, email} = req.body;

    // Comprobar correo
    let error; 
    if(email){

            check(email).isEmail();
           await existeEmail(email)
            .catch(err => {
              
                error = err;
            });
    }

    if(error){
        return res.status(400).json({msg: 'El correo ya existe'});
    }

    // Actualizar
    const user = await Users.findByIdAndUpdate(id, {name, password, email}, {new: true});

    if(password){
        // Encriptar password
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(toString(password), salt);
    }
   

    res.json(user);
    
}

const deleteUser = async(req, res)=>{

    const {id} = req.params;
   
    const user = await Users.findByIdAndUpdate(id, {estado: false});

    res.json(user);
}

module.exports = {
    getUsers,
    getUser,
    postUser,
    updateUser,
    deleteUser
}