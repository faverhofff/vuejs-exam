// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide

module.exports = {
  'e2e tests': browser => {
    browser
      .init()
      .waitForElementVisible('#app')
      .assert.elementCount('input', 1)
      .end()
  },

  'example e2e test using a custom command': browser => {
    browser
      .openHomepage()
      .assert.elementPresent('input[placeholder="example: https://example.com"]')
      .end()
  }
}
