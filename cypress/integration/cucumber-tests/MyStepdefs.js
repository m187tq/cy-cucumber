import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import LoginPage from './loginPage'


        Given('I open login page', () => {
        // cy.visit('http://zero.webappsecurity.com/login.html')
        LoginPage.visit()
        })

        When('I submit login', () => {
        //   cy.get('#user_login').type('username')
        //   cy.get('#user_password').type('password')
        //   cy.get('input[name="submit"]').type('username')
        LoginPage.fillUsername('username')
        LoginPage.fillPassword('password')
        LoginPage.submit()
        })

        When('I fill username with {string}', username => {
        LoginPage.fillUsername(username)
        })

        When('I fill password with  {string}', password =>{
        LoginPage.fillPassword(password)
        })

        When('I click on submit login', () => {
        LoginPage.submit()
        })

        Then('I should see homepage', () => {
        cy.get('#account_summary_tab').should('be.visible')
        })
