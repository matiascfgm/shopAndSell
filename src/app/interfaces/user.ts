export interface User {
  uid: string;
  email: string;
  userName: string;
  name: string;
  image: {
    url: string;
    delete: string;
  };
  /**
   * No need to save this in the User, because it's saved in the Authentication object,
   * and has nothing to do with the User, only with the credentials.
   * @deprecated
   */
  emailVerified: boolean;
}
