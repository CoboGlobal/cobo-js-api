import {Signer} from "./Signer";
import sha256 from "sha256";

// @ts-ignore
import secp256k1 from 'secp256k1';

export class LocalSigner implements Signer {

    private readonly privKey: string;

    constructor(privKey: string) {
        this.privKey = privKey;
    }

    public sign = (message: string) => {
        let privateKey = Buffer.from(this.privKey, 'hex')
        let sig = secp256k1.sign(Buffer.from(sha256.x2(message), 'hex'), privateKey);
        return secp256k1.signatureExport(sig.signature).toString('hex');
    };

    public static verifyEccSignature = (content: string, sig: string, pub: string): boolean => {
        let sigObj = secp256k1.signatureImport(Buffer.from(sig,"hex"));
        return secp256k1.verify(
            Buffer.from(sha256.x2(content), 'hex'),
            sigObj,
            Buffer.from(pub, 'hex'));
    }


}
