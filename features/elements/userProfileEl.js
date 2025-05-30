export default class UserProfileSeletors {
    USER_PROFILE = $('.user-name')
    USER_PROFILE_TITLE = $('h1')
    BACK_BUTTON = $('a[title="Back to Homepage"]')
    BASIC_INFORMATION_TITLE = $('.custom-grid > div:nth-child(1) > fieldset > legend')
    TIMEZONE_INFORMATION_TITLE = $('.custom-grid > div:nth-child(2) > fieldset > legend')
    TIMEZONE_SELECT = $('#timezone')
    TIME_ZONE_OPTIONS = $('#timezone > option')
    FIRST_NAME_LABEL = $('label[for="first-name"]')
    LAST_NAME_LABEL = $('.custom-grid > div:nth-child(1) > fieldset > div:nth-child(3) > label')
    EMAIL_LABEL = $('.custom-grid > div:nth-child(1) > fieldset > div:nth-child(4) > label')
    TIMEZONE_LABEL = $('label[for="timezone"]')
    DAILYLIGHT_LABEL = $('label[for="daylight_saving"]')
    DAILYLIGHT_INPUT = $('#daylight_saving')
    BACK_BUTTON = $('.action-toolbar > a:nth-child(1)')
    CANGE_PASSWORD_BUTTON = $('.action-toolbar > a:nth-child(2)')
    USERDATA_FIRST_LASTNAME = $('.user > a:nth-child(2)')
    FIRST_NAME_INPUT_VALUE = $('#first-name')
    LAST_NAME_INPUT_VALUE = $('#last-name')
    EMAIL_INPUT_VALUE = $('.custom-grid > div:nth-child(1) > fieldset > div:nth-child(4) > output')
    BUTTON_SAVE = $('button[type = "submit"]')
    TOAST_MESSAGE = $('#noty_layout__bottomCenter > div > div > p')
    TOAST_MESSAGE_CLOSE_BUTTON = $('.noty_close_button')
    CHANGE_PASSWORD_BUTTON = $('.action-toolbar > a:nth-child(2)')
    CHANGE_PASSWORD_CANCEL_BUTTON = $('#cancel')
    OLD_PASSWORD_INPUT = $('#old_password')
    OLD_PASSWORD_ERROR_MESSAGE = $('#parsley-id-5')
    OLD_PASSWORD_ERROR_MESSAGE_TEXT = $('#parsley-id-5 > li')
    NEW_PASSWORD_INPUT = $('#new_password')
    NEW_PASSWORD_ERROR_MESSAGE = $('#parsley-id-7')
    NEW_PASSWORD_ERROR_MESSAGE_TEXT = $('#parsley-id-7 > li')
    CONFIRM_NEW_PASSWORD_INPUT = $('#new_password_confirm')
    CONFIRM_NEW_PASSWORD_ERROR_MESSAGE = $('#parsley-id-9')
    CONFIRM_NEW_PASSWORD_ERROR_MESSAGE_TEXT = $('#parsley-id-9 > li')
    


}