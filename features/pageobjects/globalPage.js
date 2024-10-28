
import { browser } from '@wdio/globals';
import axios from 'axios'
import { ClientDigestAuth } from '@mreal/digest-auth';

var token = '';

export default class Global {
    async open(path) {

        await browser.maximizeWindow()
        await browser.url(`/${path}`),
            await browser.setCookies({ name: '__hs_notify_banner_dismiss', value: 'true' })
    }

    async populateInputField(selector, data) {
        await selector.click()
        await selector.setValue(data);
    }

    async clickOnButton(selector) {
        await selector.click();
    }
    async expectedTabsNumber(num) {
        await expect(await this.getTabsCount()).toEqual(num)
    }

    async confirmElementExists(selector) {
        await expect(selector).toBeExisting()
    }

    async confirmElementDoesNotExist(selector) {
        await expect(selector).not.toBeExisting()
    }

    async setCookieToPreventPolicyMessage() {
        await browser.setCookies({ name: '__hs_notify_banner_dismiss', value: 'true' })
        await browser.refresh();
    }

    async setCookieToPreventPolicyMessage_false() {
        await browser.deleteCookie('__hs_notify_banner_dismiss')
        await browser.refresh();
        // await browser.debug()
    }

    async elementGetTextAndCompare(element, text) {
        await expect(element).toHaveText(text)
    }

    async switchToWindow(num) {
        browser.switchToWindow((await browser.getWindowHandles())[num - 1])
    }

    async clearInput(element) {
        await element.clearValue();
    }

    async getTabsCount() {
        console.log("Tubs count is: " + (await browser.getWindowHandles()).length)
        return (await browser.getWindowHandles()).length
    }

    async currentUrlContains(url) {
        await expect(browser).toHaveUrl(expect.stringContaining(url))
    }

    async closeCurentTub() {
        await browser.closeWindow()
        await browser.switchToWindow((await browser.getWindowHandles())[0])
    }

    async getToken() {
        const requests = await browser.getRequest(5);
        token = requests.headers.authorization
        console.log("Token is: +++++++++++++++" + token)
    }

    async logOut() {
        axios({
            method: 'GET',
            url: 'https://solo.qa.softphone.com/api/v2/session/logout',
            headers: {
                Authorization: token
            }
        })
    }


    async getSession() {
        let sessionCookie = await browser.getCookies({ name: 'session' })
        console.log("session: " + sessionCookie[0].value)
        return sessionCookie
    }


    async callResetAPI() {
        const session = await this.getSession()
        await axios.post('https://staging-branding.counterpath.com/users/xhrResetLogins/942', {
            withCredentials: true
        }, {
            headers: {
                Cookie: `session=${session[0].value}`
            }
        }).then(response => {
            console.log(response.data)
        })
    }


}