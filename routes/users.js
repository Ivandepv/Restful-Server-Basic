const { Router } = require("express");
const { check } = require("express-validator");
const { getUsers, getUser, postUser, updateUser, deleteUser } = require("../controllers/users");
const { existeEmail, existeUser } = require("../helpers/validar-db");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

// Basic Validate
router.get('/', getUsers);

router.get('/:id',[
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom(existeUser),
    validarCampos
], getUser);

router.post('/',[
    check('name').notEmpty(),
    check('password', 'Debe tener mas de 6 letras').isLength({min: 6, max: 40}),
    check('email').isEmail(),
    check('email').custom(existeEmail),
    validarCampos
], postUser);

router.put('/:id',[
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom(existeUser),
    validarCampos
], updateUser);

router.delete('/:id',[
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom(existeUser),
    validarCampos
] ,deleteUser);


module.exports = router;