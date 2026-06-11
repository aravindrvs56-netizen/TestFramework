# Take-Home Finance QA Automation Framework

Production-quality test automation for a finance-adjacent HR/payroll application (OrangeHRM) and a complementary REST API (Reqres), built with Playwright, JavaScript, Page Object Model, and Allure reporting.

## Project Overview

This repository demonstrates end-to-end QA automation practices suitable for finance-domain applications where secure authentication, reliable API contracts, and actionable reporting are critical. It includes manual test design, UI automation, API automation, CI integration, and rich Allure reporting.

## Application Under Test

| Layer | Application | URL | Rationale |
|-------|-------------|-----|-----------|
| **UI** | OrangeHRM Open Source Demo | https://opensource-demo.orangehrmlive.com/ | Public HR/payroll demo with login workflows relevant to finance access control |
| **API** | JSONPlaceholder | https://jsonplaceholder.typicode.com | Stable public REST API for user management contract validation (Reqres.in now requires API keys) |

## Framework Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Playwright Test Runner                   │
├──────────────────────┬──────────────────────────────────────┤
│    UI Tests (POM)    │         API Tests (ApiClient)        │
│  LoginPage           │  GET /users, POST /users           │
│  DashboardPage       │  Status, schema, field validation    │
├──────────────────────┴──────────────────────────────────────┤
│  Config (env.js) │ Test Data │ Utils │ Allure Reporter       │
└─────────────────────────────────────────────────────────────┘
```

**Design principles:**
- **Page Object Model** — UI locators and actions are encapsulated in page classes; tests remain declarative.
- **Configuration-driven** — Base URLs and timeouts live in `config/env.js`.
- **Reusable API client** — `ApiClient` wraps Playwright's request context with consistent headers and logging.
- **No hardcoded waits** — Playwright auto-waiting and web-first assertions only.
- **Failure diagnostics** — Screenshots, video, and trace on failure; API payloads attached to Allure.

## Folder Structure

```
project-root/
├── .github/workflows/automation.yml   # GitHub Actions CI pipeline
├── config/
│   └── env.js                         # Environment configuration
├── pages/
│   ├── BasePage.js                    # Shared page helpers
│   ├── LoginPage.js                   # Login page object
│   └── DashboardPage.js               # Dashboard page object
├── test-data/
│   └── users.json                     # UI & API test data
├── tests/                             # Primary test directory
│   ├── ui/
│   │   └── login.spec.js              # UI automation (login/logout)
│   └── api/
│       └── usersApi.spec.js           # API automation (JSONPlaceholder)
├── ui-tests/ → tests/ui               # Assignment alias
├── api-tests/ → tests/api             # Assignment alias
├── screenshots/                       # Execution & report screenshots
├── utils/
│   ├── apiClient.js                   # Reusable HTTP client
│   ├── allureHelper.js                # Allure attachment helpers
│   ├── constants.js                   # Routes, messages, endpoints
│   └── logger.js                      # Structured logging
├── manual-test-cases.md               # 8 manual login test cases
├── playwright.config.js               # Playwright + Allure config
├── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js 18+ (recommended: 20 LTS)
- npm 9+
- Java 17+ (required for Allure report generation)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd TakeHomeFinanceProject

# Install dependencies
npm install

# Install Playwright browser
npx playwright install chromium
```

### Environment Variables (optional)

| Variable | Default | Description |
|----------|---------|-------------|
| `UI_BASE_URL` | `https://opensource-demo.orangehrmlive.com` | OrangeHRM base URL |
| `API_BASE_URL` | `https://jsonplaceholder.typicode.com` | REST API base URL |
| `REQRES_API_KEY` | _(empty)_ | Optional key if switching back to Reqres |
| `DEBUG` | `false` | Enable debug logging |

## Execution Commands

```bash
# Run all tests (UI + API)
npm run test

# Run UI tests only
npm run test:ui

# Run API tests only
npm run test:api

# Run tests in headed mode (debugging)
npm run test:headed

# Lint codebase
npm run lint

# Generate and open Allure report (requires Java 17+)
npm run allure
```

> **Note:** If `allure open` fails, ensure Java is available:
> `export JAVA_HOME="/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home"`

## Reporting

### Allure Report
After test execution, generate the Allure report:

```bash
npm run allure:generate   # Generate report to allure-report/
npm run allure            # Generate and open in browser
```

The report includes:
- Test summary (passed/failed/skipped)
- Duration per test
- Screenshots on UI failure
- API request/response attachments
- Trace and video links (via Playwright artifacts)

### Playwright HTML Report

```bash
npx playwright show-report
```

## Automated Test Coverage

### UI (mapped to manual cases)
| Automated Test | Manual TC | Scenario |
|----------------|-----------|----------|
| Successful login | TC-LOGIN-001 | Valid admin credentials |
| Invalid login | TC-LOGIN-007 | Invalid username + password |
| Logout | TC-LOGIN-002 | Valid logout after login |

### API
| Test | Endpoint | Validation |
|------|----------|------------|
| GET Users | `GET /users?page=1` | Status 200, pagination fields, user schema |
| Create User | `POST /users` | Status 201, name/job/id/createdAt |
| Negative Create | `POST /users` (missing name) | Contract deviation handling |

## Assumptions

1. OrangeHRM demo credentials (`Admin` / `admin123`) remain publicly available.
2. JSONPlaceholder is a mock API — `POST /users` does not persist data and accepts partial payloads (documented in negative test). Reqres.in can be used by setting `API_BASE_URL` and `REQRES_API_KEY`.
3. Tests run against live demo environments; occasional network latency is handled via Playwright retries in CI.
4. Single browser (Chromium) is sufficient for this assignment scope.

## Future Improvements

- Add visual regression testing for dashboard widgets
- Integrate environment-specific config (dev/staging/prod) via dotenv
- Expand API coverage with `PUT` and `DELETE` user endpoints
- Add accessibility (axe-core) checks on login page
- Parallelize UI tests with isolated auth state storage
- Add Slack/Teams notification on CI failure
- Implement custom Allure categories and severity mapping

## License

MIT
