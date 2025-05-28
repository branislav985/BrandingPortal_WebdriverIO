import { Given, When, Then, BeforeAll, Before} from '@wdio/cucumber-framework';
import LoginPageSelectors from '../elements/loginEl.js';
import UserProfileSeletors from "../elements/userProfileEl";
import Global from "../pageobjects/globalPage";
import UserProfilePage from '../pageobjects/userProfilePage.js';
import * as dotenv from 'dotenv';

dotenv.config();
const userProfileP = new UserProfilePage()
const userProfileS = new UserProfileSeletors()
const loginS = new LoginPageSelectors()
const global = new Global();
var changedName
var changedLastName

Given(/^User is on Profile page with title (.*)$/, async (titleText) => {
    await global.open('auth/login')
    await global.populateInputField(loginS.EMAIL_INPUT, process.env.user)
    await global.populateInputField(loginS.PASSWORD_INPUT, process.env.pass)
    await global.clickOnButton(loginS.LOGIN_BUTTON)
    await global.clickOnButton(userProfileS.USER_PROFILE)
    await global.elementHasText(userProfileS.USER_PROFILE_TITLE, titleText)
})

When(/^Click on back button$/, async() => {
    await global.clickOnButton(userProfileS.BACK_BUTTON)
})

Then(/^User is redirected back to Dashboard page with title (.*)$/, async(titleText) => {
    await global.elementHasText(loginS.TITLE, titleText)
})

Then(/^Verify the title (.*)$/, async(title) => {
    await global.elementHasText(userProfileS.USER_PROFILE_TITLE, title)
})

Then(/^verify chapters (.*) amd (.*)$/, async(chapter1, chapter2) => {
await global.elementHasText(userProfileS.BASIC_INFORMATION_TITLE, chapter1)
await global.elementHasText(userProfileS.TIMEZONE_INFORMATION_TITLE, chapter2)
})

Then(/^verify all labels$/, async() => {
await global.confirmElementExists(userProfileS.FIRST_NAME_LABEL)
await global.confirmElementExists(userProfileS.LAST_NAME_LABEL)
await global.confirmElementExists(userProfileS.EMAIL_LABEL)
await global.confirmElementExists(userProfileS.TIMEZONE_LABEL)
await global.confirmElementExists(userProfileS.DAILYLIGHT_LABEL)
})

Then(/^verify first name, last name and email autofil$/, async() => {
    await userProfileP.confirmFirstNameValue()
    await userProfileP.confirmLastNameValue()
    await userProfileP.confirmEmailValue()
})

Then(/^Verify Timezone drop-down$/, async() => {
await userProfileP.confirmTimezoneSelect()
})

Then(/^verify dailylight saving time checkbox$/, async() => {
    await userProfileP.confirmDailylightCheckBox()
})

When(/^Change first name (.*)$/, async(name) => {
    changedName = name
    await global.populateInputField(userProfileS.FIRST_NAME_INPUT_VALUE, name)
})

Then(/^Change last name (.*)$/, async(lastName) => {
    changedLastName = lastName
    await global.populateInputField(userProfileS.LAST_NAME_INPUT_VALUE, lastName)
})

When(/^change Timezone$/, async() => {
    await userProfileP.changeTimeZoneValue()
})

Then(/^click save$/, async() => {
    await global.clickOnButton(await userProfileS.BUTTON_SAVE)
})

When(/^Success toast message is shown (.*)$/, async(message) => {
    await global.elementGetTextAndCompare((await userProfileS.TOAST_MESSAGE), message)
})

When(/^Refresh the page$/, async() => {
    await browser.refresh()
    await browser.pause(500)
})

Then(/^Verify data is saved$/, async() => {
await userProfileP.confirmFirstNameAfterChange(changedName)
await userProfileP.confirmLastNameAfterChange(changedLastName)
// await userProfileP.confirmTimeZoneAfterChange()
})

Then(/^Revert back name and lastname to prepare for next execution$/, async() => {
    await userProfileP.revertBackProfileData()
})

When(/^Select ony by one, click save and verify message$/, async() => {
    await userProfileP.selectOneByOneTimezoneAndSave()
})

Given(/^User is on Change password page with title (.*)$/, async (titleText) => {
    await global.open('auth/login')
    await global.populateInputField(loginS.EMAIL_INPUT, process.env.user)
    await global.populateInputField(loginS.PASSWORD_INPUT, process.env.pass)
    await global.clickOnButton(loginS.LOGIN_BUTTON)
    await global.clickOnButton(userProfileS.USER_PROFILE)
    await global.clickOnButton(userProfileS.CHANGE_PASSWORD_BUTTON)
    await global.elementHasText(userProfileS.USER_PROFILE_TITLE, titleText)
})

When(/^click on Cancel button$/, async() => {
    await global.clickOnButton(userProfileS.CHANGE_PASSWORD_CANCEL_BUTTON)
})

Then(/^user is came back to User profile page with title (.*)$/, async(titleText) => {
    await global.elementHasText(userProfileS.USER_PROFILE_TITLE, titleText)
})

When(/^confirm "Old password" input is empty$/, async() => {
    await global.elementHasText(userProfileS.OLD_PASSWORD_INPUT, '')
})

When(/^Click "Save changes"$/, async() => {
    await global.clickOnButton(await userProfileS.BUTTON_SAVE)
    await browser.pause(500)
})

Then(/^Alert message is shown below input field - (.*)$/, async(text) => {
    await global.elementHasText(await userProfileS.OLD_PASSWORD_ERROR_MESSAGE_TEXT, text)
})

When(/^Enter wrong password - (.*)$/, async(input) => {
await global.populateInputField(await userProfileS.OLD_PASSWORD_INPUT, input)
})

When(/^Enter correct old password$/, async() => {
    await global.populateInputField(userProfileS.OLD_PASSWORD_INPUT, process.env.pass)
    await browser.pause(500)
})

Then(/^There is no alert message is shown below input field$/, async() => {
    await global.confirmElementDoesNotExist(userProfileS.OLD_PASSWORD_ERROR_MESSAGE_TEXT)
})

When(/^confirm "New password" input is empty$/, async() => {
    await global.elementHasText(userProfileS.NEW_PASSWORD_INPUT, '')
})

Then(/^Alert message is shown below New Password input field - (.*)$/, async(text) => {
    await global.elementHasText(await userProfileS.NEW_PASSWORD_ERROR_MESSAGE_TEXT, text)
})

When(/^Enter less than 8 characters - (.*)$/, async(pass) => {
    await global.populateInputField(userProfileS.NEW_PASSWORD_INPUT, pass)
    await browser.pause(500)
})

When(/^Enter 8 characters for new password - (.*)$/, async(pass) => {
    await global.populateInputField(userProfileS.NEW_PASSWORD_INPUT, pass)
    await browser.pause(500)
})

When(/^Enter more than 8 characters - (.*)$/, async(pass) => {
    await global.populateInputField(userProfileS.NEW_PASSWORD_INPUT, pass)
    await browser.pause(500)
})

Then(/^There is no alert message is shown below New Password input field$/, async() => {
    await global.confirmElementDoesNotExist(userProfileS.NEW_PASSWORD_ERROR_MESSAGE_TEXT)
})

Then(/^Alert message is shown below Confirm New Password input field - (.*)$/, async(text) => {
    await global.elementHasText(await userProfileS.CONFIRM_NEW_PASSWORD_ERROR_MESSAGE_TEXT, text)
})

When(/^Enter 8 characters at confirm new password - (.*)$/, async(pass) => {
    await global.populateInputField(userProfileS.CONFIRM_NEW_PASSWORD_INPUT, pass)
    await browser.pause(500)
})

When(/^Enter more than 8 characters at confirm new password - (.*)$/, async(pass) => {
    await global.populateInputField(userProfileS.CONFIRM_NEW_PASSWORD_INPUT, pass)
    await browser.pause(500)
})

When(/^Enter 8 different characters at confirm new password - (.*)$/, async(pass) => {
    await global.populateInputField(userProfileS.CONFIRM_NEW_PASSWORD_INPUT, pass)
    await browser.pause(500)
})

When(/^Enter 8 characters at confirm new password same as new password - (.*)$/, async(pass) => {
    await global.populateInputField(userProfileS.CONFIRM_NEW_PASSWORD_INPUT, pass)
    await browser.pause(500)
})

Then(/^There is no alert message is shown below Confirm New Password input field$/, async() => {
    await global.confirmElementDoesNotExist(userProfileS.CONFIRM_NEW_PASSWORD_ERROR_MESSAGE_TEXT)
})

When(/^Enter less than 8 characters for New Password and Confirm new password - (.*)$/, async(pass) => {
    await global.populateInputField(userProfileS.NEW_PASSWORD_INPUT, pass)
    await global.populateInputField(userProfileS.CONFIRM_NEW_PASSWORD_INPUT, pass)
})

Then(/^Verify toast message - (.*)$/, async(text) => {

})
