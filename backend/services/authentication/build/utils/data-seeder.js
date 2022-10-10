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
const user_model_1 = require("../../src/models/user-model");
const auth_db_1 = __importDefault(require("../database/auth-db"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const users = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, '../data/users.json')).toString());
(0, auth_db_1.default)();
const loadUserData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_model_1.User.create(users);
        console.log(`User data imported to DB`);
        return process.exit(1);
    }
    catch (err) {
        if (err) {
            return console.error(err);
        }
    }
});
const removeUserData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (err) {
        if (err) {
            return console.log(err);
        }
    }
});
// Handle command line args
if (process.argv[2] === '--import') {
    loadUserData();
}
if (process.argv[2] === '--delete') {
    removeUserData();
}
//# sourceMappingURL=data-seeder.js.map