# did:ipfs service provider
This repository provides a service for managing _did:ipfs_ operations. The `did:ipfs service provider` is a [NestJs](https://nestjs.com/) API that can be run locally and accessed through [Swagger UI](https://docs.nestjs.com/openapi/introduction). _did:ipfs_ is a new Decentralized Identifier (DID) method designed to enhance the identification of files in IPFS, unlocking its full potential and addressing some of IPFS’s core limitations (see more [here](#about-didipfs)). Additionally, _did:ipfs_  offers distinct DID properties that enhance existing DID methods, significantly enriching the overall landscape of DIDs.

## Set up
1. run ``npm install`` in terminal while in root folder
2. create `.env` file in root folder
3. add Pinata releated environment variables to `.env` file:
    - ``PINATA_API_JWT``: stores your API Access token for Pinata's APIs
    - ``PINATA_API_GATEWAY``: stores your personal IPFS gateway hosted by Pinata 

**Note**: To get your Pinata JWT and gateway, please consider this [guide](https://docs.pinata.cloud/quickstart).
4. add DID used as controller for _did:ipfs_ DIDs: 
    - Option 1: generate did:key by running `node generateDidKey.js` in terminal while being in root folder
    - Option 2:
        1. add your already existing DID's private and public key as pem files, named `private.pem` and `public.pem` in folder ``certs`` 
        2. add env varibale `DID` to `.env` file and set it to your DID

    **Note**: This option has not been tested, use with caution!
5. run `npm start` in terminal while being in root folder
6. open Swagger UI by entering `http://localhost:3000/api` in your browser

## Usage
**Note:** If an error occurs after calling any of the `did:ipfs service provider` endpoints, please restart the service. To do this, navigate to the root folder and run `npm start` in the terminal.

### How to create a _did:ipfs_?
Simply call ``/createDidIpfs`` endpoint.

### How to resolve _did:ipfs_ to its DID Document?
Simply call ``/resolve/{didIpfs}`` endpoint while setting path parameter `didIpfs` to the _did:ipfs_ you want to resolve.

### How to create a _did:ipfs_ with private DID Document?
To create private DID Documents, simply set the `privateDidDoc` query parameter to `true` when calling the `/createDidIpfs` endpoint. Currently, the `did:ipfs service provider` uses [Pinata's File API](https://pinata.cloud/features#file-api) to create private DID Documents. Other methods for ensuring privacy in _did:ipfs_ documents are possible, such as using private [IPFS Clusters](https://ipfscluster.io/).



## About _did:ipfs_
### Utility of _did:ipfs_ as a DID method
As a DID method, _did:ipfs_ offers several unique and valuable properties:

1. **Unlimited Data Scalability:** Unlike other DID methods, _did:ipfs_ imposes no size limitations on DID Documents. Blockchain-based methods, such as `did:cheqd`, are restricted by block size, while off-chain methods like `did:key` or `did:web` are limited by their storage environment and resources. With _did:ipfs_, large or complex DID Documents can be created and stored without restriction, allowing for the inclusion of various data types, such as images, tables, or videos. 

2. **Flexible Visibility:** The storage location for _did:ipfs_ DID Documents is customizable by DID controllers at creation. Currently, _did:ipfs_  Documents can be stored in public IPFS or privately in IPFS via Pinata's File API. This flexibility allows DID Documents to be set as public or private (more details [here](#how-to-create-a-didipfs-with-private-did-document)).

3. **Immutability:** _did:ipfs_  Documents are immutable, as they use [Content Identifiers (CIDs)](https://docs.ipfs.tech/concepts/content-addressing/) as the method-specific ID. This immutability removes the need for Document updates, which can be seen either as a limitation or as an advantage, enabling new, use-case-specific applications.

4. **DID Interoperability**: Controllers of _did:ipfs_ DID Documents can register as controllers using a DID from any method (such as IPFS, key, cheqd, etc.), enhancing interoperability across different DID systems.


**Note:** A comparison of _did:ipfs_ with other DID methods could further highlight its unique utilities and is planned as part of future work. It will be particularly important to distinguish _did:ipfs_ from the only other IPFS-based DID method, [did:ipid](https://did-ipid.github.io/ipid-did-method/).



### Utility of _did:ipfs_ for Identifying IPFS Files

1. **Secure Documentation of Authorship:** _did:ipfs_ DID Documents name the DID controller, who is the uploader of the file stored as a Base64 string in the "file" attribute of _did:ipfs_ DID Documents. This provides a simple solution for recording the authorship of content uploaded to IPFS without needing on-chain CID storage, avoiding the performance limits and high costs of blockchain transactions. To enhance trust in authorship, _did:ipfs_ will enable DID controllers to cryptographically sign their content before DID creation, adding a layer of security to the authorship record.

2. **Enabling Secure Authentication for IPFS File Access and DApp Integration:** By including an authentication key, _did:ipfs_ enables both human users and machines to securely interact with IPFS files, allowing for verified access and seamless integration with other DApps that recognize W3C DID standards.

3. **Enhanced IPFS Utility Through _did:ipfs_ Services:** _did:ipfs_ provides the foundation for additional services that can unlock IPFS’s full potential and address some of its core limitations. Examples of these services include:

   - **Connecting IPFS Uploaders and Storage Nodes:** Since DID controllers in _did:ipfs_ are the uploaders of files stored in the "file" attribute, IPFS node operators (who store these files) can connect with the uploaders. This connection can be established by storing a communication URL in a LinkedDomains service endpoint within the DID Document. This allows node operators to submit proofs of data storage, helping to ensure data permanence and build trust in IPFS’s ability to retain files, countering concerns due to node operator anonymity and lack of storage incentives.

   - **IPFS Search Engine:** Despite widespread adoption, IPFS lacks an efficient search mechanism for its content ([source](https://discuss.ipfs.tech/t/ipfs-search-com-shutdown/16622)). _did:ipfs_ can add a metadata layer essential for making IPFS files searchable. By adding a "queryProperties" service endpoint to DID Documents, _did:ipfs_ can store metadata about the file in the "file" attribute, making content more easily findable through search engines.

   - **IPFS for Machine Learning Training:** IPFS hosts a wealth of data valuable for Machine Learning (ML) ([source](https://www.researchgate.net/publication/339657216_Decentralized_Transfer_Learning_using_Blockchain_IPFS_for_Deep_Learning), [source](https://discuss.ipfs.tech/t/reasons-why-ipfs-is-a-powerful-tool-for-machine-learning/13411/3), [source](https://dl.acm.org/doi/10.1007/s11042-022-13163-w)). However, for ML data to be usable, it must be organized systematically. _did:ipfs_ can assist by storing tags within service endpoints, categorizing files by type, format, and content. The currently implemented `did:ipfs service provider` shows how the "tags" service endpoint could hold metadata that makes files in the "file" attribute ready and discoverable for ML training. Combined with uploader record-keeping, _did:ipfs_ could support a marketplace for IPFS-based training data, connecting data owners with model developers.



### FAQ

#### Is _did:ipfs_ compliant with the W3C DID standard?
The W3C has established a standard for DIDs (see [here](https://www.w3.org/TR/did-core/)). While _did:ipfs_ was developed with this standard in mind, full compliance has not been the primary focus thus far. Currently, _did:ipfs_ is primarily designed to extend file identification capabilities within IPFS. As _did:ipfs_ demonstrates its utility as a DID method, future work will focus on achieving full compliance with the W3C DID standard and integration with the [DIF Universal Resolver](https://dev.uniresolver.io/) (see more details [here](#utility-of-didipfs-as-a-did-method)).

#### How does the `did:ipfs service provider` handle self-referential CIDs?
_did:ipfs_ uses [CIDs](https://docs.ipfs.tech/concepts/content-addressing/) as method-specific identifiers, with each CID being derived from the content of its IPFS file. Since a file’s CID is directly determined by its content, this poses a challenge: how can _did:ipfs_ store DID Documents in IPFS that include their own `did:ipfs` ID (and thus the CID)? According to the [W3C’s guidance on intermediate representations of DID Documents](https://www.w3.org/TR/did-core/#did-subject), _did:ipfs_ can store a non-compliant version of a DID Document in IPFS, provided that the fully resolved DID Document meets W3C standards. This approach allows _did:ipfs_ to avoid issues with self-referential CIDs, enabling files in IPFS to reference their own CID within their content.

### Future Work
1. Enhance error handling for the `did:ipfs service provider`.
2. Achieve full compliance of _did:ipfs_ with the W3C DID standard and DIF’s Universal Resolver.
3. Conduct a comprehensive comparative analysis between _did:ipfs_ and other DID methods.
4. Develop _did:ipfs_ services, such as an IPFS search engine and an IPFS-based machine learning data marketplace.
5. Strengthen IPFS data permanence by facilitating connections between file uploaders and storage nodes for exchanging storage proofs to ensure permanence guarantees.
6. Implement trustworthy timestamps within did:ipfs DID Documents, potentially through the integration of Qualified Trust Service Providers (QTSPs).