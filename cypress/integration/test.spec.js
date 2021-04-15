// DO NOT CHANGE THIS FILE!

const apiUrl = `${Cypress.env("apiUrl")}`

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

describe('Transaction Management Fullstack - Level 1', () => {

  it('should create a transaction, read it, and fetch the updated account balance', () => {
    const accountId = uuid()
    let transactionId
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/transaction`,
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
        url: `${apiUrl}/transaction/${transactionId}`,
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

  it('should create transactions with negative and zero amounts', () => {
    const accountId = uuid()
    let transactionId

    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/transaction`,
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
      url: `${apiUrl}/transaction`,
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
    }).request({
      failOnStatusCode: false,
      method: 'POST',
      url: `${apiUrl}/transaction`,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        account_id: accountId,
        amount: 0
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
      expect(response.body.balance).to.eq(1)
    })
  })
})

describe('Transaction Management Frontend - Level 1', () => {
  it('The app can handle the happy case scenarios', () => {
    cy.visit('/')

    // submit a transaction & verify the position on the list
    const accountId = uuid()
    const amount = 30
    const balance = 30
    cy.get('[data-type=account-id]').type(accountId)
    cy.get('[data-type=amount]').type(amount)
    cy.get('[data-type=transaction-form]').submit()
    cy.get(`[data-type=transaction][data-account-id=${accountId}][data-amount=${amount}][data-balance=${balance}]`).should('exist')

    // submit another transaction & verify the position on the list
    const anotherAccountId = uuid()
    const anotherAmount = 7
    const anotherBalance = 7
    cy.get('[data-type=account-id]').type(anotherAccountId)
    cy.get('[data-type=amount]').type(anotherAmount)
    cy.get('[data-type=transaction-form]').submit()
    cy.get(`[data-type=transaction][data-account-id=${anotherAccountId}][data-amount=${anotherAmount}][data-balance=${anotherBalance}]`).should('exist')

    // submit a transaction with a negative amount & verify the position on the list
    const negativeAmount = -7
    const negativeBalance = 0
    cy.get('[data-type=account-id]').type(anotherAccountId)
    cy.get('[data-type=amount]').type(negativeAmount)
    cy.get('[data-type=transaction-form]').submit()
    cy.get(`[data-type=transaction][data-account-id=${anotherAccountId}][data-amount=${negativeAmount}][data-balance=${negativeBalance}]`).should('exist')
  })
})
