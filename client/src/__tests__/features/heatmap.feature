Feature: Heatmap

  This feature is to display a heatmap to the user with their requested information.

  Scenario: Heatmap displays when a protein is selected
    Given I am on the home page
    When protein 1csp is selected
    Then the heatmap for that protein is displayed

  Scenario: doesn't display if one is not selected