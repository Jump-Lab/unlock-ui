import {
  Metaplex,
  PublicKey,
  toMetaplexFileFromBrowser,
} from "@metaplex-foundation/js";

import { SolcialPostMetadata } from "./types";

export async function createPost(
  nftMetadata: SolcialPostMetadata,
  metaplex: Metaplex
) {
  try {
    const {
      name,
      description,
      collectionAddress,
      encryptedSymmetricKey,
      solRpcConditions,
      file,
    } = nftMetadata;
    console.log("Log ~ file: createPost.ts:22 ~ file:", file);
    const { uri } = await metaplex.nfts().uploadMetadata({
      name,
      description,
      image: await toMetaplexFileFromBrowser(file),
      properties: {
        encryptedSymmetricKey,
        solRpcConditions,
      },
    });

    const creationResult = await metaplex.nfts().create({
      name,
      sellerFeeBasisPoints: 333,
      isCollection: false,
      collection: new PublicKey(collectionAddress),
      uri,
    });
    return creationResult.nft.address.toString();
  } catch (e) {
    console.log("createPost error:", e);
  }
}
