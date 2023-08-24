import {Env} from "../src/Env";

export const PROD = new Env("https://api.custody.cobo.com", "02c3e5bacf436fbf4da78597e791579f022a2e85073ae36c54a361ff97f2811376");
export const DEVELOP = new Env("https://api.develop.cobo.com", "03596da539963fb1dd29d5859e25903eb76b9f7ed2d58516e29c9f80c201ff2c1b");

export const DEVELOP_TEST_DATA : { [key: string]: any } = {
    "cobo_id":"20220314181458000331767000003732",
    "tx_id":"0x1c4d137bc2a2ee8f22cbdf9e90405974e72e65d922f42eb81d9f7a05d0f64fc6",
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