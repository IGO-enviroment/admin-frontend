import React, { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ApiAuthInstance } from "@/shared/constants";
import { setCookie } from "@/shared/cookies/set";

export interface IAuthStore {
   isAuth: boolean;
   setIsAuth: Dispatch<SetStateAction<boolean>>;
}

export const authContext = createContext<IAuthStore>(null);

export const useAuthContext = () => {
   return useContext(authContext);
};

export const AuthStoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
   const [isAuth, setIsAuth] = useState<false>(null);

   return <authContext.Provider value={{ isAuth, setIsAuth }}>{children}</authContext.Provider>;
};

export const userContext = createContext(null);

export const useUserContext = () => {
   const userStore = useContext(userContext);

   return { userStore };
};

export const UserStoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
   const [user, setUser] = useState<any>(null);

   return <userContext.Provider value={{ user, setUser }}>{children}</userContext.Provider>;
};

const fetchUser = async () => {
   const res = await ApiAuthInstance.get("/v1/check", {
      headers: {
         "ngrok-skip-browser-warning": "true",
      },
   });

   console.log(res);
   return res.data;
};

const login = async ({ email, password }: { email: string; password: string }) => {
   const res = await ApiAuthInstance.post(
      "/v1/auth/token/generate",
      {
         email,
         password,
      },
      {
         headers: {
            "ngrok-skip-browser-warning": "true",
         },
      },
   );

   console.log(res);

   const { name, value, expires } = res.data;
   console.log(name, value, { expires });
   setCookie(name, value, { expires });
};

export const AuthGuard: FC<{ children: ReactNode }> = ({ children }) => {
   const { isAuth, setIsAuth } = useAuthContext();

   const { userStore } = useUserContext();

   const [isLoading, setIsLoading] = useState(false);

   const tryFetchUser = async () => {
      try {
         setIsLoading(true);
         const user = await fetchUser();

         userStore.setUser(user);
         setIsAuth(true);
      } catch {
         setIsAuth(false);
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      console.log(userStore);
      tryFetchUser();
   }, []);

   if (isLoading) return <CircularProgress />;

   if (!isAuth) {
      return <LoginForm setIsLoading={setIsLoading} />;
   }

   return <>{children}</>;
};

interface ILoginFormProps {
   setIsLoading: (isLoading: boolean) => void;
}

export const LoginForm: FC<ILoginFormProps> = ({ setIsLoading }) => {
   const { userStore } = useUserContext();
   const methods = useForm();
   const { setIsAuth } = useAuthContext();

   const submitForm = async ({ email, password }: { email: string; password: string }) => {
      await login({ email: email, password });
      const user = await fetchUser();

      userStore.setUser(user);
      setIsAuth(true);
      setIsLoading(false);
   };

   return (
      <Box display="flex" alignItems="center" justifyContent="center">
         <form onSubmit={methods.handleSubmit(submitForm)}>
            <TextField {...methods.register("email")} />
            <TextField {...methods.register("password")} type="password" />
            <Button type="submit">Войти</Button>
         </form>
      </Box>
   );
};
