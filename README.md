# Interview Assignment: Account Management Fullstack - Level 1

👋 Hi there!

In this coding assignment, your task is to build a fullstack app that that integrates and implements the [Account Management API](api-specification.yml) to create and read account transactions.

See the instructions below to get the idea of how it should work.

## Backend
The backend part should implement the provided [API spec](api-specification.yml). There is a suite of automated API tests that can help you validate the expected behavior. See the intstructions below on how to run those.

## Frontend
Here's a mockup to get the idea of how the Frontend should look.

![Mockup](mockup.png)

Feel free to tweak the UI but please make sure it includes the following:

* There's a form with two input fields (`Account ID` and `Amount`). Whenever the form is submitted, a new transaction with the collected data should be created on the server.
* There's a list of the previously submitted transactions where each transaction should have the following messaging:
  * When the transaction amount is > 0 : "Transferred $`{amount}` to `{account_id}`. Current `{account_id}`'s balance is `${current_account_balance}`".
  * When the transaction amount is < 0 : "Withdrew $`{amount}` from `{account_id}`. Current `{account_id}`'s balance is `${current_account_balance}`".
* A newly submitted transaction should appear at the top of the list.
* This assignment comes with an automated test suite. To make it work with your app, please do the following:
  * Add a `data-cy` attribute to the following HTML elements:
    * Form: `<form data-cy="form" ... />`
    * Account ID: `<input data-cy="accountId" ... />`
    * Amount: `<input data-cy="amount" ... />`
  * Define a transaction list using an [HTML description list](https://www.w3schools.com/tags/tag_dl.asp).

## What's included 🗂
We've added the [Account Management API](api-specification.yml) specification defined in the Open API format,a [Cypress](https://www.cypress.io/) test suite to validate the Frontend, and a Newman test suite to validate the Backend. 

To make sure that your Frontend part of the app works as expected, run the following:
```shell script
npm install # Installs the required dependencies
# Launch your app here
npm run test # Runs the Frontend tests
```
Or using yarn:
```shell script
yarn install # Installs the required dependencies
# Launch your app here
yarn run test # Runs the Frontend tests
```

To validate the Backend, run the following:
```shell script
npm install -g newman // Install the test runner
newman run api-tests.json // Run the tests
```

## What we're looking for ⭐️

### Backend
- **Use a SQL database as the service datastore.** We want to see how you design your database schema and SQL queries for working with the service data.
- **Create a backend service that implements the provided API.** Make sure all predefined API tests pass. It will involve the following:
  - Handling invalid HTTP requests;
  - Creating new transactions;
  - Retreiving the current account balance.
- **Optimize the GET endpoints for speed.** When designing your service, ensure that the GET endpoints remain fast with the database growing in size.
- **Organize your code as a set of low-coupled modules**. Avoid duplication and extract re-usable modules where it makes sense, but don't break things apart needlessly. We want to see that you can create a codebase that is easy to maintain.

### Frontend
- **Integrate with a REST API**. Using the provided API spec, figure out the right service endpoints to use.
- **Organize your code with components**. Extract components that help you avoid duplication, but don't break things apart needlessly. We want to see that you can implement the UI with sound HTML semantics.

### Common
- **Document your decisions**. Extend this README.md with info about how to run your application along with any hints that will help us review your submission and better understand the decisions you made.

## How to submit your solution 📬

1. Commit your changes to a new branch called implementation.
2. Create a Pull Request from implementation.

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
