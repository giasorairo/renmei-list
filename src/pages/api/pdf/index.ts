import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

export default async function pdf(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.send(`method is ${req.method}`);
    return;
  }
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = new URL('http://localhost:3000/pdf');
  url.searchParams.append('names', '山田一郎,山田二郎,山田三郎');
  url.searchParams.append('company', '株式会社山田印刷');

  await page.goto(url.toString());

  const pdf = await page.pdf({ format: 'A4', landscape: true });
  await browser.close();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment: filename=output.pdf');

  res.send(pdf);
  return 
}