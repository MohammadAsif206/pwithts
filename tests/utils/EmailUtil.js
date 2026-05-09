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
exports.EmailUtils = void 0;
const mailslurp_client_1 = require("mailslurp-client");
const process_1 = __importDefault(require("process"));
class EmailUtils {
    constructor() {
        this.mailSlurp = new mailslurp_client_1.MailSlurp({ apiKey: process_1.default.env.MAIL_API_KEY });
    }
    createInbox() {
        return __awaiter(this, void 0, void 0, function* () {
            const inbox = yield this.mailSlurp.inboxController.createInboxWithDefaults();
            return inbox;
        });
    }
    waitForLatestEmail(inboxId) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = yield this.mailSlurp.waitForLatestEmail(inboxId, 30000);
            return email;
        });
    }
}
exports.EmailUtils = EmailUtils;
