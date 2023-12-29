import {Env} from "../src/Env";

export const PROD = new Env("https://api.custody.cobo.com", "02c3e5bacf436fbf4da78597e791579f022a2e85073ae36c54a361ff97f2811376");
export const DEV = new Env("https://api.dev.cobo.com", "03596da539963fb1dd29d5859e25903eb76b9f7ed2d58516e29c9f80c201ff2c1b");

export const SANDBOX = new Env("https://api.sandbox.cobo.com", "032f45930f652d72e0c90f71869dfe9af7d713b1f67dc2f7cb51f9572778b9c876");

export const DEV_TEST_DATA : { [key: string]: any } = {
    "cobo_id":"20231213152104000114035000006167",
    "tx_id":"332d0377c0cc08bc9f9d5b07320add949e30d8da0b5fea5140de63e3779101a0",
    "withdraw_id":"82ddd375-901a-4d0f-81a4-36d04fbc69a4",
    "deposit_address":{
        "BTC":"3HMVjbnkFqg6pD1cJ7PZeLsFkNGDh9Nqy2",
        "XRP":"rBphERztHKga1cyMgWiDen7WDkbkfn1iPE|3414236551"
    },
    "deposit_addresses":{
        "BTC":"3HMVjbnkFqg6pD1cJ7PZeLsFkNGDh9Nqy2,bc1qf22hpu33u2tkyy528mdvpnre45n8lu5s3ycatu",
        "XRP":"rBphERztHKga1cyMgWiDen7WDkbkfn1iPE|3414236551,rfKyCMyoV6Ln2GZ7YDbrBrnXCbAyBbxRqB|3752417374"
    },
    "loop_address":{
        "BTC":"3FKpEfhsULvsnutcbX8gXPpTo4ewXy7jWJ",
        "XRP":"rBphERztHKga1cyMgWiDen7WDkbkfn1iPE|2284746463"
    },
    "loop_addresses":{
        "BTC":"3FKpEfhsULvsnutcbX8gXPpTo4ewXy7jWJ,3FhponzJguuN2nvoKkdb5bJJMT1zyZvH8w",
        "XRP":"rBphERztHKga1cyMgWiDen7WDkbkfn1iPE|2284746463,rBphERztHKga1cyMgWiDen7WDkbkfn1iPE|2446372187"
    }
}
 export const PROD_TEST_DATA : { [key: string]: any } = {
    "cobo_id":"20220311154108000184408000002833",
    "tx_id":"4041A888C9966BE8916FE65F2FEE7AE9A9DC3F49D0F1643A768C842CA95FA736",
    "withdraw_id":"sdk_request_id_fe80cc5f_1647068483396",
    "deposit_address":{
        "BTC":"36xYx7vf7DUKpJDixpY3EoV2jchFwYSNCb",
        "XRP":"rBWpYJhuJWBPAkzJ4kYQqHShSkkF3rgeD|3992922539"
    },
    "deposit_addresses":{
        "BTC":"36xYx7vf7DUKpJDixpY3EoV2jchFwYSNCb,bc1q0l24tf5sjdu9t7l6hrlhxz9aq9yeej9h2sc7tk",
        "XRP":"rBWpYJhuJWBPAkzJ4kYQqHShSkkF3rgeD|3992922539,rBWpYJhuJWBPAkzJ4kYQqHShSkkF3rgeD|1492154866"
    },
    "loop_address":{
        "BTC":"34WLjtk9ta96BVxc1jRF7j5eVvehoftsVV",
        "XRP":"rBWpYJhuJWBPAkzJ4kYQqHShSkkF3rgeD|633829231"
    },
    "loop_addresses":{
        "BTC":"34WLjtk9ta96BVxc1jRF7j5eVvehoftsVV,33P1kjMfDCKipR58S7XbsCqbmPT5YGrhUo",
        "XRP":"rBWpYJhuJWBPAkzJ4kYQqHShSkkF3rgeD|633829231,rBWpYJhuJWBPAkzJ4kYQqHShSkkF3rgeD|935940214"
    }
}