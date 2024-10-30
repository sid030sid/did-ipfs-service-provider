const tagFile = (base64FileString: string) => {
    //TODO in future: add pipe that validates the content of the file (= base64FileString) for training ML models
}

const qeuryFile = (base64FileString: string) => {
    //TODO in future: add pipe that makes the content of the file (= base64FileString) queryable
}

export function generateDidDocument(tagging: boolean, queryable: boolean, base64FileString: string){
    // tag the file, if tagging is set to true
    if(tagging){
        tagFile(base64FileString);
    }

    // if queryable is set to true, make the file queryable
    if(queryable){
        qeuryFile(base64FileString);
    }

    // construct did document
    const didDocument = {
        "@context": "https://www.w3.org/ns/did/v1",
        "id": "did:ipfs:QmW8JZgH8m4t1Y4dJ5Z4QdZw4r2"
    }
    return didDocument;
}