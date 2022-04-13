import {Env} from "../src/Env";

export const SANDBOX = new Env("https://api.sandbox.cobo.com", "032f45930f652d72e0c90f71869dfe9af7d713b1f67dc2f7cb51f9572778b9c876");
export const PROD = new Env("https://api.custody.cobo.com", "02c3e5bacf436fbf4da78597e791579f022a2e85073ae36c54a361ff97f2811376");

export const SANDBOX_TEST_DATA : { [key: string]: any } = {
    "tx_id":"20220314181458000331767000003732",
    "withdraw_id":"web_send_by_user_915_1647252768642",
    "deposit_address":{
        "BTC":"3JBYNrbB4bHtGWHTEa3ZPuRK9kwTiEUo4D",
        "XRP":"rfKyCMyoV6Ln2GZ7YDbrBrnXCbAyBbxRqB|2047482901"
    },
    "deposit_addresses":{
        "BTC":"3JBYNrbB4bHtGWHTEa3ZPuRK9kwTiEUo4D,bc1qf22hpu33u2tkyy528mdvpnre45n8lu5s3ycatu",
        "XRP":"rfKyCMyoV6Ln2GZ7YDbrBrnXCbAyBbxRqB|2047482901,rfKyCMyoV6Ln2GZ7YDbrBrnXCbAyBbxRqB|3752417374"
    },
    "loop_address":{
        "BTC":"35eXJPLRTSp4Wn8n2f6pkQF4t3KdU2cuhz",
        "XRP":"rfKyCMyoV6Ln2GZ7YDbrBrnXCbAyBbxRqB|477817505"
    },
    "loop_addresses":{
        "BTC":"35eXJPLRTSp4Wn8n2f6pkQF4t3KdU2cuhz,34R4JHecUwGNEFVGKz1vR8R6BHGi5FUqPt",
        "XRP":"rfKyCMyoV6Ln2GZ7YDbrBrnXCbAyBbxRqB|477817505,rfKyCMyoV6Ln2GZ7YDbrBrnXCbAyBbxRqB|2874421071"
    }
}
 export const PROD_TEST_DATA : { [key: string]: any } = {
    "tx_id":"20220311154108000184408000002833",
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