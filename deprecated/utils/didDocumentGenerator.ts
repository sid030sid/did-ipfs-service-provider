/*

const tagFile = (base64FileString: string) => {
    //TODO in future: add pipe that validates the content of the file (= base64FileString) for training ML models
    return ["tag_1", "tag_2", "...", "tag_n"];
}

const qeuryFile  = (base64FileString: string) =>{
    //TODO in future: add pipe that makes the content of the file (= base64FileString) queryable
    return ["queryProperty_1", "queryProperty_2", "...", "queryProperty_n"];
}

export function generateDidDocument(tagging: boolean, queryable: boolean, base64FileString: string) : DidDoc{
    // tag the file, if tagging is set to true
    let tags = []
    if(tagging){
        tags = tagFile(base64FileString);
    }

    // if queryable is set to true, make the file queryable
    let queryProperties = []
    if(queryable){
        queryProperties = qeuryFile(base64FileString);
    }

    // generate private and public key for DID subject

    // store private key in local cid-key database
    
    // generate JWK for DID Subject's public key

    // construct did document
    const didDocument = {
        "@context": [
            "https://www.w3.org/ns/did/v1",
            "https://identity.foundation/.well-known/did-configuration/v1",
            "https://w3id.org/security/suites/ed25519-2020/v1"
        ],
        "id": "did:ipfs:CID_PLACEHOLDER",
        "controller": [
            "did:example:id"
        ],
        "verificationMethod": [
            {
            "id": "did:ipfs:CID_PLACEHOLDER#key-1",
            "type": "JasonWebKey2020",
            "controller": "did:ipfs:CID_PLACEHOLDER",
            "publicKeyJwk": "lakms"
            }
        ],
        "authentication": [
            "did:ipfs:CID_PLACEHOLDER#key-1"
        ],
        "service": [
            {
            "id": "did:ipfs:CID_PLACEHOLDER#tags",
            "type": "LinkedTags",
            "serviceEndpoint": tags
            },
            {
                "id": "did:ipfs:CID_PLACEHOLDER#queryProperties",
                "type": "LinkedQueryProperties",
                "serviceEndpoint": queryProperties
            },
        ],
        "file": base64FileString
    }
    return didDocument;
}*/