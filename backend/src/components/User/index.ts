import { Request, Response } from 'express';
import { Types } from 'mongoose';
import User from './model';
import Joi from 'joi';

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
    } catch (error) {
        console.error(`Erro ao buscar o usuário: ${error}`);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

export async function createUser(req: Request, res: Response): Promise<void> {
    const schema = Joi.object({
        name: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().email().required(),
    });

    try {
        const { name, password, email } = req.body;
        const { error } = schema.validate({ name, password, email });
        if (error) {
            console.log('Erro de validação', error);
            res.status(400).json({ error: error.details[0].message });
            return;
        }

        const user = new User({
            name,
            password,
            email,
        });

        await user.save();

        res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
        console.error('Erro ao criar usuário:', error); // Log detalhado
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}
