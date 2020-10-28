const apiUrl = `${Cypress.env("apiUrl")}`;

describe('Account Management Backend - Level 1', () => {
  
  it('updates account balance', async () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/amount`,
      headers: {
        "Content-Type": "application/json",
        "Transaction-Id": "7943f961-a733-43cf-ba3d-905a5856f6da"
      },
      body: {
        account_id: "a40bcc03-6f39-418c-ad0b-97e14f522ec1",
        amount: 7
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    })
  })

  it('returns current account balance', () =>{
    cy.request({
      method: 'GET',
      url: `${apiUrl}/balance/a40bcc03-6f39-418c-ad0b-97e14f522ec1`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.balance).to.eq(7);
    })
  })

  it('returns current account balance again', () =>{
    cy.request({
      method: 'GET',
      url: `${apiUrl}/balance/a40bcc03-6f39-418c-ad0b-97e14f522ec1`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.balance).to.eq(7);
    })
  })

  it('adds more amount to account', async () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/amount`,
      headers: {
        "Content-Type": "application/json",
        "Transaction-Id": "3bc387f1-f46e-45b1-9ab7-4f6840181f19"
      },
      body: {
        account_id: "a40bcc03-6f39-418c-ad0b-97e14f522ec1",
        amount: 13
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    })
  })
  

  it('returns updated account balance', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/balance/a40bcc03-6f39-418c-ad0b-97e14f522ec1`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.balance).to.eq(20);
    })
  })

  it('deducts some amount from account', async () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/amount`,
      headers: {
        "Content-Type": "application/json",
        "Transaction-Id": "1f80bf52-5f0b-41d7-95f9-6e61a1734298"
      },
      body: {
        account_id: "a40bcc03-6f39-418c-ad0b-97e14f522ec1",
        amount: -10
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    })
  })

  it('returns deducted account balance', () =>{
    cy.request({
      method: 'GET',
      url: `${apiUrl}/balance/a40bcc03-6f39-418c-ad0b-97e14f522ec1`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.balance).to.eq(10);
    })
  })
})