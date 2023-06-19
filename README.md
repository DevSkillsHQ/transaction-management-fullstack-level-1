# Transaction Management Fullstack - Level 1

Your task is to build a fullstack app that allows to record financial transactions and view the transaction history.

Please agree with your hiring team regarding the tech stack choice.

The backend should implement the [Accounting API](https://infra.devskills.app/accounting/api/3.1.0).

The frontend should consist of a form for submitting transactions and a transaction list.

Transaction list displays the withdrawn or deposited amount for each transaction along with the affected account id. It also shows the current balance for the last submitted transaction.

Here's the UI mockup with hints:

![Accounting App Frontend](https://user-images.githubusercontent.com/450319/139797772-4e4b2744-447c-411f-9b04-7028ba5e89a1.png)

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

#### Transaction list

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
- `${current-account-balance}` - the current account balance right after submitting the transaction (only show for the last submitted transaction).

## Before you get started

### If you run into a problem

Head over to [our community on GitHub](https://github.com/orgs/DevSkillsHQ/discussions/categories/help) to get assistance.

### Import a boilerplate project

We have created a set of boilerplate projects for different tech stacks to help you get started quicker.

To import a boilerplate project:

1. Check out [this list](https://help.alvalabs.io/en/articles/7972852-supported-coding-test-boilerplates) to pick a desired boilerplate and copy its name (e.g., `backend-boilerplate-php-laravel`).
2. Go to the "Actions" tab of your GitHub repository and select the "Setup boilerplate" workflow in the left side panel.
3. In the "Run workflow" dropdown, paste the previously copied boilerplate name along with the branch name where you want the boilerplate to be imported (e.g., `implementation`) and click the "Run workflow" button.
4. After the workflow has finished, your selected boilerplate will be imported to the specified branch, and you can continue with your task there.

<details>
<summary>If you instead want to use a custom setup, complete the steps below to make the E2E tests run correctly.</summary>

1. Update the `baseUrl` (where your frontend runs) in [cypress.json](cypress.json).
2. Update the `apiUrl` (where your backend runs) in [cypress.json](cypress.json).
3. Update the [`build`](package.json#L5) and [`start`](package.json#L6) scripts in [package.json](package.json) to respectively build and start your app.

</details>

### Get familiar with the API

Follow [this link](https://infra.devskills.app/transaction-management/api/3.1.0) to find the API documentation.

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
5. Document the tech decisions you've made by creating a new review on your PR ([see how](https://www.loom.com/share/94ae305e7fbf45d592099ac9f40d4274)).
6. Await further instructions from the hiring team.

## Time estimate

Between **1-3 hours** depending on your experience level + the time to set up the project/environment (go with one of the provided boilerplates to move quicker).

Also, there is no countdown. The estimate is for you to plan your time.

---

Authored by [Alva Labs](https://www.alvalabs.io/).