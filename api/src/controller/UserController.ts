import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { validate } from 'class-validator'


const userRepository = AppDataSource.getRepository(User)

export class UserController {


    static getAll = async (_req: Request, res: Response) => {
        let users
        try {
            users = await userRepository.find()

        } catch (error) {
            res.status(404).json({ message: `No users result ` })
            throw error
        }
        if (users.length > 0) {
            res.send(users)
        }
    }

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const user = await userRepository.findOneBy({ id: parseInt(id) })
            res.send(user)

        } catch (error) {
            res.status(404).json({ message: `No User Fund` })
            throw error
        }
    }

    static newUser = async (req: Request, res: Response) => {
        const { username, password, role } = req.body

        const user = new User();

        user.username = username;
        user.password = password;
        user.role = role;


        const validationOption = { validationError: { target: false, value: false } }
        const errors = await validate(user, validationOption)
        if (errors.length > 0) {
            return res.status(400).json(errors)
        }

        try {
            user.hashPassword();
            const newUser = await userRepository.save(user)
            res.status(201).json({ message: `User Created`, data: newUser })

        } catch (error) {
            res.status(409).json({ message: `UserName already exists` })
            throw error
        }
        res.send(200).json({ message: `Usuario ya existe` })
    }

    static editUser = async (req: Request, res: Response) => {
        let user;
        const { id } = req.params
        const { username, role } = req.body;


        try {
            user = await userRepository.findOneBy({ id: parseInt(id) })
            user.username = username;
            user.role = role;
        } catch (error) {
            return res.status(404).json({ message: `User not found` })
        }

        const validationOption = { validationError: { target: false, value: false } }
        const errors = await validate(user, validationOption)

        if (errors.length > 0) {
            return res.status(400).json(errors)
        }

        try {
            await userRepository.save(user);
        } catch (error) {
            return res.status(409).json({ message: `User already exits` })
        }
        res.send(201).json({ message: `Userupdate` })
    }

    static deleteUser = async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const user = await userRepository.findOneBy({ id: parseInt(id) })
            res.send(user)

        } catch (error) {
            res.status(404).json({ message: `No User Fund` })
            throw error
        }

        userRepository.delete({ id: parseInt(id) })
        res.status(201).json({ message: `User deleted` })
    }

}

export default UserController