describe('Account Management Frontend - Level 1', () => {
  it('successfully loads, submits, and renders transactions', () => {
    cy.visit('/')

    cy.get('[data-cy=accountId]').type('70ad2f95-aa52-4e04-a085-c5cc2a4d4ee4')
    cy.get('[data-cy=amount]').type('30')
    cy.get('[data-cy=form]').submit()

    cy.get('dt').first().contains('Transferred $30 to 70ad2f95-aa52-4e04-a085-c5cc2a4d4ee4.')
    cy.get('dt').first().contains('Current 70ad2f95-aa52-4e04-a085-c5cc2a4d4ee4\'s balance is $30.')

    cy.get('[data-cy=accountId]').type('aaad2f95-aa52-4e04-a085-c5cc2a4d4ee4')
    cy.get('[data-cy=amount]').type('7')
    cy.get('[data-cy=form]').submit()

    cy.get('dt').first().contains('Transferred $7 to aaad2f95-aa52-4e04-a085-c5cc2a4d4ee4.')
    cy.get('dt').first().contains('Current aaad2f95-aa52-4e04-a085-c5cc2a4d4ee4\'s balance is $7.')

    cy.get('[data-cy=accountId]').type('aaad2f95-aa52-4e04-a085-c5cc2a4d4ee4')
    cy.get('[data-cy=amount]').type('-7')
    cy.get('[data-cy=form]').submit()
 
    cy.get('dt').first().contains('Withdrew $7 from aaad2f95-aa52-4e04-a085-c5cc2a4d4ee4.')
    cy.get('dt').first().contains('Current aaad2f95-aa52-4e04-a085-c5cc2a4d4ee4\'s balance is $0.')
  })
})