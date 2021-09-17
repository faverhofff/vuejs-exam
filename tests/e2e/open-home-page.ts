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

test('validation -> wrong url ', async t => {
    const alertMessage = findElementByTrimmedText('input.form-control', '');
    const disableButton = getElement('button.btn.btn-lg.btn-primary.cursor-pointer');

    await t
        .typeText('input.form-control', 'https://www', { replace: true })
        .expect(alertMessage).ok()
        .expect(disableButton.getAttribute('disabled')).notEql(null)
        .typeText('input.form-control', 'https://www.google', { replace: true })
        .expect(alertMessage).ok()
        .expect(disableButton.getAttribute('disabled')).eql(null)
        .typeText('input.form-control', 'ttps://www.google', { replace: true })
        .expect(alertMessage).ok()
        .expect(disableButton.getAttribute('disabled')).notEql(null)
        .typeText('input.form-control', 'https://www.google.com', { replace: true })
        .expect(disableButton.getAttribute('disabled')).eql(null)
});

test('request https://www.google.com', async t => {
    await t
        .typeText('input.form-control', 'https://www.google.com')
        .click('button.btn.btn-lg.btn-primary.cursor-pointer');

    const queryLink = getElement('a.bg-info.text-white.rounded-pill');
    await t.expect(queryLink).notEql(null);
});

test('request query https://www.google.com', async t => {
    await t
        .typeText('input.form-control', 'https://www.google.com')
        .click('button.btn.btn-lg.btn-primary.cursor-pointer');

    await t
        .click('a.bg-info.text-white.rounded-pill');

    const h3_1 = findElementByTrimmedText('div.timing_analysis > h3', 'Timing Analysis');
    const h3_2 = findElementByTrimmedText('div.page_load > h3', 'Page Load');
    const h3_3 = findElementByTrimmedText('div.first_interaction > h3', 'First Interaction');

    await t.expect(h3_1).ok()
    await t.expect(h3_2).ok()
    await t.expect(h3_3).ok()
});