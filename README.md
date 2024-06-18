# The Official JavaScript SDK for Cobo WaaS API

[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)
[![GitHub Release](https://img.shields.io/github/release/CoboGlobal/cobo-js-api.svg?style=flat)]()

## About

This repository contains the official JavaScript SDK for Cobo WaaS API, enabling developers to integrate with Cobo's Custodial
and/or MPC services seamlessly using the JavaScript programming language.

## Documentation

To access the API documentation, navigate to
the [API references](https://www.cobo.com/developers/api-references/overview/).

For more information on Cobo's JavaScript SDK, refer to
the [JavaScript SDK Guide](https://www.cobo.com/developers/sdks-and-tools/sdks/waas/javascript).

## Usage

### Before You Begin

Ensure that you have created an account and configured Cobo's Custodial and/or MPC services.
For detailed instructions, please refer to
the [Quickstart](https://www.cobo.com/developers/get-started/overview/quickstart) guide.

### Requirements

Node.js v10.18.0 or newer.

### Installation

add dependency in package.json

```json
{
  "dependencies": {
    "cobo-custody": "https://github.com/CoboGlobal/cobo-js-api/releases/download/v0.50.0/release.tgz"
  }
}
```

### Code Sample

#### Generate Key Pair

```javascript
const { LocalSigner } = require('cobo-custody');

const keyPair = LocalSigner.newKeyPair();
console.log(keyPair["privKey"]);
console.log(keyPair["pubKey"]);
```
For more information on the API key, please [click here](https://www.cobo.com/developers/api-references/overview/authentication).

#### Initialize ApiSigner
`ApiSigner` can be instantiated through 

```javascript
const { LocalSigner } = require("cobo-custody");
const signer = new LocalSigner(keyPair["privKey"]);
```
In certain scenarios, the private key may be restricted from export, such as when it is stored in AWS Key Management Service (KMS). 
In such cases, please pass in a custom implementation using the ApiSigner interface:

#### Initialize RestClient

```javascript
const { Client } = require('cobo-custody');
const { LocalSigner } = require('cobo-custody');
const {DEV,PROD} = require('cobo-custody');

const client = new Client(API_SIGNER, DEV, true)
```

#### Complete Code Sample
```javascript
const { Client } = require('cobo-custody');
const { LocalSigner } = require('cobo-custody');
const {DEV,PROD} = require('cobo-custody');

const keyPair = LocalSigner.newKeyPair();
console.log(keyPair["privKey"]);
console.log(keyPair["pubKey"]);

const signer = new LocalSigner(keyPair["privKey"]);
const client = new Client(keyPair["privKey"], DEV, true)

const res =  client.getAccountInfo();
console.log(res)
```

