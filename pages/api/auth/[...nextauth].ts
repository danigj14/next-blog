import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        adminSecretKey: {
          label: "Secret Admin Key",
          type: "password",
          placeholder: "Secret Admin Key",
        },
      },
      authorize: async (credentials, req) => {
        const adminSecretKey = process.env.ADMIN_SECRET_KEY;

        if(!adminSecretKey)
          return null;

        if(credentials?.adminSecretKey === adminSecretKey)
          return {id: "0", email: null, name: null, image: null};

        return null;
      }
    }),
  ],
};

export default NextAuth(authOptions);
