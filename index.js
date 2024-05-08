const dotenv = require("dotenv");
const puppeteer = require("puppeteer");

const { sendEmail } = require("./email.js");

dotenv.config();

const emailOfCareerFoundry = process.env.CF_EMAIL;
const passwordOfCareerFoundry = process.env.CF_PASSWORD;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://careerfoundry.com/en/login/");

  await page.setViewport({ width: 1920, height: 1080 });

  //Login
  const inputEmail = await page.$("#user_email");
  await inputEmail.type(emailOfCareerFoundry);

  const inputPassword = await page.$("#user_password");
  await inputPassword.type(passwordOfCareerFoundry);

  const loginButton = await page.$(".form-submit--js");

  await loginButton.click();

  await page.waitForNavigation();

  //Get data Of Full-Stack Immersion

  const fullStackImmersionButton = await page.waitForSelector(
    'a ::-p-text("Full-Stack Immersion")'
  );

  await fullStackImmersionButton.click();

  await page.waitForNavigation();

  await page.screenshot({ path: "FullStackImmersion.png" });

  try {
    const element = await page.waitForSelector(
      'p ::-p-text("Hi Moises, this is where all of your tasks to review will appear.")'
    );

    let textContent = await element.getProperty("innerHTML");

    await element.screenshot({ path: "NoTaskFullStack.png" });

    console.log(textContent);
    console.log("No task of Full Stack Immersion Course");

    // sendEmail(
    //   "Full Stack Immersion Course",
    //   "No task of Full Stack Immersion Course"
    // );
  } catch (error) {
    await page.screenshot({ path: "NewTaskFullStack.png" });

    console.log("New Task of Full Stack Immersion Course");

    sendEmail(
      "Full Stack Immersion Course",
      "New Task of Full Stack Immersion Course"
    );
  }

  //Get Data Of Intro To Frontend Develoment

  const introToFrontendDevelomentButton = await page.waitForSelector(
    'a ::-p-text("Intro to Frontend Development")'
  );

  await introToFrontendDevelomentButton.click();

  await page.waitForNavigation();

  await page.screenshot({ path: "IntroToFrontendDevelopment.png" });

  try {
    const element = await page.waitForSelector(
      'p ::-p-text("Hi Moises, this is where all of your tasks to review will appear.")'
    );

    let textContent = await element.getProperty("innerHTML");

    await element.screenshot({ path: "NoTaskIntroFrontendDevelopment.png" });

    console.log(textContent);
    console.log("No task of Intro to Frontend Development Course");

    // sendEmail(
    //   "Intro to Frontend Development Course",
    //   "No task of Intro to Frontend Development Course"
    // );
  } catch (error) {
    await page.screenshot({ path: "NewTaskIntroFrontendDevelopment.png" });

    console.log("New Task of Intro to Frontend Development Course");

    sendEmail(
      "Intro to Frontend Development Course",
      "New Task of Intro to Frontend Development Course"
    );
  }

  await browser.close();
})();
