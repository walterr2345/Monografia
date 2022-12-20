import { AppDataSource } from '../data-source'
import { Request, Response } from "express";
import { User } from "../entity/User";
import config from '../config/config';
import * as jwt from 'jsonwebtoken'
import { validate } from 'class-validator';

const userRepository = AppDataSource.getRepository(User)

class AuthController {

    static login = async (req: Request, res: Response) => {
        const { username, password } = req.body


        if (!(username && password)) {
            res.status(400).json({ messsage: `username and Password is requiered` })
        }

        let user: User;

        try {
            user = await userRepository.findOne({
                where: { username: username }
            })
        } catch (error) {
            return res.status(500).json({ message: `Username or password is incorrecto` })
        }


        if (!user.checkPassword(password)) {
            return res.status(500).json({ message: `Username or password is fail` })
        }

        const token = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecret, { expiresIn: '1h' })
        res.json({ message: 'ok', token })
    }

    static changePassword = async (req: Request, res: Response) => {
        const { userId } = res.locals.jwtPayload;
        const { oldPassword, newPassword } = req.body

        if (!(oldPassword && newPassword)) {
            res.status(400).json({ message: 'Old password and new password is requiered' })
        }
        let user: User

        try {
            user = await userRepository.findOneBy({ id: parseInt(userId) })
        } catch (error) {
            res.status(400).json({ message: `Someting go wrong` })
        }

        if (!user.checkPassword(oldPassword)) {
            return res.status(401).json({ message: 'Contraseña incorrecta' })
        }

        user.password = newPassword

        const validationOps = { validationError: { target: false, values: false } }
        const errors = await validate(user, validationOps)

        if (errors.length > 0) {
            return res.status(400).json(errors)
        }

        user.hashPassword();
        userRepository.save(user)
        res.json({ message: `Contrseña cambiada correctamenta` })

    }
}

export default AuthController