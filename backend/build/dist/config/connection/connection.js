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
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
console.log(process.env.MONGO_HOST);
let singleton;
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    if (singleton)
        return singleton;
    const mongoUri = `${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`;
    const client = new mongodb_1.MongoClient(mongoUri);
    try {
        yield client.connect();
        singleton = client.db(process.env.MONGO_DATABASE);
        console.log('Conexão com MongoDB estabelecida!');
        return singleton;
    }
    catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        throw error;
    }
});
