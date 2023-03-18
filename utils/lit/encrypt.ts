import LitJsSdk from "@lit-protocol/sdk-browser";
import { LitArgs } from "./metadata";
import { NETWORK, solRpcConditions } from "./utils";

export async function encrypt(files: File[], litArgs: LitArgs) {
  const client = new LitJsSdk.LitNodeClient({ debug: true });
  await client.connect();
  //@ts-ignore
  window.litNodeClient = client;
  const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: NETWORK });

  const { encryptedZip, symmetricKey } = await LitJsSdk.zipAndEncryptFiles(
    files
  );

  const encryptedSymmetricKey = await client.saveEncryptionKey({
    solRpcConditions: solRpcConditions(litArgs),
    chain: NETWORK,
    authSig: authSig,
    symmetricKey,
    permanent: 1,
  });

  const file = new File([encryptedZip], "encrypted.zip");
  return {
    encryptedSymmetricKey: LitJsSdk.uint8arrayToString(
      encryptedSymmetricKey,
      "base16"
    ),
    file,
  };
}
