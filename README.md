# Transaction Management Fullstack - Level 1

Your task is to **build a fullstack app** that **fulfills the [Transaction Management API](https://infra.devskills.app/transaction-management/api/3.1.0)** and **make the provided E2E tests pass**.

Please agree with your hiring team regarding the tech stack choice.

Here's how the frontend could look:

![Mockup](https://user-images.githubusercontent.com/1162212/116609549-cbf29b80-a934-11eb-876e-6d5c20061f13.png)

Feel free to tweak the UI, but please ensure that the following HTML is in place.

#### The form for submitting transactions

```html
<form ... >
  <input data-type="account-id" ... />
  <input data-type="amount" ... />
  <input data-type="transaction-submit" type="submit" ... />
</form>
```

Both input **fields should be cleared** after the form is submitted.

#### The transaction list

Every new transaction goes on **the top of the list** and should have an enclosing `<div />` with the following structure:

```html
<div 
     data-type="transaction"
     data-account-id="${transaction-account-id}"
     data-amount="${transaction-amount}"
     data-balance="${current-account-balance}" ...>
  ...
</div>
```

- `${transaction-account-id}` - account id of the corresponding transaction.
- `${transaction-amount}` - transaction amount.
- `${current-account-balance}` - the current account balance right after submitting the transaction (only needed to be initialized for the transactions submitted from the current client).

## Before you get started

### Import boilerplate

Follow [this link](https://docs.devskills.co/collections/85-the-interview-process/articles/342-importing-challenge-boilerplate) to get the boilerplate code for your tech stack to configure a minimal setup for running the E2E tests.

<details>
<summary>Alternatively, use the manual setup.</summary>

1. Update the `baseUrl` (where your frontend runs) in [cypress.json](cypress.json).
2. Update the `apiUrl` (where your backend runs) in [cypress.json](cypress.json).
3. Update the [`build`](package.json#L5) and [`start`](package.json#L6) scripts in [package.json](package.json) to respectively build and start your app.

</details>

### Get familiar with the API

Follow [this link](https://infra.devskills.app/transaction-management/api/3.1.0) to find the API documentation. Feel free to try out a few requests to better understand how the API should work.

### Try running the E2E tests locally

```bash
npm install
npm run build # should build your fullstack app
npm run start # should start your fullstack app
npm run test
```

## What we expect from you

1. Make the provided E2E tests pass.
2. Keep server data in memory.
3. Push your code to the new `implementation` branch. We encourage you to commit and push your changes regularly as it's a good way for you to showcase your thinking process.
4. Create a new pull request, but please **do not merge it**.
5. Await further instructions from the hiring team.

## Need help?

Start with [Troubleshooting](https://www.notion.so/Troubleshooting-d18bdb5d2ac341bb82b21f0ba8fb9546), and in case it didn't help, create a new GitHub issue. We'll get back to you.

## Time estimate

**1-3 hours** depending on your experience level.

---

Made by [DevSkills](https://devskills.co).

How was your experience? **Give us a shout on [Twitter](https://twitter.com/DevSkillsHQ) / [LinkedIn](https://www.linkedin.com/company/devskills)**.
