import { Jwk } from "./jwk.interface";

export interface DidDoc {
    "@context": string[];
    id: string; 
    controller: string[]; //controller is the uploader of the file
    verificationMethod: { 
        id: string; 
        type: string; 
        controller: string; 
        publicKeyJwk: Jwk; 
    }[]; 
    authentication: string[];
    service: { 
        id: string; 
        type: string; 
        serviceEndpoint: string[]; 
    }[];
    file: string; 
}