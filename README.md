<!--TASK_INSTRUCTIONS_START-->
# Transaction Management Fullstack - Level 1

Your task is to build a fullstack app that allows the recording of financial transactions and viewing the transaction history.

Please agree with your hiring team regarding the tech stack choice.

The backend should implement the [Accounting API](https://infra.devskills.app/accounting/api/3.1.0), which is defined in the [Open API](https://www.openapis.org/) format.

<details>
<summary>Accounting API Specification</summary>

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "Accounting API",
    "version": "3.1.0"
  },
  "components": {
    "schemas": {
      "TransactionRequest": {
        "type": "object",
        "properties": {
          "account_id": {
            "type": "string",
            "format": "uuid"
          },
          "amount": {
            "type": "integer"
          }
        },
        "required": [
          "transaction_id",
          "account_id",
          "amount"
        ]
      },
      "Transaction": {
        "type": "object",
        "properties": {
          "transaction_id": {
            "type": "string",
            "format": "uuid"
          },
          "account_id": {
            "type": "string",
            "format": "uuid"
          },
          "amount": {
            "type": "integer"
          },
          "created_at": {
            "type": "string",
            "format": "date-time"
          }
        },
        "required": [
          "transaction_id",
          "account_id",
          "amount",
          "created_at"
        ]
      },
      "ArrayOfTransactions": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/Transaction"
        }
      },
      "Account": {
        "type": "object",
        "properties": {
          "account_id": {
            "type": "string",
            "format": "uuid"
          },
          "balance": {
            "type": "integer"
          }
        },
        "required": [
          "account_id",
          "balance"
        ]
      }
    },
    "examples": {
      "TransactionRequestWithPositiveAmount": {
        "value": {
          "account_id": "0afd02d3-6c59-46e7-b7bc-893c5e0b7ac2",
          "amount": 7
        }
      },
      "TransactionRequestWithNegativeAmount": {
        "value": {
          "account_id": "5ae0ef78-e902-4c40-9f53-8cf910587312",
          "amount": -4
        }
      },
      "TransactionWithPositiveAmount": {
        "value": {
          "transaction_id": "4bcc3959-6fe1-406e-9f04-cad2637b47d5",
          "account_id": "0afd02d3-6c59-46e7-b7bc-893c5e0b7ac2",
          "amount": 7,
          "created_at": "2021-05-12T18:29:40.206924+00:00"
        }
      },
      "TransactionWithNegativeAmount": {
        "value": {
          "transaction_id": "050a75f6-8df1-4ad1-8f5b-54e821e98581",
          "account_id": "5ae0ef78-e902-4c40-9f53-8cf910587312",
          "amount": -4,
          "created_at": "2021-05-18T21:33:47.203136+00:00"
        }
      },
      "ArrayOfTransactionsExample": {
        "value": [
          {
            "transaction_id": "4bcc3959-6fe1-406e-9f04-cad2637b47d5",
            "account_id": "0afd02d3-6c59-46e7-b7bc-893c5e0b7ac2",
            "amount": 7,
            "created_at": "2021-05-12T18:29:40.206924+00:00"
          },
          {
            "transaction_id": "050a75f6-8df1-4ad1-8f5b-54e821e98581",
            "account_id": "5ae0ef78-e902-4c40-9f53-8cf910587312",
            "amount": -4,
            "created_at": "2021-05-18T21:33:47.203136+00:00"
          }
        ]
      },
      "PositiveAccount": {
        "value": {
          "account_id": "fbf4a552-2418-46c5-b308-6094ddc493a1",
          "balance": 10
        }
      },
      "NegativeAccount": {
        "value": {
          "account_id": "9c3cd9a8-65c4-4d26-8488-ef9a40f57c37",
          "balance": -7
        }
      },
      "MaxTransactionVolumeExample": {
        "value": {
          "maxVolume": 4,
          "accountIds": [
            "44a92331-a533-4dd3-82e3-3ff75219e33b",
            "7c9be9e8-a6df-4f43-9a44-38c10ad0de4a"
          ]
        }
      }
    }
  },
  "paths": {
    "/ping": {
      "get": {
        "summary": "Healhcheck to make sure the service is up.",
        "responses": {
          "200": {
            "description": "The service is up and running."
          }
        }
      }
    },
    "/transactions": {
      "post": {
        "summary": "Creates a new transaction.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/TransactionRequest"
              },
              "examples": {
                "TransactionRequestWithPositiveAmount": {
                  "$ref": "#/components/examples/TransactionRequestWithPositiveAmount"
                },
                "TransactionRequestWithNegativeAmount": {
                  "$ref": "#/components/examples/TransactionRequestWithNegativeAmount"
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Transaction created.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Transaction"
                },
                "examples": {
                  "TransactionWithPositiveAmount": {
                    "$ref": "#/components/examples/TransactionWithPositiveAmount"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Mandatory body parameters missing or have incorrect type."
          },
          "405": {
            "description": "Specified HTTP method not allowed."
          },
          "415": {
            "description": "Specified content type not allowed."
          }
        }
      },
      "get": {
        "summary": "Get transactions",
        "responses": {
          "200": {
            "description": "Returns all previously created transactions.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ArrayOfTransactions"
                },
                "examples": {
                  "ArrayOfTransactionsExample": {
                    "$ref": "#/components/examples/ArrayOfTransactionsExample"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/transactions/{transaction_id}": {
      "get": {
        "summary": "Returns the transaction by id.",
        "parameters": [
          {
            "name": "transaction_id",
            "in": "path",
            "required": true,
            "description": "Transaction ID",
            "schema": {
              "type": "string",
              "format": "uuid"
            },
            "example": "023d2024-24bc-42c9-ab24-689eef6ea0f9"
          }
        ],
        "responses": {
          "200": {
            "description": "Transaction details.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Transaction"
                },
                "examples": {
                  "TransactionWithPositiveAmount": {
                    "$ref": "#/components/examples/TransactionWithPositiveAmount"
                  },
                  "TransactionWithNegativeAmount": {
                    "$ref": "#/components/examples/TransactionWithNegativeAmount"
                  }
                }
              }
            }
          },
          "400": {
            "description": "transaction_id missing or has incorrect type."
          },
          "404": {
            "description": "Transaction not found"
          }
        }
      }
    },
    "/accounts/{account_id}": {
      "get": {
        "summary": "Returns the account data.",
        "parameters": [
          {
            "name": "account_id",
            "in": "path",
            "required": true,
            "description": "Account ID.",
            "schema": {
              "type": "string",
              "format": "uuid"
            },
            "example": "5ba6e1b0-e3e7-483a-919a-a2fc17629a90"
          }
        ],
        "responses": {
          "200": {
            "description": "Account data.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Account"
                },
                "examples": {
                  "PositiveAccount": {
                    "$ref": "#/components/examples/PositiveAccount"
                  },
                  "NegativeAccount": {
                    "$ref": "#/components/examples/NegativeAccount"
                  }
                }
              }
            }
          },
          "400": {
            "description": "account_id missing or has incorrect type."
          },
          "404": {
            "description": "Account not found."
          }
        }
      }
    }
  }
}
```
</details>

The frontend should consist of a form for submitting transactions and a transaction list.

The transaction list displays the withdrawn or deposited amount for each transaction, along with the affected account ID. It also shows the current balance for the last submitted transaction.

Here's the UI mockup with hints:

![Accounting App Frontend](https://user-images.githubusercontent.com/450319/139797772-4e4b2744-447c-411f-9b04-7028ba5e89a1.png)

Feel free to tweak the UI, but ensure that the following HTML is in place.

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

## Additional requirements

1. Do your best to make the [provided E2E tests](cypress/e2e/test.cy.js) pass.
2. Keep the server data in memory.

<!--TASK_INSTRUCTIONS_END-->

## Getting started

<details>
  <summary>If you run into a problem</summary>
  
1. **Open a [GitHub Issue](https:\/\/docs.github.com\/en\/issues\/tracking-your-work-with-issues\/creating-an-issue):** Simply go to the "Issues" tab in this repository and click on "New issue".
2. **Describe Your Issue:** Briefly describe the problem you are encountering. Include key details like error messages or steps to reproduce the issue. This helps us understand and resolve your concern more efficiently.
3. **Automated Support:** Initially, our support bot will try to resolve your issue. If it is unable to help, a member of the Alva team will be notified and will step in to assist you.

**Note:** it is important to close the issue once your problem is resolved, open issues may indicate to the hiring team that your assignment is not yet ready for review.

</details>

<details>
  <summary>Import a starter project</summary>

  We have created a set of starter projects with different tech stacks to help you get started quickly.

  To import a starter project:
  
  1. Go to the "Actions" tab of your GitHub repository and select the "Setup boilerplate" workflow in the left side panel.
  2. In the "Run workflow" dropdown, select the desired boilerplate along with the branch name where you want the boilerplate to be imported (e.g., `implementation`) and click the "Run workflow" button (you can find all starter projects' definitions [here](https://help.alvalabs.io/en/articles/7972852-supported-coding-test-boilerplates)).
  
  After the workflow has finished, your selected boilerplate will be imported to the specified branch, and you can continue from there.
  
  
  > ⚠️ **Custom setup**
  > 
  > If you instead want to set up a custom project, complete the steps below to make the E2E tests run correctly:
  > 1. Update the `baseUrl` (where your frontend runs) in [cypress.config.js](cypress.config.js).
  > 2. Update the `apiUrl` (where your backend runs) in [cypress.config.js](cypress.config.js).
  > 3. Update the [`build`](package.json#L5) and [`start`](package.json#L6) scripts in [package.json](package.json) to respectively build and start your app.
  
</details>

<details>
  <summary>Prepare for coding</summary>

  To get this repository to your local machine, clone it with `git clone`.

  Alternatively, spin up a pre-configured in-browser IDE by clicking on the "Code" tab in this repository and then "Create codespace on {branch_name}".
  
  ![CleanShot 2023-10-13 at 00 00 32@2x](https://github.com/DevSkillsHQ/transaction-management-fullstack-level-1/assets/1162212/598ff1ae-238d-4691-8b7c-eb2228fdefac)

</details>

<details>
  <summary>Running the E2E tests</summary>

  > ⚠️ Before executing the tests, ensure [Node](https://nodejs.org/en) is installed and your app is running.

  ```bash
  npm install
  npm run test
  ```

</details>

## Submitting your solution for review

1. Create a new `implementation` branch on this repository and push your code there.
2. Create a new pull request from `implementation` **without merging it**.
5. Document the tech decisions you've made by creating a new review on your PR ([see how](https://www.loom.com/share/94ae305e7fbf45d592099ac9f40d4274)).
6. Await further instructions from the hiring team.

## Time estimate

Between 1 - 3 hours + the time to set up the project/environment (we suggest importing one of the provided project starters to save time).

However, there is no countdown. The estimate is for you to plan your time.

---

Authored by [Alva Labs](https://www.alvalabs.io/).
