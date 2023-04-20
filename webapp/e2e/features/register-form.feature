Feature: Registering a new user

Scenario: The user is not logged in the site
  Given A not logged user
  When I fill the data in the form and press submit
  Then The main page is shown in the screen

Scenario: The user is not logged in the site and introduces wrong data
  Given A not logged user
  When I fill wrong data in the form and press submit
  Then An error message appears on screen
