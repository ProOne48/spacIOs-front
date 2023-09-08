export interface EnvironmentInterface {
  production: boolean;
  apiPort?: number;
  apiPath: string;
  frontendDomain?: string;
  apiDomain?: string;
  googleClientId: string;
  googleSecretKey?: string;
  apiProtocol?: string;
  mockToken?: string;
}
