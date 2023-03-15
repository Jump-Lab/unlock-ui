import LitJsSdk from "@lit-protocol/sdk-browser";
import { LitArgs } from "./metadata";
import JSZip from "jszip";

import { NETWORK, solRpcConditions } from "./utils";

/**
 * 1) Fetch encrypted .zip file from url (shadow-drive)
 * 2) with LIT access-control from metadata fetch the decryption key from LIT Network
 * 3) decrypt
 *
 * @param url {string} - sitting on-chain pointing to shadow-drive
 * @param metadata - metadata sitting on shadow-drive behind url
 * @returns {Promise<JSZip>} - decrypted .zip file
 */
export async function decrypt(
  url,
  { encryptedSymmetricKey, solRpcConditions }
) {
  console.log(1)
  const client = new LitJsSdk.LitNodeClient({ debug: true });
  await client.connect();
  window.litNodeClient = client;
  console.log(2)

  const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: NETWORK });
  console.log(3)

  // get encryption key
  // Note, below we convert the encryptedSymmetricKey from a UInt8Array to a hex string.
  // This is because we obtained the encryptedSymmetricKey from "saveEncryptionKey" which returns a UInt8Array.
  // But the getEncryptionKey method expects a hex string.
  const encryptedHexKey = client.uint8arrayToString(
    encryptedSymmetricKey,
    "base16"
  );
  const retrievedSymmetricKey = await client.getEncryptionKey({
    solRpcConditions,
    toDecrypt: encryptedHexKey,
    chain: NETWORK,
    authSig,
  });
  console.log(4)

  const encryptedZip = await fetch(url).then((response) =>
    response.blob()
  );
  console.log(5)

  const decrypted = await LitJsSdk.decryptZip(
    encryptedZip,
    retrievedSymmetricKey
  );

  return decrypted;
}
