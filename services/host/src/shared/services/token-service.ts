export class TokenService {
   static setTokens(accessToken: string) {
      localStorage.setItem("accessToken", accessToken);
   }

   static getAuthorizationHeader() {
      return `Bearer ${localStorage.getItem("accessToken")}`;
   }

   static getToken(name: "access") {
      return localStorage.getItem(`${name}Token`);
   }

   static deleteToken() {
      localStorage.removeItem("accessToken");
   }
}
