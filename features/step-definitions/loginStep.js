import { Given, When, Then, BeforeAll, Before, After } from '@wdio/cucumber-framework';
import LoginPageSelectors from '../elements/loginEl.js';
import Global from '../pageobjects/globalPage.js'
import * as dotenv from 'dotenv';
import axios from 'axios'




dotenv.config();
const loginS = new LoginPageSelectors()
const global = new Global();

Given(/^I land od login page BP$/, async () => {
    await global.open('auth/login')
    await expect(loginS.LOGIN_TITLE).toBeExisting()
});

When(/^I enter email$/, async () => {
    await global.populateInputField(loginS.EMAIL_INPUT, process.env.user)
})

When(/^I enter email for temporarly lock out$/, async() => {
    await global.populateInputField(loginS.EMAIL_INPUT, process.env.user_temp)
})

When(/^I enter password for temporarly lock out$/, async() => {
    await global.populateInputField(loginS.PASSWORD_INPUT, process.env.pass_temp)
})

When(/^I enter password$/, async () => {
    await global.populateInputField(loginS.PASSWORD_INPUT, process.env.pass)
})

When(/^I click on Login button$/, async () => {
    await global.clickOnButton(loginS.LOGIN_BUTTON)
    // await browser.pause(200)
})

Then(/^I am on Dashboard and verify title and URL$/, async () => {
    await expect(browser).toHaveUrl('https://staging-branding.counterpath.com/')
    await expect(loginS.TITLE).toHaveText('Dashboard')
})

Then(/^I get the session cookie$/, async() => {
    global.getSession()
})

// When(/^I set session cookie$/, async () => {
//     await browser.setCookies({ name: 'session', value: 'r3fkba5g60ljhltgg30ah95keqieovim', path: '/', domain: 'staging-branding.counterpath.com' })
//     await browser.navigateTo('https://staging-branding.counterpath.com/home/~')
//     await browser.pause(3000)
// })

When(/^I enter (.*) email$/, async (email) => {
    await global.populateInputField(loginS.EMAIL_INPUT, email)
})

When(/^I enter (.*) password$/, async (pass) => {
    await global.populateInputField(loginS.PASSWORD_INPUT, pass)
})

Then(/^Under email input field (.*) is shown$/, async (messageText) => {
    await expect(loginS.ERROR_EMAIL_LOGIN_MESSAGE).toHaveText(messageText)
    
})

Then(/^Under password input field (.*) is shown$/, async (messageText) => {
    await expect(loginS.ERROR_PASSWORD_LOGIN_mESSAGE).toHaveText(messageText)
})

Then(/^Incorrect login (.*) is shown$/, async (messageText) => {
    await expect(loginS.ERROR_LOGIN_MESSAGE).toHaveText(messageText)
})

Then(/^Temporarly locked out message (.*) and (.*) is shown$/, async (message1, message2) => {
    console.log(loginS.ERROR_LOGIN_MESSAGE.getText())
    await expect(loginS.TEMPORARLY_LOCKED_OUT_LOGIN_MESSAGE_1).toHaveText(message1)
    await expect(loginS.TEMPORARLY_LOCKED_OUT_LOGIN_MESSAGE_2).toHaveText(message2)
})

Then(/^Call API to unlock the user$/, async() => {
    await global.populateInputField(loginS.EMAIL_INPUT, process.env.user)
    await global.populateInputField(loginS.PASSWORD_INPUT, process.env.pass)
    
    await global.clickOnButton(loginS.LOGIN_BUTTON)
    // await browser.debug()
    await browser.pause(1000)
    await global.callResetAPI()
})

Then(/^Do the debug$/, async() => {
    await browser.debug()
})

Then(/^Do the pause$/, async() => {
    await browser.pause(10000)
})




