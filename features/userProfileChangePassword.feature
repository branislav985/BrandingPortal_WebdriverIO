@BMP-R3
Feature: User Profile

  Background:
    Given User is on Change password page with title Change Password

  @BMP-T7
  Scenario: Cancel button functionality
  When click on Cancel button
  Then user is came back to User profile page with title User profile

  @BMP-T8
  Scenario: Old password verification
  When confirm "Old password" input is empty
  When Click "Save changes"
  Then Alert message is shown below input field - This value is required.
  When Enter wrong password - wrongPass
  When Click "Save changes"
  Then Alert message is shown below input field - Old password mismatch.
  When Enter correct old password
  Then There is no alert message is shown below input field

  @BMP-T9
  Scenario: New password verification
  When confirm "New password" input is empty
  When Click "Save changes"
  Then Alert message is shown below New Password input field - This value is required.
  When Enter less than 8 characters - 123
  When Click "Save changes"
  Then Alert message is shown below New Password input field - This value is too short. It should have 8 characters or more.
  When Enter 8 characters for new password - 12345678
  Then There is no alert message is shown below New Password input field 
  When Enter more than 8 characters - 123456789
  Then There is no alert message is shown below New Password input field

  @BMP-T10
  Scenario: Confirm New password verification
  When confirm "New password" input is empty
  When Click "Save changes"
  Then Alert message is shown below Confirm New Password input field - This value is required.
  When Enter less than 8 characters for New Password and Confirm new password - 1234
  When Click "Save changes"
  Then Alert message is shown below Confirm New Password input field - This value is too short. It should have 8 characters or more.
  When Enter 8 characters for new password - 12345678
  When Enter 8 different characters at confirm new password - 12345677
  When Click "Save changes"
  Then Alert message is shown below Confirm New Password input field - This value should be the same.
  When Enter 8 characters at confirm new password same as new password - 12345678
  Then There is no alert message is shown below Confirm New Password input field

  @BMP-T11
  Scenario: Old password verification
  When Enter correct old password
  When Enter 8 characters for new password - Samobane985%
  When Enter 8 characters at confirm new password same as new password - Samobane985%
  When Click "Save changes"
  Then Success toast message is shown Password Successfully Changed
