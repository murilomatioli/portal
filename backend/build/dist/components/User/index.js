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
exports.createUser = createUser;
const mongoose_1 = require("mongoose");
const model_1 = __importDefault(require("./model"));
const joi_1 = __importDefault(require("joi"));
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                res.status(400).json({ error: 'ID inválido' });
                return;
            }
            const user = model_1.default.findById(id);
            if (!user) {
                res.status(404).json({ error: 'Usuário não encontrado' });
                return;
            }
        }
        catch (error) {
            console.error(`Erro ao buscar o usuário: ${error}`);
            res.status(500).json({ error });
        }
    });
}
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = joi_1.default.object({
            name: joi_1.default.string().required(),
            password: joi_1.default.string().required(),
            email: joi_1.default.string().email().required(),
        });
        try {
            const { name, password, email } = req.body;
            const { error } = schema.validate({ name, password, email });
            if (error) {
                res.status(400).json({ error });
                return;
            }
            const user = new model_1.default({
                name,
                password,
                email,
            });
            if (!user) {
                console.log('informacoes faltando');
            }
            else {
                console.log(user);
            }
            yield user.save();
            res.status(201).json({ message: 'Usuário criado com sucesso!' });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor ..' });
        }
    });
}
