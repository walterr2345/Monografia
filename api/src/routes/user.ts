import { Router } from "express";
import { UserController } from '../controller/UserController'
import { checkJwt } from "../middlewares/jwt";
import { checkRole } from "../middlewares/role";

const router = Router();

router.get('/', [checkJwt,checkRole(['admin'])], UserController.getAll)
router.get('/user/:id', [checkJwt], UserController.getById)
router.post('/', [checkJwt, checkRole(['admin'])], UserController.newUser)
router.patch('/:id', [checkJwt], UserController.editUser)
router.delete('/deletUser/:id', [checkJwt], UserController.deleteUser)

export default router