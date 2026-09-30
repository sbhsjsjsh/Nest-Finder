# Security Specification - Mumbai Nest Finder

## Data Invariants
- A lead must have a 10-digit phone number.
- A lead must have all required property preference fields.
- A lead's timestamp must be the server time.

## The "Dirty Dozen" Payloads

1. **Identity Spoofing**: Attempt to read all leads without authentication.
2. **PII Leak**: Attempt to get a specific lead's phone/email without being the admin.
3. **State Shortcutting**: Attempt to create a lead with a pre-set ID.
4. **Resource Poisoning**: Attempt to submit a lead with a 1MB string for the name.
5. **Invalid Phone**: Submit a lead with an 8-digit phone number.
6. **Missing Field**: Submit a lead without the `budget` field.
7. **Bypass Validation**: Update a lead's email to an invalid format.
8. **Unauthorized Delete**: Attempt to delete a lead without admin privileges.
9. **Timestamp Manipulation**: Submit a lead with a fake `timestamp` in the past.
10. **Property Type Injection**: Submit a lead with an invalid `propertyType`.
11. **Mass Selection**: Attempt to list all leads using a blanket query.
12. **BHK Overflow**: Submit a lead with "100 BHK".

## Test Runner (Conceptual)
The rules will be verified using the Firestore emulator to ensure all the above payloads are denied for unauthorized users.
