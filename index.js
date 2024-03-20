"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("./routes/User"));
const Password_1 = __importDefault(require("./routes/Password"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/v1/user', User_1.default);
app.use('/api/v1/password', Password_1.default);
mongoose_1.default.connect(process.env.DB_URL).then(() => console.log('DB connected'));
app.listen(3000, () => console.log('Server started on port 3000'));
