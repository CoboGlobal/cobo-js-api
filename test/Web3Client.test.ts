import {LocalSigner} from "../src/LocalSigner";
import {Web3Client} from "../src/Web3Client";
import {SANDBOX} from "./config";

var apiSecret:string = '03c0552791960263f1ee45015848b2b77b555cf6ea441328c4fd08473240f5a233';
var clientEnv:any = SANDBOX;

// if(process.argv.length > 3){
//     const paramEnv = process.argv.filter((x) => x.startsWith('-env='))[0].split('=')[1];
//     const env = paramEnv ? paramEnv : 'sandbox';
//     clientEnv = env==='prod' ? PROD: SANDBOX;
//     const paramApiSecret = process.argv.filter((x) => x.startsWith('-secretKey='))[0].split('=')[1]
//     apiSecret = paramApiSecret ? paramApiSecret: 'apiSecret' 
// }

// jest.setTimeout(10000);
const signer = new LocalSigner(apiSecret);
const web3_client = new Web3Client(signer, clientEnv, false);

test('get web3 support chains', async () => {
    const res = await web3_client.getWeb3SupportedChains();
    expect(res.success).toBeTruthy();
});