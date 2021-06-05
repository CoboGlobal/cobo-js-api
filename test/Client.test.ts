import {LocalSigner} from "../src/LocalSigner";
import {Client} from "../src/Client";

let signer = new LocalSigner("e7e73fabdd9edb8bddf947954c400a63bf93edc57abf170544ec570757df5453");
let client = new Client("0397ef0d81938bcf9587466ee33ab93caa77677416ada3297e70e92aa42245d99e",
    signer,
    "032f45930f652d72e0c90f71869dfe9af7d713b1f67dc2f7cb51f9572778b9c876");

test('test get account info', async () => {
    let res = await client.getAccountInfo();
    expect(res.success).toBe(true);
});

test('test get coin info', async () => {
    let res = await client.getCoinInfo("ETH");
    expect(res.success).toBe(true)
});

test('test withdraw', async () => {
    let res = await client.withdraw({
        coin: "TETH",
        request_id: "request_id_" + String(new Date().getTime()),
        address: "0xb744adc8d75e115eec8e582eb5e8d60eb0972037",
        amount: "1",
        memo: 'cobo'
    });
    expect(res.success).toBe(true);
});

test('test new address ', async () => {
    let res = await client.newDepositAddress("BTC", true);
    expect(res.success).toBe(true)
});
