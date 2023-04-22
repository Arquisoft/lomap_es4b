Feature: Add a new point

Scenario: The user wants to add a point
  Given A new point info
  When I click on the map and fill the add point form
  Then The new point appears on the point list

Scenario: The user wants to delete a point
  Given A point
  When I click on the map and open the popup menu
  Then The point is removed from the points list