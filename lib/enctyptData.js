"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const IV = "5183666c72eec9e4";
const ALGO = "aes-256-cbc";
function encrypt(text, ENC) {
    let cipher = crypto_1.default.createCipheriv(ALGO, ENC, IV);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}
exports.default = encrypt;
;
