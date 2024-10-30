import { DidDoc } from "./didDoc.interface";

export interface DidDocResolution {
    "@context": string; 
    didResolutionMetadata: { 
        contentType: string; 
        retrieved: string; 
        did: { 
            didString: string; 
            methodSpecificId: string; 
            method: string; 
        }; 
    }; 
    didDocument: DidDoc; 
}