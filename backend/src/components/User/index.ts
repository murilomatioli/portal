import { Request, Response } from 'express';
import { Types } from 'mongoose';
import User from './model';
import Joi from 'joi';
import { hashPassword } from '../../config/bcrypt/bcrypt';
import { compareSync } from 'bcrypt';
import { generateToken } from '../Auth/AuthService';

export async function getUser(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
        if (!Types.ObjectId.isValid(id)) {
            res.status(400).json({ error: 'ID inválido' });
            return;
        }
        const user = await User.findById(id); // Adicionado await
        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }

        res.status(200).json(user); // Retorna o usuário encontrado
        return;
    } catch (error) {
        console.error(`Erro ao buscar o usuário: ${error}`);
        res.status(500).json({ error: 'Erro interno do servidor' });
        return;
    }
}

export async function createUser(req: Request, res: Response): Promise<void> {
    const schema = Joi.object({
        name: Joi.string().alphanum().min(4).required(),
        password: Joi.string().min(8).required(),
        email: Joi.string().email().required(),
        profile: Joi.string().required(),
    });

    try {
        let { name, password, email, profile } = req.body;

        if (!profile) {
            profile = 'user';
        }
        const { error } = schema.validate({ name, password, email, profile });

        if (error) {
            console.log('Erro de validação', error);
            res.status(400).json({ error: error.details[0].message });
            return;
        }

        const hash = await hashPassword(password);

        const user = new User({
            name,
            password: hash,
            email,
        });

        await user.save();

        res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

export async function loginUser(req: Request, res: Response): Promise<void> {
    const schema = Joi.object({
        password: Joi.string().required(), //validacao dos dados
        email: Joi.string().email().required(),
    });

    try {
        const { email, password } = req.body;
        const { error } = schema.validate({ email, password });

        if (error) {
            console.error('Erro de validação', error);
            res.status(400).json({ error: error.details[0].message });
        }

        const findEmail = await User.findOne({ email });
        if (!findEmail) {
            console.error('Não há ninguém com este email.');
            res.status(400).json({
                message: 'Não há ninguém cadastrado com esse email',
            });
            return;
        }
        const matchPassword = compareSync(password, findEmail.password); //verificação do bcrypt
        if (matchPassword) {
            const token = generateToken(
                (findEmail._id as Types.ObjectId).toString()
            );

            res.status(200).json({
                message: `Logado com sucesso como ${findEmail.name}!`,
                token,
            });
            return;
        }

        res.status(401).json({ message: 'Usuário ou senha incorretos' });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
        return;
    }
}

export async function putUser(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const updates = req.body;

    if (!Types.ObjectId.isValid(id)){
        res.status(400).json({error: 'ID inválido.'});
        return;
    }

    try {
        const user = await User.findByIdAndUpdate(id, updates, {
            new: true, //usuário atualizado
            runValidators: true //verifica o schema antes de atualizar
        });

        if(!user){
            res.status(404).json({error: 'Usuário não encontrado.'});
            return;
        }

        res.status(200).json({message: 'Usuário atualizado com sucesso ', user});
    } catch (error){
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}