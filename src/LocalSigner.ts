import {Signer} from "./Signer";
import {ec as EC} from 'elliptic';
import sha256 from "sha256";

export class LocalSigner implements Signer {
    private readonly privKey: string;

    constructor(privKey: string) {
        this.privKey = privKey;
    }

    /**
     * sign message
     * @param message
     */
    public sign = (message: string) => {
        let privateKey = Buffer.from(this.privKey, 'hex');
        const secp256k1 = new EC('secp256k1');
        let sig = secp256k1.sign(Buffer.from(sha256.x2(message), 'hex'), privateKey);
        return sig.toDER("hex")
    };


    /***
     * verify signature
     * @param content
     * @param sig
     * @param pub
     */
    public static verifyEccSignature = (content: string, sig: string, pub: string): boolean => {
        const secp256k1 = new EC('secp256k1');
        return secp256k1.verify(
            Buffer.from(sha256.x2(content), 'hex'),
            Buffer.from(sig, "hex"),
            Buffer.from(pub, 'hex'));
    };

    /***
     * generate new secp256k1 key pair
     */
    public static newKeyPair = () => {
        const ec = new EC('secp256k1');
        let key = ec.genKeyPair();

        return {
            privKey: key.getPrivate('hex'),
            pubKey: key.getPublic(true, 'hex'),
        }
    };
}
