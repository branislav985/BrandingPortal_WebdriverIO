# anotation for Zephyr Test Cycle
@BMP-R2
Feature: login to BP

  Background:
    Given I land od login page BP

  @BMP-T192
  Scenario: Login with empty email and password - error message
    When I click on Login button
    Then Under email and password input fields is <error_message> message

    Examples:
      | error_message           |
      | This value is required. |

  @BMP-T193
  Scenario: Login with invalid email - error message
    When I enter <invalid_email> email
    And I click on Login button
    Then Under email input field <error_message> is shown

    Examples:
      | invalid_email | error_message                       |
      | someWord      | This value should be a valid email. |

  @BMP-T195
  Scenario: Login with invalid password and corect email - error message
    When I enter email
    And I enter <invalid_password> password
    When I click on Login button
    Then Incorrect login <error_message> is shown

    Examples:
      | invalid_password | error_message   |
      | somePass         | Incorrect Login |

  @BMP-T194
  Scenario: Login with walid credentials
    When I enter email
    And I enter password
    And I click on Login button
    # Then I get the session cookie
    Then I am on Dashboard with title Dashboard and URL https://staging-branding.counterpath.com/

  @BMP-T196
  Scenario: Temporarly locked out account
    When I enter email for temporarly lock out
    And I enter <invalid_password> password
    When I click on Login button
    And I enter <invalid_password> password
    When I click on Login button
    And I enter <invalid_password> password
    When I click on Login button
    Then Temporarly locked out message <message1> and <message2> is shown
    When I land od login page BP
    When I enter email for temporarly lock out
    When I enter password for temporarly lock out
    When I click on Login button
    Then Incorrect login <message2> is shown
    Then Call API to unlock the user
    

    Examples:
      | invalid_password | message1        | message2                                 |
      | somePass         | Incorrect Login | Temporarily Locked Out. Try again later. |

  # # Scenario: Set cookie
  # #   When I set session cookie
