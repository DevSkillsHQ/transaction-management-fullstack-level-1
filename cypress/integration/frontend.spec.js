describe('Account Management Frontend - Level 1', () => {
  it('should load and submit transactions', () => {
    cy.visit('/')

    // submit a transaction & verify the position on the list
    cy.get('[data-type=account-id]').type('70ad2f95-aa52-4e04-a085-c5cc2a4d4ee4')
    cy.get('[data-type=amount]').type('30')
    cy.get('[data-type=transaction-form]').submit()
    cy.get('[data-type=transaction]').first().get('[data-account-id=70ad2f95-aa52-4e04-a085-c5cc2a4d4ee4][data-amount=30][data-balance=30]').should('exist')

    // submit another transaction & verify the position on the list
    cy.get('[data-type=account-id]').type('aaad2f95-aa52-4e04-a085-c5cc2a4d4ee4')
    cy.get('[data-type=amount]').type('7')
    cy.get('[data-type=transaction-form]').submit()
    cy.get('[data-type=transaction]').first().get('[data-account-id=aaad2f95-aa52-4e04-a085-c5cc2a4d4ee4][data-amount=7][data-balance=7]').should('exist')

    // submit a transaction with a negative amount & verify the position on the list
    cy.get('[data-type=account-id]').type('aaad2f95-aa52-4e04-a085-c5cc2a4d4ee4')
    cy.get('[data-type=amount]').type('-7')
    cy.get('[data-type=transaction-form]').submit()
    cy.get('[data-type=transaction]').first().get('[data-account-id=aaad2f95-aa52-4e04-a085-c5cc2a4d4ee4][data-amount=-7][data-balance=0]').should('exist')
  })

  it('should reject invalid input data', () => {
    cy.visit('/')

    // submit a regular transaction
    cy.get('[data-type=account-id]').type('6113255d-318f-4128-9e2a-a1c1b796a29e')
    cy.get('[data-type=amount]').type('9')
    cy.get('[data-type=transaction-form]').submit()
    cy.get('[data-type=transaction]').first().get('[data-account-id=6113255d-318f-4128-9e2a-a1c1b796a29e][data-amount=9][data-balance=9]').should('exist')

    // invalid account_id
    cy.get('[data-type=account-id]').type('123')
    cy.get('[data-type=amount]').type('12')
    cy.get('[data-type=transaction-form]').submit()
    // still the previous transaction at the top of the list
    cy.get('[data-type=transaction]').first().get('[data-account-id=6113255d-318f-4128-9e2a-a1c1b796a29e][data-amount=9][data-balance=9]').should('exist')

    cy.get('[data-type=account-id]').type('0708c2b1-e1c9-4c31-8647-c2f44b7664e7')
    // invalid amount
    cy.get('[data-type=amount]').type('abc')
    cy.get('[data-type=transaction-form]').submit()
    // still the previous transaction at the top of the list
    cy.get('[data-type=transaction]').first().get('[data-account-id=6113255d-318f-4128-9e2a-a1c1b796a29e][data-amount=9][data-balance=9]').should('exist')
    
  })
})