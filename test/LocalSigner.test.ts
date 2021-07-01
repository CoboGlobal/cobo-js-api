import {LocalSigner} from "..";

test("generate new key pair", () => {
    const keyPair = LocalSigner.newKeyPair();
    console.log(keyPair);
});

test("test sign and verify", () => {
    const privKey = '8e25462664653ee1f0064c3655f9dabad8e38ffdaa810b1e1c340cb4d1dd362f';
    const pubKey = '02e0f72b60ca8c3341aced89f3dbb829c5c4549cae37abd86a8270c3a8f172b51a';
    const signer = new LocalSigner(privKey);
    const message = "hello word";
    const sig = signer.sign(message);
    const verified = LocalSigner.verifyEccSignature(message, sig, pubKey);
    expect(verified).toBe(true);
});
