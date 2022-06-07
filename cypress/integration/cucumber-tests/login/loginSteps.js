import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import LoginPage from './loginPage'
import AccountSummaryPage from './AccountSummaryPage'

const loginPage = new LoginPage()
const accountSummaryPage = new AccountSummaryPage()

Given(
	'I open login page as {string} and title {string}',
	(httpzerowebappsecuritycomloginhtml, zerologin) => {
		loginPage.visitHomePage(httpzerowebappsecuritycomloginhtml, {
			timeout: 10000,
		})
		//cy.visit(httpzerowebappsecuritycomloginhtml)
		cy.url().should('eq', httpzerowebappsecuritycomloginhtml)
		cy.title().should('include', zerologin)
        loginPage.logoImage().should("be.visible").and("be.enabled").click()
		cy.get('h3').contains('Log in to ZeroBank').should('be.visible')
	}
)

When('I submit login', function () {
	loginPage.userNameBox().type(userName)
	loginPage.passwordBox().type(password)
	loginPage.submitButton().click()
})

When('I fill username with {string}', function (userName) {
	loginPage
		.userNameBox()
		.should('be.visible')
		.and('exist')
		.clear()
		.type(userName)
})

When('I fill password with {string}', function (password) {
	loginPage
		.passwordBox()
		.should('be.visible')
		.and('exist')
		.clear()
		.type(password)
})

When('I click on remember me radio and login button', function () {
	loginPage.rememberMeRadioButton().check().should('be.checked')
	loginPage.submitButton().should('be.visible').click()
})

Then('I should see homepage as {string}', function (
	httpzerowebappsecuritycombankaccountsummaryhtml
) {
	cy.url().should('eq', httpzerowebappsecuritycombankaccountsummaryhtml)
	accountSummaryPage
		.accountSummaryTab()
		.contains('Account Summary')
		.should('be.visible')
	accountSummaryPage
		.savingsBalTxt()
		.contains('$1548')
		.should('be.visible')
		.then(function (savings) {
			const savingsBalance = savings.text()
			cy.log('Savings bal: ' + savingsBalance)
		})

	loginPage
		.userProfileImage()
		.contains('username')
		.should('be.visible')
		.then(function (user) {
			const userProfile = user.text()
			cy.log('Profile name: ' + userProfile)
		})

        When('I click on logout in userProfile dropdown button', function () {
            accountSummaryPage.userProfileDropdown().should('be.visible').click()
            accountSummaryPage.logoutButton().should('be.visible').click()
        })
})
