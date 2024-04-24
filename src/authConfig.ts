/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

// import { LogLevel } from '@azure/msal-browser';

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */

export const msalConfig = {
  auth: {
    clientId: 'b564eb6a-c4ac-4077-8565-8784703b4c52',
    authority: 'https://login.microsoftonline.com/6c1119a4-f378-4fda-b12e-5caac12c97e9',
    redirectUri: 'http://localhost:3000',
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    // loggerOptions: {
    //   loggerCallback: (level: any, message: any, containsPii: any) => {
    //     if (containsPii) {
    //       return;
    //     }
    //     switch (level) {
    //       case LogLevel.Error:
    //         // console.error(message);
    //         return;
    //       case LogLevel.Info:
    //         // console.info(message);
    //         return;
    //       case LogLevel.Verbose:
    //         // console.debug(message);
    //         return;
    //       case LogLevel.Warning:
    //         // console.warn(message);
    //         break;
    //       default:
    //     }
    //   },
    // },
  },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: ['User.Read'],
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API.
 * For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};
