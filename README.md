# did:ipfs service provider
This repository provides a service for managing _did:ipfs_ operations. The `did:ipfs service provider` is a [nestjs](https://nestjs.com/) API that can be run locally and accessed through [Swagger UI](https://docs.nestjs.com/openapi/introduction). _did:ipfs_ is a new Decentralized Identifier (DID) method designed to enhance the identification of files in IPFS, unlocking its full potential and addressing some of IPFS’s core limitations (See more [here](#about-did:ipfs)). Additionally, `did:ipfs` offers distinct DID properties that enhance existing DID methods, significantly enriching the overall landscape of DIDs.

## Set up
1. run ``npm install`` in terminal while in root folder
2. create `.env` file in root folder
3. add Pinata releated environment variables to `.env` file:
    - ``PINATA_API_JWT``: stores your API Access token for Pinata's APIs
    - ``PINATA_API_GATEWAY``: stores your personal IPFS gateway hosted by Pinata 
    note: To get your Pinata JWT and gateway, please consider this [guide](https://docs.pinata.cloud/quickstart).
4. add DID used as controller for _did:ipfs_ DIDs: 
    - Option 1: generate did:key by running `node generateDidKey.js` in terminal while being in root folder
    - Option 2:
        1. add your already existing DID's private and public key as pem files, named `private.pem` and `public.pem` in folder ``certs`` 
        2. add env varibale `DID` to `.env` file and set it to your DID
        note: this option has not been tested, use with caution
5. run `npm start` in terminal while being in root folder
6. open Swagger UI by entering `http://localhost:3000/api` in your browser

## Usage
Note: Please consider that in case of an error after calling any of `did:ipfs service provider` endpoints, a restart of the service is needed and can be performed by re-running command `npm start` in terminal while being in root folder.

### How to create a _did:ipfs_?
Simply call ``/createDidIpfs`` endpoint.

### How to resolve _did:ipfs_ to its DID Document?
Simply call ``/resolve/{didIpfs}`` endpoint while setting param `didIpfs` to the _did:ipfs_ you want to resolve.

### How to create a _did:ipfs_ with private DID Document?
Simply, set the ``privateDidDoc`` query value to `true` while calling the ``/createDidIpfs`` endpoint. Please note, that as of now the ``_did:ipfs_ service provider`` relies on [Pinata's File API](https://pinata.cloud/features#file-api) for creating private DID Documents. Alternative ways to attain privacy for did:ifps DID Documents are theoretically possible, for instance using private [IPFS Clusters](https://ipfscluster.io/).


## About _did:ipfs_
### Utility of _did:ipfs_ as a DID method
As a DID method, _did:ipfs_ provides unique and valuable DID properties, such as:
1. Unlimited data scalability: _did:ipfs_ DID Documents are not limited in their size. With this property, _did:ipfs_ trumps other DID methods because Blockchain based DID methods, such as did:cheqd, are limited by block size and off-chain based DID methods, such as did:key or did:web, are limited by their given off-chain environment and resources.
2. Flexible visibility: the storage place for _did:ipfs_ DID Documents is customizable by DID controllers during DID creation. As of now, _did:ipfs_ DID Documents can either be stored in IPFS or in the private IPFS powered by Pinata's File API. Therefore, _did:ipfs_ DID Documents visibility is flexible between public and private (More details [here](#how-to-create-a-_did:ipfs_-with-private-did-document?)).
3. Immutability: _did:ipfs_ DID Documents are immutbale due to usage of [CIDs](https://docs.ipfs.tech/concepts/content-addressing/) as method specific ID. Thsi data immutability makes DID Document update operations obsolete. This can be either regarded as a limitation or a valuable property that unlocks new use cases.

Note: Comparing _did:ipfs_ with other DID methods is part of future work. It is especially important to differentiate _did:ipfs_ from the only other IPFS based DID method: [did:ipid](https://did-ipid.github.io/ipid-did-method/). 

### Utility of _did:ipfs_ as an identification of IPFS files
1. Secure authorship documentation: _did:ipfs_ DID Documents name the DID controller which is the uploader of the file stored as base 64 string in the "file" attribute of _did:ipfs_ DID Documents. Therefore, _did:ipfs_ provides a simple solution to record authorship of content uploaded to IPFS without the need to store CIDs on-chain which is limited by Blockchain's low performance and high cost per transaction. To further enhance the trust in the authorship documentation, _did:ipfs_ will enable DID controllers to sign their uploaded content prior DID creation. This measure adds cryptographic security to the authorship documentation.
2. With the provision of an authentication key for IPFS files, _did:ipfs_ allows humans and machines to interact with IPFS files. --> what is good about this?
3. Further utility through _did:ipfs_ services: ...
    1. ``Connector between uploaders and storers of IPFS files``: since DID controllers in _did:ipfs_ are uploaders of files stored in the "file" attribute of _did:ipfs_ DID Documents, IPFS node operators as storers of IPFS files can get in contact with the uploaders of the files they are storing. Such connection can be achieved if DID controllers store a dedicated URL for communication as LinkedDomains service endpoint in their personal DID Document or in the one of the _did:ipfs_ they are controlling. With such a connection node operators can submit proofs that ensure IPFS users the data parmanency of their uploaded files, yielding trust in IPFS's data peramency gurantee shaken by the anonymity of IPFS node operators and their lack of incentive to store files permanently.
    2. ``IPFS search engine``: despite great support by IPFS users, search engines for content in IPFS cease to exist ([Source](https://discuss.ipfs.tech/t/ipfs-search-com-shutdown/16622)). _did:ipfs_ can provide the metadata layer for IPFS files crucial for making them queryable. With a dedicated service endpoint in _did:ipfs_ DID Documents, _did:ipfs_ can store the crucial metadata layer. Without being implemented, this demo showcases how the "queryProperties" service endpoint can be used to store the relevant metadata for the content stored in the "file" attribute of _did:ipfs_ DID Documents so that this content can be found trough a search engine.
    3. `IPFS for Machine Learning training`: IPFS contains valuable data for training Machine Learning models([source](https://www.researchgate.net/publication/339657216_Decentralized_Transfer_Learning_using_Blockchain_IPFS_for_Deep_Learning), [source](https://discuss.ipfs.tech/t/reasons-why-ipfs-is-a-powerful-tool-for-machine-learning/13411/3), [source](https://dl.acm.org/doi/10.1007/s11042-022-13163-w)). However, to unlock this massive potential IPFs files must be systemized. Such systemization can be achieved trough tags stored as service endpoints. Without implemnting the pipeline that analysis the content and categorizing it for model trainign trough tags abotu file type, format, content etc., this demo showcases how the "tags" service endpoint can be used to store metadata relavant for making content stored in the "file" attribute of _did:ipfs_ DID Documents findable and ready for Machine learning training. In connection with the record keeping of the uploader in the form of the DID controller, _did:ipfs_ can provide the data layer needed for IPFS based market for model training data that connects data owners and model trainers.

### FAQ
#### Is _did:ipfs_ complaint with W3C's DID standard?
The W3C defined a standard for DIDs (See [here](https://www.w3.org/TR/did-core/)). _did:ipfs_ was invented considering this standard, but as of now _did:ipfs_'s full compliance has not yet been focal for _did:ipfs_. So far, _did:ipfs_ solely serves to extend the identification of files in IPFS. However, as the utility of _did:ipfs_ as a DID method reveals, future work will be dedicated into making _did:ipfs_ an official DID method complaint with W3C's DID standard and [DIF's Universal resolver](https://dev.uniresolver.io/) (More details [here](###utility-of-_did:ipfs_-as-a-did-method)).

#### How does the ``did:ipfs service provider`` enable self-referential CIDs?
_did:ipfs_ uses [CIDs](https://docs.ipfs.tech/concepts/content-addressing/) as method specific identifiers. CIDs are generated by their underlying IPFS file's content. This means that the content of IPFS files determines their CID, raising the question of how _did:ipfs_ is able to store DID Documents in IPFS that contain the did:ipfs id and thus the CID which 
[W3C's note on intermediate representations of DID Documents](https://www.w3.org/TR/did-core/#did-subject) allows _did:ipfs_ to store a non-comformant DID Document version in IPFS as long as the fully resolved DID Documenent is conformant with W3C's DID Document standard. This enables _did:ipfs_ to bypass the issue of self-referential CIDs which occurs when a IPFS file wants to mention in its content its own CID.

### Future work
1. Improve error handling of the ``did:ipfs service provider``
2. Ensure compliance of _did:ipfs_ with W3C's DID standard and DIF's universal resolver
3. Extensive comparative analysis between _did:ipfs_ and other DID methods
4. Implement _did:ipfs_ services: IPFS search engine and IPFS based Machine Learnign data market
5. Improve data permanency gurantee of IPFS trough connecting uploaders and storers of IPFS files for deanonymization and exchanging proofs of data storage