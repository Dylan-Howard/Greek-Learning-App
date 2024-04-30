/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * Enter here the user flows and custom policies for your B2C application
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
export const b2cPolicies = {
  names: {
    signUpSignIn: 'B2C_1_SignUp_SignIn',
  },
  authorities: {
    signUpSignIn: {
      authority: 'https://koinelearning.b2clogin.com/koinelearning.onmicrosoft.com/B2C_1_SignUp_SignIn',
    },
  },
  authorityDomain: 'koinelearning.b2clogin.com',
};

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig = {
  auth: {
    clientId: '4b132961-53dc-45b6-879a-0d5d1b2afdec', // This is the ONLY mandatory field that you need to supply.
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
    redirectUri: 'http://localhost:3000/DynamicInterlinear', // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
    postLogoutRedirectUri: '/', // Indicates the page to navigate after logout.
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: 'sessionStorage', // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};
// https://koinelearning.b2clogin.com/koinelearning.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_SignUp_SignIn
/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more
 * information, see: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const protectedResources = {
  api: {
    endpoint: 'http://localhost:3000/api/',
    scopes: {
      read: ['https://koinelearning.onmicrosoft.com/4b132961-53dc-45b6-879a-0d5d1b2afdec/User.Read'],
    },
  },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  // scopes: ['User.Read'],
  scopes: [],
};
