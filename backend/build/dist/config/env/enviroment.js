"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//desenvolvimento
const devEnviroment = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: {
        mongo_host: 'mongodb://127.0.0.1:27017', //local
        mongo_db: 'portal',
    },
};
//producao
const prodEnviroment = {
    PORT: 8000,
    MONGO_URI: {
        mongo_host: 'mongodb://127.0.0.1:27017',
        mongo_db: 'portal',
    },
};
//teste
const testEnviroment = {
    PORT: process.env.PORT || 4200,
    MONGO_URI: {
        mongo_host: 'mongodb://127.0.0.1:27017',
        mongo_db: 'test_db_portal',
    },
};
const envConfig = {
    development: devEnviroment,
    production: prodEnviroment,
    test: testEnviroment,
};
// exporta sendo o ambiente de dev o padrão
exports.default = envConfig[process.env.NODE_ENV || 'development'];
