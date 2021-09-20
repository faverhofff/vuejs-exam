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

    const queryLink = getElement('a.rounded-pill');
    await t.expect(queryLink).notEql(null);
});

test('request query https://www.google.com', async t => {
    await t
        .typeText('input.form-control', 'https://www.google.com')
        .click('button.btn.btn-lg.btn-primary.cursor-pointer');

    await t
        .click('a.rounded-pill');

    const element_1 = findElementByTrimmedText('h1.display-4', '200');
    const element_2 = getElement('ul.list-unstyled');

    await t.expect(element_1).ok()
    await t.expect(element_2).ok()
});