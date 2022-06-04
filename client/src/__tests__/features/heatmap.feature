Feature: Heatmap

  This feature is to display a heatmap to the user with their requested information.

  Scenario: Heatmap displays when a protein is selected
    Given I am on the home page
    When protein 1csp is selected
    Then the heatmap for that protein is displayed

  Scenario: Heatmap doesn't display if there is no data for it in the database
    Given I am on the home page and protein 3kis does not have data
    When protein 3kis is selected
    Then no heatmap will be displayed on the new page