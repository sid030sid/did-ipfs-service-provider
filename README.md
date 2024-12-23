# did:ipfs Service Provider
This repository introduces _did:ipfs_ and the `did:ipfs service provider`. _did:ipfs_ is a novel Decentralized Identifier (DID) method designed to enhance the identification of files in the [InterPlanetary File System (IPFS)](https://ipfs.tech/). _did:ipfs_ unlocks the full potential of IPFS and addresses some of its core limitations (see more [here](#utility-of-didipfs-for-identifying-ipfs-files)). Additionally, _did:ipfs_ offers distinct DID properties that augment existing DID methods, enriching the overall landscape of DIDs (see more [here](#utility-of-didipfs-as-a-did-method)). The `did:ipfs service provider` is a [NestJs](https://nestjs.com/) API for performing _did:ipfs_ operations, such as DID creation and resolution. The API can be run locally and accessed through [Swagger UI](https://docs.nestjs.com/openapi/introduction).

**Note**: To get an introduction to the _did:ipfs_ project, please watch this [video](https://www.youtube.com/watch?v=aabA1dFT-hI).

## Setting up the `did:ipfs service provider`
1. run ``npm install`` in terminal while in root folder (**Note**: NodeJS v20.8.1 was used for implementation)
2. create `.env` file in root folder and add Pinata releated environment variables to `.env` file:
  - ``PINATA_API_JWT``: stores your API Access token for Pinata's APIs
  - ``PINATA_API_GATEWAY``: stores your personal IPFS gateway hosted by Pinata 
  **Note**: To get your Pinata JWT and gateway, please consider this [guide](https://docs.pinata.cloud/quickstart).
3. add DID used as controller for _did:ipfs_ DIDs: 
    - Option 1: generate did:key by running `node generateDidKey.js` in terminal while being in root folder
    - Option 2 (**Note**: This option has not been tested, use with caution!):
        1. add your already existing DID's private and public key as pem files, named `private.pem` and `public.pem` in folder ``certs`` 
        2. add env varibale `DID` to `.env` file and set it to your DID
4. run `npm start` in terminal while being in root folder
5. open Swagger UI by entering `http://localhost:3000/api` in your browser

## Using the `did:ipfs service provider`
**Note:** If an error occurs after calling any of the `did:ipfs service provider` endpoints, please restart the service provider. To do this, navigate to the root folder and run `npm start` in the terminal.

### How to create a _did:ipfs_?
Simply call ``/createDidIpfs`` endpoint.

### How to resolve _did:ipfs_ to its DID Document?
Simply call ``/resolve/{didIpfs}`` endpoint while setting path parameter `didIpfs` to the _did:ipfs_ you want to resolve.

### How to create a _did:ipfs_ with private DID Document?
To create private DID Documents, simply set the `privateDidDoc` query parameter to `true` when calling the `/createDidIpfs` endpoint. Currently, the `did:ipfs service provider` uses [Pinata's File API](https://pinata.cloud/features#file-api) to create private DID Documents. Other methods for ensuring privacy in _did:ipfs_ documents are possible, such as using private [IPFS Clusters](https://ipfscluster.io/).

**Note**: A demonstration of the `did:ipfs service provider` can be seen in this [video](https://www.youtube.com/watch?v=1BHx2eskMu0&feature=youtu.be).

## About _did:ipfs_

### _did:ipfs_ DID Document Data Model
_did:ipfs_ DID Documents contain the following attributes:
1. **id**: DID identifier which contains CID of DID Document stored in IPFS
2. **controller**: string array containing DID of _did:ipfs_ controllers (**Note**: DID controllers can be identified with a DID that is not of type _did:ipfs_!)
3. **verificationMethod**: array of public JWKs that belong to the underlying _did:ipfs_
4. **authentication**: string array of public keys listed in ``verificationMethod`` that can be used to authenticate the underlying _did:ipfs_
5. **service**: array of _did:ipfs_ services which possibly unlock full potential of IPFS and solve its limitations
6. **file**: Base64 encoded string containing any additional data (**Note**: alternatively this attribute can be removed if the DID Controller creates a Verifiable Presentation of the file and stores it as [Linked Verifiable Presentation](https://identity.foundation/linked-vp/) in the service section of the DID Document using a service endpoint with the DID Document internal URL `#file` as service id.)

Example did:ipfs DID Document:
```json 
{
    "@context": [
      "https://www.w3.org/ns/did/v1",
      "https://identity.foundation/.well-known/did-configuration/v1",
      "https://w3id.org/security/suites/ed25519-2020/v1"
    ],
    "id": "did:ipfs:bafybeifdgx4cjqku3kmu2sqs3vzgvn2stcu3qj52j3hg67bdte2iw3uoqq",
    "controller": [
      "did:key:aSq9DsNNvGhYxYyqA9wd2eduEAZ5AXWgJTbTHpz9vMPyMbXuB4YCoTwbgXb5x9hnrkL9Adpqj6vVMEQnyDiQzv9ZLVCYne6Vz2vbmPmaJxxseoxK5R1GHmcJ2Nuf"
    ],
    "verificationMethod": [
      {
        "id": "did:ipfs:bafybeifdgx4cjqku3kmu2sqs3vzgvn2stcu3qj52j3hg67bdte2iw3uoqq#key-1",
        "type": "JasonWebKey2020",
        "controller": "did:ipfs:bafybeifdgx4cjqku3kmu2sqs3vzgvn2stcu3qj52j3hg67bdte2iw3uoqq",
        "publicKeyJwk": {
          "kty": "EC",
          "x": "04SvqS8lppFTbFx7z-sYJZ_G7tGfDX6o3TiKXjii8Ng",
          "y": "CGE-oj_o0bvKK7m9hFDtzPKctMuII6o9BUlP9bPIu6Y",
          "crv": "P-256"
        }
      }
    ],
    "authentication": [
      "did:ipfs:bafybeifdgx4cjqku3kmu2sqs3vzgvn2stcu3qj52j3hg67bdte2iw3uoqq#key-1"
    ],
    "service": [
      {
        "id": "did:ipfs:bafybeifdgx4cjqku3kmu2sqs3vzgvn2stcu3qj52j3hg67bdte2iw3uoqq#tags",
        "type": "LinkedTags",
        "serviceEndpoint": []
      },
      {
        "id": "did:ipfs:bafybeifdgx4cjqku3kmu2sqs3vzgvn2stcu3qj52j3hg67bdte2iw3uoqq#queryProperties",
        "type": "LinkedQueryProperties",
        "serviceEndpoint": []
      },
      {
        "id": "did:ipfs:bafybeifdgx4cjqku3kmu2sqs3vzgvn2stcu3qj52j3hg67bdte2iw3uoqq#urlsForProofSubmission",
        "type": "LinkedDomains",
        "serviceEndpoint": [
          ""
        ]
      }
    ],
    "file": "file in Base64"
}
```

### Utility of _did:ipfs_ as a DID Method
As a DID method, _did:ipfs_ offers several unique and valuable properties:

1. **Unlimited Data Scalability:** Unlike other DID methods, _did:ipfs_ imposes no size limitations on DID Documents. Blockchain-based methods, such as `did:cheqd`, are restricted by block size, while off-chain methods like `did:key` or `did:web` are limited by their storage environment and resources. With _did:ipfs_, large or complex DID Documents can be created and stored without restriction, allowing for the inclusion of various data types, such as images, tables, or videos. 

2. **Flexible Visibility:** The storage location for _did:ipfs_ DID Documents is customizable by DID controllers at creation. Currently, _did:ipfs_  Documents can be stored in public IPFS or privately in IPFS via Pinata's File API. This flexibility allows DID Documents to be set as public or private (more details [here](#how-to-create-a-didipfs-with-private-did-document)).

3. **Immutability:** _did:ipfs_  Documents are immutable, as they use [Content Identifiers (CIDs)](https://docs.ipfs.tech/concepts/content-addressing/) as the method-specific ID. This immutability removes the need for DID Document updates, which can be seen either as a limitation or as an advantage, enabling new applications for diverse use cases.

4. **DID Interoperability**: Controllers of _did:ipfs_ DID Documents can register as controllers using a DID from any method (such as IPFS, key, cheqd, etc.), enhancing interoperability across different DID systems.


**Note:** A comparison of _did:ipfs_ with other DID methods could further highlight its unique utilities and is planned as part of future work. It will be particularly important to distinguish _did:ipfs_ from the only other IPFS-based DID method, [did:ipid](https://did-ipid.github.io/ipid-did-method/).



### Utility of _did:ipfs_ for Identifying IPFS Files

1. **Secure Documentation of Authorship:** _did:ipfs_ DID Documents name the DID controller, who is the uploader of the file stored as a Base64 string in the "file" attribute of _did:ipfs_ DID Documents. This provides a simple solution for recording the authorship of content uploaded to IPFS without needing on-chain CID storage, avoiding the performance limits and high costs of blockchain transactions. To enhance trust in authorship, _did:ipfs_ will enable DID controllers to cryptographically sign their content before DID creation, adding a layer of security to the authorship record.

2. **Enabling Secure Authentication for IPFS File Access and DApp Integration:** By including an authentication key, _did:ipfs_ enables both human users and machines to securely interact with IPFS files, allowing for verified access and seamless integration with other DApps that recognize W3C DID standards.

3. **Enhanced IPFS Utility Through _did:ipfs_ Services:** _did:ipfs_ provides the foundation for additional services that can unlock IPFS’s full potential and address some of its core limitations. Examples of these services include:

   - **Connecting Uploaders and Node Operators in IPFS:** Since DID controllers in _did:ipfs_ are the uploaders of files stored in the "file" attribute, IPFS node operators (who store these files) can connect with the uploaders. This connection can be established by storing a communication URL in a LinkedDomains service endpoint within the DID Document. This allows node operators to submit proofs of data storage, helping to ensure data permanence and build trust in IPFS’s ability to retain files, countering concerns due to node operator anonymity and lack of storage incentives.

   - **IPFS Search Engine:** IPFS files can only be found based on their CID, limiting internet users to explore the diverse content stored in IPFS ([source](https://discuss.ipfs.tech/t/ipfs-search-com-shutdown/16622)). _did:ipfs_ can add a metadata layer essential for making IPFS files searchable based on their content. By adding a "queryProperties" service endpoint to DID Documents, _did:ipfs_ can store metadata about the file in the "file" attribute, making content more easily findable through search engines. Therefore, _did:ipfs_ can be the basis for a dedicated IPFS search engine such as proposed in [this paper](https://ieeexplore.ieee.org/document/8958437).

   - **IPFS for Machine Learning Training:** IPFS hosts a wealth of data valuable for Machine Learning (ML) ([source](https://www.researchgate.net/publication/339657216_Decentralized_Transfer_Learning_using_Blockchain_IPFS_for_Deep_Learning), [source](https://discuss.ipfs.tech/t/reasons-why-ipfs-is-a-powerful-tool-for-machine-learning/13411/3), [source](https://dl.acm.org/doi/10.1007/s11042-022-13163-w)). However, for ML data to be usable, it must be organized systematically. _did:ipfs_ can assist by storing tags within service endpoints, categorizing files by type, format, content and other aspects relevant for ML. The currently implemented `did:ipfs service provider` shows how the "tags" service endpoint could hold metadata that makes files in the "file" attribute ready and discoverable for ML training. Moreover, combined with uploader record-keeping (see `1. Secure Documentation of Authorship`), _did:ipfs_ could support a marketplace for IPFS-based training data, connecting data owners with model developers.

### Comaparative analysis
In this section, _did:ipfs_ is compared to the most commonly used DID methods and other IPFS based DID Methods. The comparison criterias are based on the [DID traits](https://identity.foundation/did-traits/) defined by the Decentralized Identity Foundation.

#### Comparison with other IPFS based DID methods

##### Comparison with did:ipid
[did:ipid](https://did-ipid.github.io/ipid-did-method/) DID Documents are stored in IPFS while their CID is published in IPNS through a IPFS node. The resulting did:ipid is constructed by using the id of the publishing IPFS node which is based the public and private key pair of type ed25519. ... TODO...

##### Comparison with did:ion
[did:ion](https://github.com/decentralized-identity/ion) uses IPFS as a layer 2 technology on top of Bitcoin. TODO

##### Comparison with did:dht
[did:dht](https://github.com/decentralized-identity/did-dht) relies on DHT technology at its heart jut like IPFS does, hence did:ifps as well.

##### Comparison with did:jolo
[did:jolo](https://github.com/jolocom/jolo-did-method/blob/master/jolocom-did-method-specification.md) TODO 

##### Comparison with did:btc1
[did:btc1](https://github.com/dcdpr/did-btc1) TODO 

#### Comparison with commonly used DID methods

##### Comparison did:key
TODO


## FAQ

### Is _did:ipfs_ compliant with the W3C DID standard?
The W3C has established a standard for DIDs (see [here](https://www.w3.org/TR/did-core/)). While _did:ipfs_ was developed with this standard in mind, full compliance has not been verified so far. Currently, _did:ipfs_ is primarily designed to extend file identification capabilities within IPFS. As _did:ipfs_ demonstrates its utility as a DID method, future work will focus on ensuring full compliance with the W3C DID standard and integration with the [DIF Universal Resolver](https://dev.uniresolver.io/).

### How does the `did:ipfs service provider` handle self-referential CIDs?
_did:ipfs_ uses [CIDs](https://docs.ipfs.tech/concepts/content-addressing/) as method-specific identifiers, with each CID being derived from the content of its IPFS file. Since a file’s CID is directly determined by its content, this poses a challenge: how can _did:ipfs_ store DID Documents in IPFS that include their own `did:ipfs` ID (and thus the CID)? According to the [W3C’s guidance on intermediate representations of DID Documents](https://www.w3.org/TR/did-core/#did-subject), _did:ipfs_ can store a non-compliant version of a DID Document in IPFS, provided that the fully resolved DID Document meets W3C standards. This approach allows _did:ipfs_ to avoid issues with self-referential CIDs, enabling files in IPFS to reference their own CID within their content.

## Future Work
1. Enhance error handling for the `did:ipfs service provider`.
2. Achieve full compliance of _did:ipfs_ with the W3C DID standard and DIF’s Universal Resolver.
3. Conduct a comprehensive comparative analysis between _did:ipfs_ and other DID methods.
4. Develop _did:ipfs_ services, such as an IPFS search engine and an IPFS-based machine learning data marketplace.
5. Strengthen IPFS data permanence by facilitating connections between file uploaders and IPFS node operators for exchanging storage proofs to ensure permanence guarantees.
6. Implement trustworthy timestamps within did:ipfs DID Documents, potentially through the integration of Qualified Trust Service Providers (QTSPs).

## Acknowledgements
I thank the following persons which helped the project through insightful discussions: [Markus Sabadello](https://www.linkedin.com/in/markus-sabadello-353a0821/), [Juan Caballero](https://www.linkedin.com/in/juan-caballero/), and the members of the "Id" Working Group of the Decentralized Identity Foundation.
