import { createContext, useContext, useEffect, useState } from "react";
import { useConnectedWallet } from "@saberhq/use-solana";
import * as anchor from "@project-serum/anchor";

import { UserData } from "types";
import { useProgram } from "./ProgramProvider";

const DEFAULT_CONTEXT = {
  user: null,
};

export const UserContext = createContext(DEFAULT_CONTEXT);

export function useUser() {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const { solcialProgram } = useProgram();

  const wallet = useConnectedWallet();

  useEffect(() => {
    if (wallet && wallet.connected) {
      const getUser = async () => {
        try {
          const [userPda] = await anchor.web3.PublicKey.findProgramAddress(
            [
              anchor.utils.bytes.utf8.encode("user"),
              wallet.publicKey.toBuffer(),
            ],
            solcialProgram.programId
          );
          let userData = await solcialProgram.account.user.fetch(userPda);
          console.log(
            "Log ~ file: UserProvider.tsx:32 ~ getUser ~ userData:",
            userData.dateOfBirth
          );
          userData = {
            ...userData,
            gender: userData.gender.toString(),
            dateOfBirth: userData.dateOfBirth.toString(),
            initialized: true,
          };
          setUser(userData);
        } catch (e) {
          setUser({
            username: wallet.publicKey.toString(),
            initialized: false,
          });
        }
      };
      getUser();
    } else {
      setUser(null);
    }
  }, [wallet, solcialProgram]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
