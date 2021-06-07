"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalSigner = void 0;
var elliptic_1 = require("elliptic");
var sha256_1 = __importDefault(require("sha256"));
var LocalSigner = /** @class */ (function () {
    function LocalSigner(privKey) {
        var _this = this;
        /**
         * sign message
         * @param message
         */
        this.sign = function (message) {
            var privateKey = Buffer.from(_this.privKey, 'hex');
            var secp256k1 = new elliptic_1.ec('secp256k1');
            var sig = secp256k1.sign(Buffer.from(sha256_1.default.x2(message), 'hex'), privateKey);
            return sig.toDER("hex");
        };
        this.privKey = privKey;
    }
    /***
     * verify signature
     * @param content
     * @param sig
     * @param pub
     */
    LocalSigner.verifyEccSignature = function (content, sig, pub) {
        var secp256k1 = new elliptic_1.ec('secp256k1');
        return secp256k1.verify(Buffer.from(sha256_1.default.x2(content), 'hex'), Buffer.from(sig, "hex"), Buffer.from(pub, 'hex'));
    };
    /***
     * generate new secp256k1 key pair
     */
    LocalSigner.newKeyPair = function () {
        var ec = new elliptic_1.ec('secp256k1');
        var key = ec.genKeyPair();
        return {
            privKey: key.getPrivate('hex'),
            pubKey: key.getPublic(true, 'hex'),
        };
    };
    return LocalSigner;
}());
exports.LocalSigner = LocalSigner;
