Feature: Heatmap

  This feature is to display a heatmap to the user with their requested information.

  Scenario: Heatmap displays when a protein is selected
    When A protein is selected
    Then the heatmap for that protein is displayed