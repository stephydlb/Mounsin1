# MongoDB Integration with Vercel - TODO

## Setup
- [x] Configure MongoDB Atlas cluster and create database
- [x] Obtain MongoDB connection string (MONGODB_URI)
- [x] Add MONGODB_URI to Vercel environment variables and local .env file

## Backend API
- [x] Create `api/_db.ts` for MongoDB connection caching
- [x] Create Mongoose models in `src/lib/models.ts`
- [x] Create serverless API routes in `api/` for:
  - users.ts
  - doctors.ts
  - appointments.ts
  - medical-records.ts
  - notifications.ts
  - pharmacies.ts
  - vaccinations.ts

## Frontend
- [x] Add API client functions in `src/lib/api.ts`
- [x] Update `src/contexts/AppContext.tsx` to use API calls instead of mock data
- [x] Test API integration locally with mock userId and data
- [x] Replace mock data usage in UI components with real data from context

## Deployment
- [x] Deploy to Vercel - Deployed to https://mounsin1-9by26asrm-stephydlbs-projects.vercel.app
- [ ] Verify environment variables are set correctly
- [ ] Test live API endpoints and frontend integration

## Optional
- [ ] Add authentication integration to secure API routes
- [ ] Add input validation and error handling in API routes
- [ ] Add unit and integration tests for API and frontend

---

This checklist will guide the final steps to complete the MongoDB integration with Vercel for the medical app.
