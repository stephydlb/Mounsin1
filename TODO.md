# TODO: Implement Doctor and Patient Account Types

## 1. Enhance AuthGuard for Role-Based Access
- [x] Modify AuthGuard component to accept `allowedRoles` prop
- [x] Check if authenticated user's role is in allowedRoles
- [x] Redirect to appropriate page if role not allowed

## 2. Update Routing with Role Protection
- [ ] Read App.tsx to understand current routing
- [ ] Apply role guards to pages (e.g., doctor-only for managing appointments)
- [ ] Ensure patients can't access doctor features

## 3. Implement Doctor Appointment Management
- [x] Read AppointmentsPage.tsx
- [x] Add logic for doctors to accept/confirm appointments
- [x] Add scheduling functionality for doctors
- [x] Update appointment status actions

## 4. Add Medical Report Sending Feature
- [x] Read MedicalRecordsPage.tsx
- [x] Add functionality for doctors to create and send medical reports
- [x] Ensure patients can view reports sent by their doctors

## 5. Verify Registration and Login
- [ ] Confirm doctor registration includes clinic name, position, specialty
- [ ] Test login for both roles
- [ ] Ensure user data is properly stored and retrieved

## 6. Testing and Improvements
- [ ] Test role-based access
- [ ] Test doctor actions (appointments, reports)
- [ ] Suggest backend integration for real data
- [ ] Propose UI/UX improvements for better role distinction
