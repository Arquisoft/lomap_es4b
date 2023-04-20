Feature: Add a new point

Scenario: The user wants to add a point
  Given A new point info
  When I click on the map and fill the add point form
  Then The new point appears on the point list