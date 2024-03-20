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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Password_1 = __importDefault(require("../models/Password"));
const decryptData_1 = __importDefault(require("../lib/decryptData"));
const enctyptData_1 = __importDefault(require("../lib/enctyptData"));
const auth_1 = __importDefault(require("../middleware/auth"));
// Routes
router.get('/', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const passwords = yield Password_1.default.find({ owner: user._id });
        if (!passwords) {
            return res.json({ message: "No passwords found", sucess: false });
        }
        res.json(passwords);
    }
    catch (error) {
        res.send(error);
    }
}));
router.post('/', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { password, websitelink, title, key, email, username, doEncrypt, phone } = req.body;
        if (!password || !title || !key || !email) {
            return res.json({ message: "Password, title, key and email are required", sucess: false });
        }
        if (key.length !== 32) {
            return res.json({ message: "Minimun length of key is 32", sucess: false });
        }
        if (doEncrypt) {
            const encrypted = (0, enctyptData_1.default)(password, key);
            const encryptPassword = yield Password_1.default.create({ password: encrypted, websitelink, title, owner: user._id, email, username, phone });
            return res.json({ message: "Password created successfully", sucess: true });
        }
        const encryptPassword = yield Password_1.default.create({ password, websitelink, title, owner: user._id, email, username, phone });
        res.json({ message: "Password created successfully", sucess: true });
    }
    catch (error) {
        res.send(error);
    }
}));
router.post('/decrypt', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.user._id;
        const { key, passwordId } = req.body;
        if (key.length !== 32) {
            return res.json({ message: "key length must be 32", sucess: false });
        }
        const password = yield Password_1.default.findOne({ _id: passwordId, owner: id });
        if (!password) {
            return res.json({ message: "Password not found", sucess: false });
        }
        const decryptPassword = (0, decryptData_1.default)(password === null || password === void 0 ? void 0 : password.password, key);
        res.json({ password: decryptPassword, sucess: true });
    }
    catch (error) {
        res.send(error.message);
    }
}));
exports.default = router;
