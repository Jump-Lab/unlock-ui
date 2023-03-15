import {
  Metaplex,
  PublicKey,
  toMetaplexFileFromBrowser,
} from "@metaplex-foundation/js";

import { SolcialCommunityMetadata } from "./types";

const solcialCollectionAddress = new PublicKey(
  process.env.NEXT_PUBLIC_SOLCIAL_COLLECTION_ADDRESS
);

export async function createCommunity(
  nftMetadata: SolcialCommunityMetadata,
  metaplex: Metaplex
) {
  console.log("Log ~ file: createCommunity.ts:17 ~ metaplex:", metaplex.identity().publicKey.toString())
  try {
    const { name, description, file } = nftMetadata;
    // const { uri } = await metaplex.nfts().uploadMetadata({
    //   name,
    //   description,
    //   image: await toMetaplexFileFromBrowser(file[0]),
    // });
    // console.log("Log ~ file: createCommunity.ts:26 ~ const{uri}=awaitmetaplex.nfts ~ uri:", uri)
    const uri = "https://nftstorage.link/ipfs/bafkreihfoungap3hqbg7turdufg77nmrhadrnpqoz4cc2zbscrfulygpjy"

    const creationResult = await metaplex.nfts().create({
      name,
      sellerFeeBasisPoints: 333,
      isCollection: true,
      collection: solcialCollectionAddress,
      uri,
    });
    console.log("Log ~ file: createCommunity.ts:34 ~ creationResult ~ creationResult:", creationResult)
    return creationResult.nft.address.toString();
  } catch (e) {
    console.log("createNft error:", e);
  }
}
