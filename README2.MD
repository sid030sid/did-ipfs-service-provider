# did:ipfs
This repo introduces ``did:ipfs``, world's first IPFS based DID method following the official standard for Decentralized Identifiers (DIDs) provided by W3C. 
In addition, this repo provides a ``did:ipfs service`` which, inter alia, allows anyone to create DIDs. 
In detail, the ``did:ipfs service`` is an API with Swagger UI that can be used to upload files to IPFS that are identifiable with a DID of method: ipfs. 
``did:ipfs`` is a new did method...TODO

## did:ipfs definition
`did:ifps` follows the official standard for DIDs provided by W3C. 
- DID Controller = did of any method
- verification method
- Service endpoints: 
    - Linked Domains
    - Linked Verifiable Presentations --> can be used for personhood credentials (might be essential for use case 3: Data market)
- File = file intended to be uplaoded to IFPS is stored here in a specific format (this is for use case 1: Verifiable Documenting)

## Comparative analysis: did:ipfs vs. other DID methods
Compared to other DID methods, did:ipfs...
1. provides limitless data scalability of its DID Documents
2. enables the inclusion of any data, e.g. pictures, tables etc., in its DID Documents
3. allows its creators to chose between public or private DID Documents
4. stores its DID Documents immutably and permanently (note: data permanency is not guranteed by default. To gurantee data permanency)
5. DID interoperability: controllers of did:ipfs DID Documents can be registered as controller in DID Document using a did from any did method (ipfs, key, cheqd etc.)

Other DIDs:
- [did:ipid](https://did-ipid.github.io/ipid-did-method/)
- did:key
- did:cheqd
- did:ebsi
- did:web
note: we only comapre to DID methods which are complianbt to DIF Universal resolver: https://docs.cheqd.io/product/architecture/adr-list/adr-001-cheqd-did-method
note: we only compare to DID methods that are most frequently used
note: this survey on DID methods was condsiderd for the comparative analysis: https://ceur-ws.org/Vol-3488/paper05.pdf


## Use cases of did:ipfs
- Verifiable Documenting: recording ownership and/or authorship of IPFS files in a trustworthy and decentralized manner that does not rely on the expensive usage of Blockchains (e.g. NFTs)
- IPFS search: tagging IPFS file based on their content for an IPFS content-based search engine
- Data market: unlocking the untapped data mine of IPFS by transforming it into a data market where data producers and data buyers come together. Data buyers are, for instance, trainers of machine learning models, scientists seeking data for quantative research, or...


## Future work
1. add trustworthy timestamp to each did:ipfs (e. g. with QTSPs)
2. enable the creation of different DID Document versions for each DID (with did:cheqd as role model)
3. add did:ipfs to [DIF's universal resolver](https://dev.uniresolver.io/)