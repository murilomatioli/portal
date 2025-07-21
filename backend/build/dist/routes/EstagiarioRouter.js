"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Estagiario_1 = require("../components/Estagiario");
const AuthMiddleware_1 = require("../config/auth/AuthMiddleware");
const router = (0, express_1.Router)();
//@ts-ignore
//prettier-ignore
router.get('/', Estagiario_1.getEstagiarios);
// @ts-ignore
router.post('/', AuthMiddleware_1.authenticateJWT, Estagiario_1.cadEstagiario);
exports.default = router;
