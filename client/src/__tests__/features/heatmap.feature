Feature: Heatmap

  This feature is to display a heatmap to the user with their requested information.

  Scenario: Heatmap displays for single protein
    Given I am on the home page
    When single protein 1l2y is selected
    When insert position and residue are selected
    When generate button is pressed
    Then the heatmap for that protein is displayed