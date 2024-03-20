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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const auth_1 = __importDefault(require("../middleware/auth"));
//  Create User
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = {
            username: req.body.username,
            email: req.body.email,
            password: yield bcrypt_1.default.hash(req.body.password, 10),
        };
        const user = yield User_1.default.create(body);
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.SECRET);
        res.send({ token, sucess: true, name: user.username, email: user.email });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}));
//  login User
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ email: req.body.email });
        if (!user)
            return res.json({ message: "Wrong Credentials", sucess: false });
        if (!(yield bcrypt_1.default.compare(req.body.password, user.password)))
            return res.json({ message: "Wrong Credentials", sucess: false });
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.SECRET);
        res.json({ token, sucess: true, name: user.username, email: user.email });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}));
//  Get User
router.get("/me", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.user._id;
        const user = yield User_1.default.findOne({ _id: id }).select("-password");
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}));
//  Edit User
router.patch("/edit", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.user._id;
        const user = yield User_1.default.findOne({ _id: id });
        if (req.body.username) {
            user.username = req.body.username;
        }
        if (req.body.email) {
            user.email = req.body.email;
        }
        if (req.body.password) {
            user.password = yield bcrypt_1.default.hash(req.body.password, 10);
        }
        yield user.save();
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}));
//  Delete User
router.delete("/delete", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.user._id;
        const userF = yield User_1.default.findById(id);
        if (!userF)
            return res.send("User not Found");
        const user = yield User_1.default.findByIdAndDelete(id);
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}));
exports.default = router;
