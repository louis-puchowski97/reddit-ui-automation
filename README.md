# Reddit UI Automation

This project is a UI automation test suite for Reddit using Playwright. It provides a set of automated tests to interact with Reddit, including user registration, login, and community interactions.

## Prerequisites

Before you start, ensure that you have the following installed on your machine:

- **Node.js** (version 14 or later)
- **Playwright** (for browser automation)

## Setup Instructions

Follow these steps to set up and run the Reddit UI automation tests:

### 1. **Create a Reddit Account**

- You need to create a Reddit account to use for the test. This account will be used for login and other user-specific interactions.
- If you already have a Reddit account, you can skip this step.

### 2. **Install Node.js 18.x LTS with nvm:**
Install Node.js 18.x LTS by running:

```bash
nvm install 18
```

Set Node.js 18.x as the default version:

```bash
nvm use 18
```

Verify the installation:

```bash
node -v
```

### 3. **Install Dependencies**
Once your environment variables are set, install the necessary dependencies by running:

```bash
npm install
npx playwright install
```

### 4. **Set Environment Variables**

After creating your Reddit account, you need to set your Reddit username and password as environment variables.

Run the following commands in your terminal (PowerShell):

```powershell
$env:REDDIT_USERNAME = "your_username"  # Replace with your Reddit username
$env:REDDIT_PASSWORD = "your_password"  # Replace with your Reddit password
```

This step ensures that the automation can log in to Reddit using your credentials.

### 5. **Run the Tests**
Finally, run the tests using the following command:

```bash
npm run test
```
This will execute the Playwright tests and launch the browser. The tests will interact with Reddit using the credentials you provided in the environment variables.

### 5. **View Test Results**
After the tests finish, you can view the results in the generated HTML report. 

The report is opened at the end of execution but you can also view it by running:

```bash
npx playwright show-report
```

This will display the HTML report showing the results of the tests.

## Test Suite

The test suite includes various tests such as:

- Login Tests: Ensures users can log in to Reddit.
- Registration Tests: Validates user registration functionality.
- Community Interaction: Tests that users can join and interact with Reddit communities.