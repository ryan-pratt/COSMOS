describe('CmdTlmServer Interfaces', () => {
  it('disconnects & connects an interface', () => {
    cy.visit('/cmd-tlm-server')
    cy.hideNav()
    cy.get('[data-test=interfaces-table]')
      .contains('INST_INT')
      .parent()
      .children()
      .eq(2)
      .invoke('text')
      .should('eq', 'CONNECTED')
    // Disconnect
    cy.get('[data-test=interfaces-table]')
      .contains('INST_INT')
      .parent()
      .children()
      .eq(1)
      .click()
    cy.get('[data-test=interfaces-table]')
      .contains('INST_INT')
      .parent()
      .children()
      .eq(2)
      .invoke('text')
      .should('eq', 'DISCONNECTED')
    cy.get('[data-test=log-messages]').contains('INST_INT: Disconnect')
    // Connect
    cy.get('[data-test=interfaces-table]')
      .contains('INST_INT')
      .parent()
      .children()
      .eq(1)
      .click()
    cy.get('[data-test=interfaces-table]', { timeout: 10000 })
      .contains('INST_INT')
      .parent()
      .children()
      .eq(2)
      .invoke('text')
      .should('eq', 'CONNECTED')
    cy.get('[data-test=log-messages]').contains('INST_INT: Connection Success')
  })

  it('cancels an inteface from attempting', () => {
    cy.visit('/cmd-tlm-server')
    cy.hideNav()
    cy.get('[data-test=interfaces-table]')
      .contains('EXAMPLE_INT')
      .parent()
      .children()
      .eq(2)
      .invoke('text')
      .then(connection => {
        // Check for DISCONNECTED and if so click connect
        if (connection === 'DISCONNECTED') {
          cy.get('[data-test=interfaces-table]')
            .contains('EXAMPLE_INT')
            .parent()
            .children()
            .eq(1)
            .click()
        }
      })
    cy.get('[data-test=interfaces-table]')
      .contains('EXAMPLE_INT')
      .parent()
      .children()
      .eq(2)
      .invoke('text')
      .should('eq', 'ATTEMPTING')
    // Disconnect
    cy.get('[data-test=interfaces-table]')
      .contains('EXAMPLE_INT')
      .parent()
      .children()
      .eq(1)
      .click()
    cy.get('[data-test=interfaces-table]')
      .contains('EXAMPLE_INT')
      .parent()
      .children()
      .eq(2)
      .invoke('text')
      .should('eq', 'DISCONNECTED')
    cy.get('[data-test=log-messages]').contains('EXAMPLE_INT: Disconnect')
    // Connect
    cy.get('[data-test=interfaces-table]')
      .contains('EXAMPLE_INT')
      .parent()
      .children()
      .eq(1)
      .click()
    cy.get('[data-test=interfaces-table]', { timeout: 10000 })
      .contains('EXAMPLE_INT')
      .parent()
      .children()
      .eq(2)
      .invoke('text')
      .should('eq', 'ATTEMPTING')
    cy.get('[data-test=log-messages]').contains('EXAMPLE_INT: Connecting')
  })
})
