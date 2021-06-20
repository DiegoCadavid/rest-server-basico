const { Router } = require('express');
const router = Router();

const Controller = require('../controllers/users');

router.get('/', Controller.getUsers);

router.put('/:id',Controller.putUsers );

router.post('/', Controller.postUsers);

router.patch('/', Controller.patchUsers);

router.delete('/', Controller.deleteUsers);


module.exports = router;