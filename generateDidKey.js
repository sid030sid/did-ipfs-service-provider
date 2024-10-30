const { generateKeyPairSync } = require('crypto');
const { Buffer } = require('buffer');
const fs = require('fs');
require("dotenv").config();

// Function to convert raw key bytes to PEM format
const toPem = (keyBytes, type) => {
    const keyBase64 = Buffer.from(keyBytes).toString('base64');
    const pem = `-----BEGIN ${type} KEY-----\n${keyBase64.match(/.{1,64}/g).join('\n')}\n-----END ${type} KEY-----`;
    return pem;
};

const generateDidKey = async () => {
    // Generate an ECDSA key pair (P-256)
    const { publicKey, privateKey } = generateKeyPairSync('ec', {
        namedCurve: 'prime256v1', 
        publicKeyEncoding: {
            type: 'spki',
            format: 'der'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'der'
        }
    });

    // Convert keys to PEM format
    const publicKeyPem = toPem(publicKey, 'PUBLIC');
    const privateKeyPem = toPem(privateKey, 'PRIVATE');

    // Create the DID from the public key
    const bs58 = await import("bs58"); // Import bs58 library

    // Encode the public key in Base58 and create the DID
    const publicKeyBuffer = Buffer.from(publicKey);
    const publicKeyBase58 = bs58.default.encode(publicKeyBuffer);
    const did = `did:key:${publicKeyBase58}`;

    // Log the PEM formatted keys and DID
    console.log("DID:", did);
    console.log("Public Key in PEM format:\n", publicKeyPem);
    console.log("Private Key in PEM format:\n", privateKeyPem);

    // Set DID as .env variable
    fs.appendFileSync('.env', `ISSUER_DID=${did}`);

    // store private and public key as pem file in certs folder of backend
    fs.writeFileSync('./certs/private.pem', privateKeyPem);
    fs.writeFileSync('./certs/public.pem', publicKeyPem);
};

generateDidKey();