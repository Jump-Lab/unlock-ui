import { Metaplex, toMetaplexFileFromBrowser } from "@metaplex-foundation/js";
import { SolcialPostMetadata } from "./types";

export async function createNft(
  nftMetadata: SolcialPostMetadata,
  metaplex: Metaplex
) {
  try {
    const { uri } = await metaplex.nfts().uploadMetadata({
      ...nftMetadata,
      image: await toMetaplexFileFromBrowser(nftMetadata.file),
    });

    const creationResult = await metaplex.nfts().create({
      name: "Unlock social",
      uri,
      sellerFeeBasisPoints: 333,
      isCollection: false,
    });
    console.log(
      "Log ~ file: createNft.ts:18 ~ creationResult ~ creationResult:",
      creationResult
    );

    return creationResult.nft.address.toString();
  } catch (e) {
    console.log("createNft error:", e);
  }
}
