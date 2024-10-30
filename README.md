# did:ipfs service provider
This repo contains a service provider for did:ipfs operations. The did:ipfs service provider is an API that can be locally run and used via Swagger UI.

## Set up
1. npm install
2. create `.env` file in root folder
3. add Pinata releated environment variables to `.env` file:
    - ``PINATA_API_JWT``: stores the API Access token for Pinata's APIs
    - ``PINATA_API_GATEWAY``: stores the user specific IPFS gateway hosted by Pinata 
4. add DID used as controller for did:ipfs DIDs: 
    - Option 1: generate did:key by running `node generateDidKey.js` in terminal while being in root folder
    - Option 2: add your already existing DID's private and public key as pem files, named `private.pem` and `public.pem` in folder ``certs`` (note: this option has not been tested, use with caution)
5. run `npm start` or `npm run start:dev` in terminal while being in root folder
6. open Swagger UI by entering `http://localhost:3000/api` in your browser

## Usage
### How to create a did:ipfs?

### How to resolve did:ipfs to its DID Document?

### How to create a did:ipfs with private DID Document?
note: Private DID Documents are only possible when one uses an own IPFS Cluster for storing the DID Documents or one uses Pinata to interact with IPFS (then the Swagger UI's toggle button for private DID doc can be used!)

# Devpost About page for DIF Hackathon
## What is _did:ipfs_?

## What I inspired me to create _did:ipfs_?

## What I learned creating _did:ipfs_?

## How I built _did:ipfs_?

## What challenges did I face during creation of _did:ifps?

## What's next for _did:ipfs_?