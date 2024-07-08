import puppeteer from "puppeteer";
import { NextResponse } from "next/server";

export async function GET() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log("Navigating to the dashboard page...");
    await page.goto(
      "https://dashboard.codespark.com/dashboard/classroom/RsbJLJpeNC",
      { waitUntil: "domcontentloaded" }
    );

    console.log("Waiting for username input...");
    await page.waitForSelector('input[name="username"]', { timeout: 30000 });
    await page.type('input[name="username"]', process.env.USERNAME);

    console.log("Waiting for password input...");
    await page.waitForSelector('input[name="password"]', { timeout: 30000 });
    await page.type('input[name="password"]', process.env.PASSWORD);

    console.log("Clicking login button...");
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle0" }),
      page.click('button[type="submit"]'),
    ]);

    console.log("Waiting for navigation link...");
    await page.waitForSelector('a[href="/courses"]', { timeout: 30000 });
    await page.click('a[href="/courses"]');

    await page.waitForTimeout(2000);

    console.log("Clicking target course...");
    await page.waitForSelector('a[href="/courses/1"] h2', { timeout: 30000 });
    await page.click('a[href="/courses/1"] h2');

    await page.waitForTimeout(2000);

    console.log("Clicking generate code button...");
    await page.waitForSelector('button[data-action="generate-code"]', {
      timeout: 30000,
    });
    await page.click('button[data-action="generate-code"]');

    await page.waitForTimeout(2000);

    console.log("Clicking view code button...");
    await page.waitForSelector('button[data-action="view-code"]', {
      timeout: 30000,
    });
    await page.click('button[data-action="view-code"]');

    console.log("Waiting for code element...");
    await page.waitForSelector(".code-display span", { timeout: 30000 });
    const codeTextElement = await page.$(".code-display span");
    const codeText = await codeTextElement.evaluate((element) =>
      element.textContent.trim()
    );

    console.log("Closing browser...");
    await browser.close();

    return NextResponse.json({ code: codeText });
  } catch (error) {
    console.error("Error occurred:", error);
    await browser.close();
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
