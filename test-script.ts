import puppeteer from "puppeteer";

const URL =
  "https://next-styled-component-overrides-bug-tomsherman.vercel.app/";
// const URL = "http://localhost:3000/";

const blueRgb = "rgb(0, 0, 255)";
const redRgb = "rgb(255, 0, 0)";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.setCacheEnabled(false);

  let backgroundColors: { blue?: string; red?: string } | undefined;
  let runCount = 0;
  do {
    await page.goto(URL);
    const el = await page.waitForSelector("#link");
    await el!.hover();
    await el!.click();
    await Promise.all([
      page.waitForSelector("#test-component-blue"),
      page.waitForSelector("#test-component-red"),
    ]);
    const colors = await page.evaluate(() => {
      return {
        red: document
          .querySelector("#test-component-red")
          ?.computedStyleMap()
          .get("background-color")
          ?.toString(),
        blue: document
          .querySelector("#test-component-blue")
          ?.computedStyleMap()
          .get("background-color")
          ?.toString(),
      };
    });

    runCount++;
    console.log(`Run ${runCount} got ${colors.red} and ${colors.blue}`);
    backgroundColors = colors;
  } while (
    backgroundColors?.blue === blueRgb &&
    backgroundColors?.red === redRgb
  );

  console.log(
    `Test failed after ${runCount} runs got red=${backgroundColors.red} blue=${backgroundColors.blue}`
  );

  await browser.close();
})();
