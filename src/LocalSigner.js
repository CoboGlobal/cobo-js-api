"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalSigner = void 0;
var sha256_1 = __importDefault(require("sha256"));
// @ts-ignore
var secp256k1_1 = __importDefault(require("secp256k1"));
var LocalSigner = /** @class */ (function () {
    function LocalSigner(privKey) {
        var _this = this;
        this.sign = function (message) {
            var privateKey = Buffer.from(_this.privKey, 'hex');
            var sig = secp256k1_1.default.sign(Buffer.from(sha256_1.default.x2(message), 'hex'), privateKey);
            return secp256k1_1.default.signatureExport(sig.signature).toString('hex');
        };
        this.privKey = privKey;
    }
    LocalSigner.verifyEccSignature = function (content, sig, pub) {
        var sigObj = secp256k1_1.default.signatureImport(Buffer.from(sig, "hex"));
        return secp256k1_1.default.verify(Buffer.from(sha256_1.default.x2(content), 'hex'), sigObj, Buffer.from(pub, 'hex'));
    };
    return LocalSigner;
}());
exports.LocalSigner = LocalSigner;
