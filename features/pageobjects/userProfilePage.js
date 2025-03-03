import { browser, expect } from '@wdio/globals';
import UserProfileSeletors from '../elements/userProfileEl';
import Global from './globalPage';

const userProfileS = new UserProfileSeletors()
const global = new Global()
var firstName
var lastName


export default class userProfilePage {

    async confirmFirstNameValue() {
        const fulName = (await userProfileS.USERDATA_FIRST_LASTNAME.getText())
        firstName = (await fulName.split(" "))[0]
        expect(await userProfileS.FIRST_NAME_INPUT_VALUE.getAttribute('value')).toEqual(firstName)
    }

    async confirmLastNameValue() {
        const fulName = (await userProfileS.USERDATA_FIRST_LASTNAME.getText())
        lastName = (await fulName.split(" "))[1]
        expect(await userProfileS.LAST_NAME_INPUT_VALUE.getAttribute('value')).toEqual(lastName)
    }

    async confirmEmailValue() {
        const userEmail = process.env.user
        expect(await userProfileS.EMAIL_INPUT_VALUE.getText()).toEqual(userEmail)
    }

    async confirmTimezoneSelect() {
        expect(await userProfileS.TIMEZONE_SELECT.getComputedRole()).toEqual('combobox')
    }

    async confirmDailylightCheckBox() {
        expect(await userProfileS.DAILYLIGHT_INPUT.getAttribute('type')).toEqual('checkbox')
    }

    async changeTimeZoneValue() {
        const index = Math.floor(Math.random() * (await $$('#timezone > option').getElements()).length) + 0
        await userProfileS.TIMEZONE_SELECT.selectByIndex(index)
    }

    async selectOneByOneTimezoneAndSave() {
        let iMax = (await $$('#timezone > option').getElements()).length
        let allZones = [];
        (await $$('#timezone > option').getElements()).forEach(element => {
            allZones.push(element.getText())
        });
        for (let i = 0; i < iMax; i++){
            await userProfileS.TIMEZONE_SELECT.selectByIndex(i)
            await global.clickOnButton(userProfileS.BUTTON_SAVE)
            let textMessage = await userProfileS.TOAST_MESSAGE.getText()

            try {
                expect(textMessage).toEqual("User profile updated.")
            } catch (error) {
                console.log(i+1 + ' ' + 'Failed: ' + await allZones[i])
                expect(await textMessage).toEqual("User profile updated.")
            }
        }
    }

    async confirmFirstNameAfterChange(firstName) {
        var str = await userProfileS.FIRST_NAME_INPUT_VALUE.getAttribute('value')
        expect(str).toEqual(firstName)
    }

    async confirmLastNameAfterChange(lastName) {
        var str = await userProfileS.LAST_NAME_INPUT_VALUE.getAttribute('value')
        expect(str).toEqual(lastName)
    }

    async revertBackProfileData() {
        await global.populateInputField(userProfileS.FIRST_NAME_INPUT_VALUE, firstName)
        await global.populateInputField(userProfileS.LAST_NAME_INPUT_VALUE, lastName)
        await global.clickOnButton(await userProfileS.BUTTON_SAVE)
    }
}