# TODO: Verify User Flows and Implement 2FA

## 1. Update Authentication Hook (src/hooks/useAuth.ts)
- [ ] Replace mock data with real API calls for login
- [ ] Add signup function using usersApi.create
- [ ] Update login to check against DB users

## 2. Add User Update API (api/users.ts)
- [ ] Add PUT method to handle user profile updates
- [ ] Ensure proper error handling

## 3. Update API Client (src/lib/api.ts)
- [ ] Add update function to usersApi

## 4. Update Profile Page (src/pages/profile/ProfilePage.tsx)
- [ ] Add API call to persist profile changes
- [ ] Add error handling for update failures

## 5. Update Auth Form (src/components/AuthForm.tsx)
- [ ] Add signup logic using new signup function
- [ ] Handle both login and signup in handleSubmit

## 6. Implement 2FA Setup (src/components/TwoFactorSetup.tsx)
- [ ] Integrate Auth0 2FA enable flow
- [ ] Add UI for 2FA setup and verification

## 7. Setup Auth0 Provider (src/main.tsx)
- [ ] Import and wrap app with Auth0Provider

## 8. Test User Flows
- [ ] Test user creation (client account)
- [ ] Test doctor account creation
- [ ] Test login with real credentials
- [ ] Test profile update persistence
- [ ] Test 2FA setup and verification
