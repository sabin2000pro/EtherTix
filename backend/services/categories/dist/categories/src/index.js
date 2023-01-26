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
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCategoriesServer = void 0;
const app_1 = require("./app");
const port = process.env.PORT || 5300;
const startCategoriesServer = () => __awaiter(void 0, void 0, void 0, function* () {
    return app_1.app.listen(port, () => {
        console.log('Categories Service Live On Port 5300');
    });
});
exports.startCategoriesServer = startCategoriesServer;
(0, exports.startCategoriesServer)();
