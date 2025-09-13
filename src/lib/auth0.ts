// src/lib/auth0.ts
// Fournit la configuration Auth0 pour l'app React
export const auth0Config = {
  domain: 'dev-e4z37poz13ggzazg.us.auth0.com',
  clientId: 'K6AZTNFjf04mBlOH73B8qjKSVhchZ7YF',
  authorizationParams: {
    redirect_uri: window.location.origin + '/fr/dashboard',
  },
};
