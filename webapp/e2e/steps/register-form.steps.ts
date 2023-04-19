import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/register-form.feature');

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
  });

  test('The user is not logged in the site and introduces wrong data', ({given,when,then}) => {

    let username:string;
    let password:string;

    given('A not logged user', () => {
      username = "fhdsgfhsd"
      password = "fhgsdhjfsk"
    });

    when('I fill wrong data in the form and press submit', async () => {
      await expect(page).toClick('Button', { text: 'Login' })
      await delay(5000)
      await expect(page).toFillForm('form[class="form-horizontal login-up-form"]', {
        username: username,
        password: password,
      })
      await expect(page).toClick('button', { text: 'Log In' })
      await delay(1000)
    });

    then('An error message appears on screen', async () => {
      const text = await page.evaluate(() => document.body.textContent);
      expect(text).toMatch("No user found for that username");
    });
  })

  test('The user is not logged in the site', ({given,when,then}) => {

    let username:string;
    let password:string;

    given('A not logged user', () => {
      username = "uo276467"
      password = "e2ff3d361A_"
    });

    when('I fill the data in the form and press submit', async () => {
      await expect(page).toClick('Button', { text: 'Login' })
      await delay(3000)
      await expect(page).toFillForm('form[class="form-horizontal login-up-form"]', {
        username: username,
        password: password,
      })
      await expect(page).toClick('button', { text: 'Log In' })
      await delay(5000)
    });

    then('The main page is shown in the screen', async () => {
      const text = await page.evaluate(() => document.body.textContent);
      expect(text).toMatch("Logout");
      expect(text).toMatch("Gestionar puntos");
      expect(text).toMatch("Gestionar mapas");
      expect(text).toMatch("Amigos");
      expect(text).toMatch("Añadir Amigo");
      expect(text).toMatch("About");
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

