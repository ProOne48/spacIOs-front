import { autoserializeAs } from 'dcerialize';

export class LoginResponse {
  /**
   * The token to be used for authentication
   */
  @autoserializeAs(() => String) token?: string;

  /**
   * Boolean indicating if the login was successful
   */
  @autoserializeAs(() => Boolean, 'login_ok') loginOk?: boolean;

  /**
   * Constructor
   *
   * @param token
   * @param loginOk
   */
  constructor(token?: string, loginOk?: boolean) {
    this.token = token;
    this.loginOk = loginOk;
  }
}
