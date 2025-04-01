"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const components_1 = require("../components");
const AuthMiddleware_1 = require("../config/auth/AuthMiddleware");
const router = (0, express_1.Router)();
//@ts-ignore
//prettier-ignore
router.post('/cadEstagiario', AuthMiddleware_1.authenticateJWT, components_1.EstagiarioComponent.cadEstagiario);
router.get('/getEstagiario', components_1.EstagiarioComponent.getEstagiarios);
exports.default = router;
