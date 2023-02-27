import LitJsSdk from "@lit-protocol/sdk-browser";
import { LitArgs } from "./metadata";
import { NETWORK, solRpcConditions } from "./utils";

/**
 * Encrypt files with LIT Network so they can be published on the open-internet.
 *
 * @param files {FileList}
 * @param litArgs - build default with ./util
 * @returns {Promise<{key: Uint8Array, file: File}>}
 */
export async function encrypt(files: File[], litArgs: LitArgs) {
  const client = new LitJsSdk.LitNodeClient({ debug: true });
  await client.connect();
  window.litNodeClient = client;
  const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: NETWORK });

  const { encryptedZip, symmetricKey } = await LitJsSdk.zipAndEncryptFiles(
    files
  );

  const encryptedSymmetricKey = await client.saveEncryptionKey({
    solRpcConditions: solRpcConditions(litArgs),
    chain: NETWORK,
    authSig: authSig,
    symmetricKey: symmetricKey,
    permanent: 1,
  });

  // build js file
  const file = new File([encryptedZip], "encrypted.zip");
  return { key: encryptedSymmetricKey, file };
}
