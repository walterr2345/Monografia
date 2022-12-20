import { IsNotEmpty, MinLength,isEmail, IsEmail } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from "typeorm"
import * as bcrypts from 'bcryptjs'

@Entity()
@Unique(['username'])
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @MinLength(6)
    @IsEmail()
    @IsNotEmpty()
    username: string

    @Column()
    @MinLength(6)
    @IsNotEmpty()
    password: string

    @Column()
    @IsNotEmpty()
    role: string

    @Column()
    @CreateDateColumn()
    createdAt: number

    @Column()
    @UpdateDateColumn()
    updatedAt: number

    hashPassword(): void {
        const salt = bcrypts.genSaltSync(10);
        this.password = bcrypts.hashSync(this.password, salt)
    }
    checkPassword(password: string): Boolean {

        if (password === this.password) {
            return true
        } else {
            return false
        }

        // return bcrypts.compareSync(password, this.password)
    }
}
