"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const components_1 = require("../components");
const router = (0, express_1.Router)();
router.post('/cadEstagiario', components_1.EstagiarioComponent.cadEstagiario);
router.get('/getEstagiario', components_1.EstagiarioComponent.getEstagiarios);
exports.default = router;
