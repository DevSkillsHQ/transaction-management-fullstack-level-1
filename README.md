# Interview Assignment: Account Management Fullstack - Level 1

👋 Hi there!

In this coding assignment, your task is to build a Fullstack app that integrates and implements the [Account Management API](api-specification.yml) to create and read account transactions.

See the instructions below to get the idea of how it should work.

## Backend
The backend part should implement the provided [API spec](api-specification.yml). There is a suite of automated API tests that can help you validate the expected behavior. See the instructions below on how to run them.

## Frontend
Here's a mockup to get the idea of how the Frontend should look.

![Mockup](mockup.png)

This assignment includes a test suite for the Frontend part and to make your app compatible with it please ensure the following (feel free to tweak the UI otherwise):

* There's a form with two input fields: Account ID and Amount. Whenever the form is submitted, a new transaction with the collected data should be created on the server. The HTML elements must have the following attributes:
  * Account ID input field: `data-type="account-id"`
  * Amount input field: `data-type="amount"`
  * Form: `data-type="transaction-form"`
* There's a list of the previously submitted transactions. Every newly submitted transaction should appear at the top of the list. The HTML element that represents a transaction should include the following HTML attributes: `data-type=transaction`, `data-account-id={transaction-account-id}`, `data-amount={transaction-amount}`, and `data-balance={current-account-balance}`

## What's included 🗂
We've added the [Account Management API](api-specification.yml) specification defined in the Open API format and [Cypress](https://www.cypress.io/) test suites to validate the Frontend and the Backend.

Before running the tests, update the `baseUrl` (where your Frontend runs) and the `apiUrl` (where your Backend runs) in [cypress.json](cypress.json), and then run your app.

Run the tests:
```shell script
yarn install # Install the required test dependencies
yarn run test:backend # Only run the Backend tests
yarn run test:frontend # Only run the Frontend tests
yarn run test # Run all tests
```

## What we're looking for ⭐️

### Backend
- **Use a SQL database as the service datastore.** We want to see how you design your database schema and SQL queries for working with the service data.
- **Create a backend service that implements the provided API.** Make sure all predefined API tests pass. It will involve the following:
  - Handling invalid HTTP requests;
  - Retreiving the current account balance.
- **Optimize the GET endpoints for speed.** When designing your service, ensure that the GET endpoints remain fast with the database growing in size.
- **Organize your code as a set of low-coupled modules**. Avoid duplication and extract re-usable modules where it makes sense, but don't break things apart needlessly. We want to see that you can create a codebase that is easy to maintain.

### Frontend
- **Integrate with a REST API**. Using the provided API spec, figure out the right service endpoints to use.
- **Organize your code with components**. Extract components that help you avoid duplication, but don't break things apart needlessly. We want to see that you can implement the UI with sound HTML semantics.

### Common
- **Document your decisions**. Extend this README.md with info about how to run your application along with any hints that will help us review your submission and better understand the decisions you made.

## How to submit your solution 📬

1. Update the [`build:fullstack`](package.json#L5) and [`start:fullstack`](package.json#L6) scripts in [package.json](package.json) that respectively build and run your application. 
2. Commit and push your changes to a new branch called `implementation`. A new [GitHub Actions](https://docs.github.com/en/free-pro-team@latest/actions/quickstart) run will trigger automatically based on the [predefined pipeline](.github/workflows/tests.yml). The pipeline will run the `build:fullstack` and `start:fullstack` scripts from above to spin up your application and run the predefined Cypress tests against it. In case you want to troubleshoot a particular pipeline run, you can access both the video and the screenshots taken by the [upload-artifact](https://github.com/actions/upload-artifact#where-does-the-upload-go) GitHub action.
3. Make sure your latest build has succesfully passed (you should see a green checkbox in GitHub).
4. Create a Pull Request from `implementation`.

## What to expect next 👀

1. An engineer will do a code review of your Pull Request. They might ask questions that you'll need to answer, so please watch for GitHub notifications in your mailbox.
2. In the end, the engineer who did the code review will merge your Pull Request. That's when your assignment is over.

## FAQ ❓

- Q: What resources am I allowed to use?
  - A: This assignment simulates a real-world engineering task, so feel free to use any resources you'd typically use.
- Q: How much time should I spend?
  - A: Try not to spend more than 4 hours.
- Q: What if I get stuck?
  - A: Feel free to create a GitHub issue on this repository describing your problem.
  

---

Made by [DevSkills](https://devskills.co). 

How was your experience? **Give us a shout on [Twitter](https://twitter.com/DevSkillsHQ) / [LinkedIn](https://www.linkedin.com/company/devskills)**.
