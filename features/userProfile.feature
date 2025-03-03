# anotation for Zephyr Test Cycle
@BMP-R2
Feature: User Profile

  Background:
    Given User is on Profile page with title User profile

  @BMP-T1
  Scenario: Back button redirection
    When Click on back button
    Then User is redirected back to Dashboard page with title Dashboard

  @BMP-T197
  Scenario: Timezone selection
    When Select ony by one, click save and verify message

  @BMP-T2
  Scenario: Verify UI elements on Profile page
    Then Verify the title User profile
    Then verify chapters Basic information amd Timezone information
    Then verify all labels
    Then verify first name, last name and email autofil
    Then Verify Timezone drop-down
    Then verify dailylight saving time checkbox

  @BMP-T3
  Scenario: Change profile data
    When Change first name changedName
    Then Change last name changedLastName
    When change Timezone
    Then click save
    When Success toast message is shown User profile updated.
    When Refresh the page
    Then Verify data is saved
    Then Revert back name and lastname to prepare for next execution
