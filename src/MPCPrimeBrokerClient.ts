import fetch from 'node-fetch';
import { Signer } from "./Signer";
import { LocalSigner } from "./LocalSigner";
import { URLSearchParams } from "url"
import { Env } from "./Env";
import sha256 = require("sha256");
import { ApiResponse } from '..';

export class MPCPrimeBrokerClient {
    private readonly apiKey: string;
    private readonly coboPub: string;
    private readonly host: string;
    private readonly signer: Signer;
    private readonly debug: boolean;

    /***
     *
     * @param signer api signer
     * @param env DEV or PROD
     * @param debug
     */
    constructor(signer: Signer, env: Env, debug: boolean = false) {
        this.apiKey = signer.getPublicKey();
        this.coboPub = env.coboPub;
        this.host = env.host;
        this.signer = signer;
        this.debug = debug;
    }
    
    CreateBinding = (user_id: string) => {
        let params: any = {"user_id": user_id}
        return this.coboFetch("POST", "/v1/custody/guard/create_binding/", params)
    }

    QueryBinding = (binder_id: string) => {
        let params: any = {"binder_id": binder_id}
        return this.coboFetch("GET", "/v1/custody/guard/query_binding/", params)
    }

    QueryUserAuth = (user_id: string) => {
        let params: any = {"user_id": user_id}
        return this.coboFetch("GET", "/v1/custody/guard/query_user_auth/", params)
    }

    BindAddresses = (user_id: string, addresses: string) => {
        let params: any = {"user_id": user_id, "addresses": addresses}
        return this.coboFetch("POST", "/v1/custody/guard/bind_addresses/", params)
    }

    ChangeBinding = (user_id: string) => {
        let params: any = {"user_id": user_id}
        return this.coboFetch("POST", "/v1/custody/guard/change_binding/", params)
    }
    
    UnbindBinding = (user_id: string) => {
        let params: any = {"user_id": user_id}
        return this.coboFetch("POST", "/v1/custody/guard/unbind_binding/", params)
    }

    QueryStatement = (statement_id: string) => {
        let params: any = {"statement_id": statement_id}
        return this.coboFetch("GET", "/v1/custody/guard/query_statement/", params)
    }

    coboFetch = async (method: string, path: string, params: any): Promise<ApiResponse> => {
        let nonce = String(new Date().getTime());
        let sort_params = Object.keys(params).sort().map((k) => {
            return k + '=' + encodeURIComponent(params[k]).replace(/%20/g, "+");
        }).join('&');
        let content = [method, path, nonce, sort_params].join('|');
        let headers = {
            'Biz-Api-Key': this.apiKey,
            'Biz-Api-Nonce': nonce,
            'Biz-Api-Signature': this.signer.sign(content)
        };
        let response;

        if (this.debug) {
            console.log("request >>>>>>>> \nmethod:", method, "\npath:", path, "\ncontent:", content, "\nheaders:", headers);
        }
        if (method == 'GET') {
            let url = this.host + path + '?' + sort_params;
            response = await fetch(url, {
                headers: headers,
                method: "GET"
            });
        } else if (method == 'POST') {
            let urlParams = new URLSearchParams();

            for (let k in params) {
                if (params.hasOwnProperty(k)) {
                    urlParams.append(k, params[k])
                }
            }

            response = await fetch(this.host + path, {
                method: method,
                headers: headers,
                body: urlParams
            });

        } else {
            throw "unexpected method " + method;
        }

        const ts = response.headers.get("BIZ_TIMESTAMP");
        const sig = response.headers.get("BIZ_RESP_SIGNATURE");
        if (!sig || !ts) {
            throw Error("signature or ts null")
        }
        let json = await response.text();

        if (this.debug) {
            console.log("response <<<<<<<< \njson:", json, "\nsig:", sig, "\nts:", ts);
        }

        if (LocalSigner.verifyEccSignature(`${json}|${ts}`, sig, this.coboPub)) {
            return JSON.parse(json);
        }

        throw Error("signature verify failed!!!")
    }
}