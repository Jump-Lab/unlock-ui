import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { NETWORK, solRpcConditions } from "./utils";

/**
 * Encrypt files with LIT Network so they can be published on the open-internet.
 *
 * @param files {FileList}
 * @param litArgs - build default with ./util
 * @returns {Promise<{key: Uint8Array, file: File}>}
 */
export async function encrypt(files, litArgs) {
    const client = new LitJsSdk.LitNodeClient({
        litNetwork: 'serrano',
    });
    console.log("connecting to LIT network");
    await client.connect();
    console.log("invoking signature request");
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: NETWORK });

    console.log("encrypting files");
    const { encryptedZip, symmetricKey } = await LitJsSdk.zipAndEncryptFiles(
        files
    );

    console.log("pushing key to network");
    const encryptedSymmetricKey = await client.saveEncryptionKey({
        solRpcConditions: solRpcConditions(litArgs),
        chain: NETWORK,
        authSig: authSig,
        symmetricKey: symmetricKey,
        permanent: 1
    });

    // build js file
    const file = new File([encryptedZip], "encrypted.zip")
    return { key: encryptedSymmetricKey, file }
}