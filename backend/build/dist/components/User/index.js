"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = getUser;
exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.loginUser = loginUser;
exports.deleteUser = deleteUser;
exports.putUser = putUser;
const mongoose_1 = require("mongoose");
const model_1 = __importDefault(require("./model"));
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = require("../../config/bcrypt/bcrypt");
const bcrypt_2 = require("bcrypt");
const AuthService_1 = require("../../config/Auth/AuthService");
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                res.status(400).json({ error: 'ID inválido' });
                return;
            }
            const user = yield model_1.default.findById(id);
            if (!user) {
                res.status(404).json({ error: 'Usuário não encontrado' });
                return;
            }
            res.status(200).json(user);
            return;
        }
        catch (error) {
            console.error(`Erro ao buscar o usuário: ${error}`);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
    });
}
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield model_1.default.find();
            if (!users) {
                res.status(404).json({ message: 'Não há usuários cadastrados' });
                return;
            }
            res.status(200).json(users);
            return;
        }
        catch (error) {
            res.status(500).json({ error });
            return;
        }
    });
}
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = joi_1.default.object({
            name: joi_1.default.string().alphanum().min(4).required(),
            password: joi_1.default.string().min(8).required(),
            email: joi_1.default.string().email().required(),
            profile: joi_1.default.string().required(),
        });
        try {
            let { name, password, email, profile } = req.body;
            const checkEmailExist = yield model_1.default.findOne({ email });
            if (checkEmailExist) {
                res.status(409).json({
                    message: 'Já existe alguém com esse email.',
                });
                return;
            }
            if (!profile) {
                profile = 'user';
            }
            const { error } = schema.validate({ name, password, email, profile });
            if (error) {
                console.log('Erro de validação', error);
                res.status(400).json({ error: error.details[0].message });
                return;
            }
            const hash = yield (0, bcrypt_1.hashPassword)(password);
            const user = new model_1.default({
                name,
                password: hash,
                email,
            });
            yield user.save();
            res.status(201).json({ message: 'Usuário criado com sucesso!' });
        }
        catch (error) {
            console.error('Erro ao criar usuário:', error);
            res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    });
}
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = joi_1.default.object({
            password: joi_1.default.string().required(), //validacao dos dados
            email: joi_1.default.string().email().required(),
        });
        try {
            const { email, password } = req.body;
            const { error } = schema.validate({ email, password });
            if (error) {
                console.error('Erro de validação', error);
                res.status(400).json({ error: error.details[0].message });
            }
            const findEmail = yield model_1.default.findOne({ email });
            if (!findEmail) {
                console.error('Não há ninguém com este email.');
                res.status(400).json({
                    message: 'Não há ninguém cadastrado com esse email',
                });
                return;
            }
            const matchPassword = (0, bcrypt_2.compareSync)(password, findEmail.password); //verificação do bcrypt
            if (matchPassword) {
                const token = (0, AuthService_1.generateToken)(findEmail._id.toString(), findEmail.profile);
                res.status(200).json({
                    message: `Logado com sucesso como ${findEmail.name}!`,
                    token,
                });
                return;
            }
            res.status(401).json({ message: 'Usuário ou senha incorretos' });
            return;
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
    });
}
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                res.status(400).json({ error: 'ID inválido' });
                return;
            }
            const user = yield model_1.default.findByIdAndDelete(id);
            if (!user) {
                res.status(404).json({
                    error: 'Usuário não encontrado para ser deletado',
                });
                return;
            }
            res.status(200).json({
                message: `Usuário ${user.name} deletado com sucesso!`,
            });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    });
}
function putUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const updates = req.body;
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            res.status(400).json({ error: 'ID inválido.' });
            return;
        }
        updates.password = yield (0, bcrypt_1.hashPassword)(updates.password);
        try {
            const user = yield model_1.default.findByIdAndUpdate(id, updates, {
                new: true, //usuário atualizado
                runValidators: true, //verifica o schema antes de atualizar
            });
            if (!user) {
                res.status(404).json({ error: 'Usuário não encontrado.' });
                return;
            }
            res.status(200).json({
                message: 'Usuário atualizado com sucesso ',
                user,
            });
        }
        catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    });
}
