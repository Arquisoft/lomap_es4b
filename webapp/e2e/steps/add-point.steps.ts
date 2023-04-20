import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/add-point.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  beforeEach(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 50 });
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});

      let username = "uo276467"
      let password = "e2ff3d361A_"

      await expect(page).toClick('Button', { text: 'Login' })
      await delay(3000)
      await expect(page).toFillForm('form[class="form-horizontal login-up-form"]', {
        username: username,
        password: password,
      })
      await expect(page).toClick('button', { text: 'Log In' })
      await delay(10000)
  });


  test('The user wants to add a point', ({given,when,then}) => {

    let name:string;
    let description:string;

    given('A new point info', () => {
      name = "e2e name"
      description = "e2e description"
    });

    when('I click on the map and fill the add point form', async () => {
      await expect(page).toClick('div[id="map"]')
      await expect(page).toFillForm('form[class="addPointForm"]', {
        name: name,
        description: description,
      })
      await expect(page).toClick('input[value="Agregar punto"]')
      await delay(5000)
    });

    then('The new point appears on the point list', async () => {
        await expect(page).toClick('span', { text: 'Gestionar puntos' })
        await delay(1000)
        await expect(page).toClick('span', { text: 'Ver puntos' })
        await delay(5000)
        const text = await page.evaluate(() => document.body.textContent);
        await expect(text).toMatch("e2e name");
        await expect(text).toMatch("e2e description");
    });
  })

  afterEach(async ()=>{
    browser.close()
  })

  function delay(time: number) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

});