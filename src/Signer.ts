export abstract class Signer {
    abstract sign(message:string): string;
    abstract getPublicKey():string;
}
