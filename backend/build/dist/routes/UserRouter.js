"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const components_1 = require("../components/");
const router = (0, express_1.Router)();
router.post('/createUser', components_1.UserComponent.createUser);
exports.default = router;
