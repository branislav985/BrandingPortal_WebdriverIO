export default class LoginPageSelectors{
    TITLE = $('h1')
    LOGIN_TITLE = $('h2')
    EMAIL_INPUT = $('#identity')
    PASSWORD_INPUT = $('#password')
    REMEMBER_CHECKBOX = $('remember')
    FORGOT_PASSWORD = $('a[href$="ord"]')
    LOGIN_BUTTON = $('*[type="submit"]')
    ERROR_LOGIN_MESSAGE = $('#parsley-id-3')
    ERROR_EMAIL_LOGIN_MESSAGE = $('#parsley-id-5')
    ERROR_PASSWORD_LOGIN_mESSAGE = $('#parsley-id-7')
    TEMPORARLY_LOCKED_OUT_LOGIN_MESSAGE_1 = $('ul[id="parsley-id-3"] > li:first-child')
    TEMPORARLY_LOCKED_OUT_LOGIN_MESSAGE_2 = $('ul[id="parsley-id-3"] > li:first-child + li')
} 