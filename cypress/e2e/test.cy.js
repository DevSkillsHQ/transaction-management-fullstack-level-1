// DO NOT CHANGE THIS FILE!

const apiUrl = `${Cypress.env("apiUrl")}`

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

describe('Transaction Management Backend - Level 1', () => {
  
  it('Provides a functional healthcheck', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}/ping`,
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })   

  it('should create a transaction, read it, and fetch the updated account balance', () => {
    const accountId = uuid()
    let transactionId
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/transactions`,
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        account_id: accountId,
        amount: 7
      }
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.transaction_id).to.not.be.undefined
      transactionId = response.body.transaction_id
      cy.request({
        failOnStatusCode: false,
        method: 'GET',
        url: `${apiUrl}/transactions/${transactionId}`,
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.transaction_id).to.eq(transactionId)
        expect(response.body.account_id).to.eq(accountId)
        expect(response.body.amount).to.eq(7)
      })
    }).request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}/accounts/${accountId}`,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.account_id).to.eq(accountId)
      expect(response.body.balance).to.eq(7)
    })
  })

  it('should create transactions with negative amounts', () => {
    const accountId = uuid()
    let transactionId

    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/transactions`,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        account_id: accountId,
        amount: 4
      }
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.transaction_id).to.not.be.undefined
      transactionId = response.body.transaction_id
    }).request({
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}/accounts/${accountId}`,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.account_id).to.eq(accountId)
      expect(response.body.balance).to.eq(4)
    }).request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/transactions`,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        account_id: accountId,
        amount: -3
      }
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.transaction_id).to.not.be.undefined
      transactionId = response.body.transaction_id
    }).request({ // read account balance
      failOnStatusCode: false,
      method: 'GET',
      url: `${apiUrl}/accounts/${accountId}`,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.account_id).to.eq(accountId)
      expect(response.body.balance).to.eq(1)
    })
  })
})

describe('Transaction Management Frontend - Level 1', () => {
  it('The app can submit new transactions and show the historical ones', () => {
    cy.visit('/')

    // submit a transaction & verify the position on the list
    const accountId = uuid()
    const amount = 30
    const balance = 30
    cy.get('[data-type=account-id]').type(accountId)
    cy.get('[data-type=amount]').type(amount)
    cy.get('[data-type=transaction-submit]').click()
    cy.get(`[data-type=transaction][data-account-id=${accountId}][data-amount=${amount}][data-balance=${balance}]`).should('exist')

    // submit a new transaction to the same account and verify the balance
    const newAmount = 7
    const newBalance = 37
    cy.get('[data-type=account-id]').type(accountId)
    cy.get('[data-type=amount]').type(newAmount)
    cy.get('[data-type=transaction-submit]').click()
    cy.get(`[data-type=transaction][data-account-id=${accountId}][data-amount=${newAmount}][data-balance=${newBalance}]`).should('exist')

    // submit another transaction & verify the position on the list
    const anotherAccountId = uuid()
    const anotherAmount = 7
    const anotherBalance = 7
    cy.get('[data-type=account-id]').type(anotherAccountId)
    cy.get('[data-type=amount]').type(anotherAmount)
    cy.get('[data-type=transaction-submit]').click()
    cy.get(`[data-type=transaction][data-account-id=${anotherAccountId}][data-amount=${anotherAmount}][data-balance=${anotherBalance}]`).should('exist')

    // submit a transaction with a negative amount & verify the position on the list
    const negativeAmount = -5
    const negativeBalance = 2
    cy.get('[data-type=account-id]').type(anotherAccountId)
    cy.get('[data-type=amount]').type(negativeAmount)
    cy.get('[data-type=transaction-submit]').click()
    cy.get(`[data-type=transaction][data-account-id=${anotherAccountId}][data-amount=${negativeAmount}][data-balance=${negativeBalance}]`).should('exist')
  })
})
