const express = require('express')
const router = express.Router()

const verifyToken = require('../middleware/auth')

const postController = require('../Controllers/PostController')

router.post('/create', verifyToken, postController.create)
router.put('/:id', verifyToken, postController.update)
router.delete('/:id', verifyToken, postController.delete)
router.get('/', verifyToken, postController.show)

module.exports = router