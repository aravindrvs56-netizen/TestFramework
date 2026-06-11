# Manual Test Cases — Login Module

**Application:** OrangeHRM Demo  
**URL:** https://opensource-demo.orangehrmlive.com/  
**Module:** Login (Authentication)  
**Finance Context:** Secure access to payroll and HR finance workflows requires reliable authentication controls.

---

## TC-LOGIN-001 — Valid Admin Login

| Field | Details |
|-------|---------|
| **TC ID** | TC-LOGIN-001 |
| **Description** | Verify that a valid admin user can log in and reach the dashboard |
| **Preconditions** | User is on the OrangeHRM login page; valid admin credentials are available (`Admin` / `admin123`) |
| **Steps** | 1. Navigate to the login page<br>2. Enter valid username `Admin`<br>3. Enter valid password `admin123`<br>4. Click **Login** |
| **Expected Result** | User is redirected to the Dashboard; URL contains `/dashboard/index`; page title is `OrangeHRM`; Dashboard header and side navigation are visible |
| **Priority** | High |

---

## TC-LOGIN-002 — Valid Logout

| Field | Details |
|-------|---------|
| **TC ID** | TC-LOGIN-002 |
| **Description** | Verify that an authenticated user can log out successfully |
| **Preconditions** | User is logged in as Admin and on the Dashboard |
| **Steps** | 1. Click the user profile dropdown in the top-right corner<br>2. Click **Logout** |
| **Expected Result** | User is redirected to the login page; URL contains `/auth/login`; login form is displayed |
| **Priority** | High |

---

## TC-LOGIN-003 — Invalid Username

| Field | Details |
|-------|---------|
| **TC ID** | TC-LOGIN-003 |
| **Description** | Verify login is rejected when username does not exist |
| **Preconditions** | User is on the login page |
| **Steps** | 1. Enter an invalid username (e.g. `not_a_real_user`)<br>2. Enter a valid password `admin123`<br>3. Click **Login** |
| **Expected Result** | User remains on the login page; error message `Invalid credentials` is displayed |
| **Priority** | High |

---

## TC-LOGIN-004 — Invalid Password

| Field | Details |
|-------|---------|
| **TC ID** | TC-LOGIN-004 |
| **Description** | Verify login is rejected when password is incorrect |
| **Preconditions** | User is on the login page |
| **Steps** | 1. Enter valid username `Admin`<br>2. Enter an incorrect password (e.g. `wrong_password`)<br>3. Click **Login** |
| **Expected Result** | User remains on the login page; error message `Invalid credentials` is displayed |
| **Priority** | High |

---

## TC-LOGIN-005 — Blank Username

| Field | Details |
|-------|---------|
| **TC ID** | TC-LOGIN-005 |
| **Description** | Verify validation when username field is left empty |
| **Preconditions** | User is on the login page |
| **Steps** | 1. Leave username field blank<br>2. Enter valid password `admin123`<br>3. Click **Login** |
| **Expected Result** | User remains on the login page; required field validation message is shown for username |
| **Priority** | Medium |

---

## TC-LOGIN-006 — Blank Password

| Field | Details |
|-------|---------|
| **TC ID** | TC-LOGIN-006 |
| **Description** | Verify validation when password field is left empty |
| **Preconditions** | User is on the login page |
| **Steps** | 1. Enter valid username `Admin`<br>2. Leave password field blank<br>3. Click **Login** |
| **Expected Result** | User remains on the login page; required field validation message is shown for password |
| **Priority** | Medium |

---

## TC-LOGIN-007 — Invalid Username and Password

| Field | Details |
|-------|---------|
| **TC ID** | TC-LOGIN-007 |
| **Description** | Verify login is rejected when both credentials are invalid |
| **Preconditions** | User is on the login page |
| **Steps** | 1. Enter invalid username `invalid_user`<br>2. Enter invalid password `wrong_password`<br>3. Click **Login** |
| **Expected Result** | User remains on the login page; error message `Invalid credentials` is displayed; no dashboard access is granted |
| **Priority** | High |

---

## TC-LOGIN-008 — Extremely Long Username and Password

| Field | Details |
|-------|---------|
| **TC ID** | TC-LOGIN-008 |
| **Description** | Verify system behavior with boundary-length credentials (200+ characters) |
| **Preconditions** | User is on the login page |
| **Steps** | 1. Enter a username exceeding 200 characters<br>2. Enter a password exceeding 200 characters<br>3. Click **Login** |
| **Expected Result** | Login is not successful; user remains on login page or receives an error/validation response; application does not crash or expose sensitive data |
| **Priority** | Low |
