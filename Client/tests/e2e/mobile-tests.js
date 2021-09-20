import { Selector } from 'testcafe';

fixture `Exam test`
    .page `http://localhost:8080`;

const findElementByTrimmedText = Selector((baseCSSSelector, text) => {
    const el          = document.querySelector(baseCSSSelector);
    const trimmedText = el && el.innerText && el.innerText.trim();

    return trimmedText === text ? el : null;
});

const getElement = Selector((baseCSSSelector, text) => {
    return document.querySelector(baseCSSSelector);
});

test('open route /', async t => {
    const targetElement = findElementByTrimmedText('input.form-control', '');
    await t.expect(targetElement.exists).ok();
});


test('time menu analysis', async t => {
    const buttonNav = getElement('button.navbar-toggler');
    await t.expect(buttonNav).ok()

    await t
    .click('button.navbar-toggler');

    const tzone = findElementByTrimmedText('div.chart-content > div > h2', 'Timing Analysis');
    await t.expect(tzone).ok()
});