"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const passwordSchema = new mongoose_1.default.Schema({
    password: {
        type: String,
        required: true
    },
    websitelink: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
    },
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true
    }
});
exports.default = mongoose_1.default.model('Password', passwordSchema);
