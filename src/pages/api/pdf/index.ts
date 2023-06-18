import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

type Payload = {
  names: string[],
  company: string,
  department: string,
}

export default async function pdf(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.send(`method is ${req.method}`);
    return;
  }
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  const payload = JSON.parse(req.body) as Payload;

  const BASE_URL = 'http://localhost:3000/pdf';

  const url = new URL(BASE_URL);
  url.searchParams.append('names', payload.names.join(','));
  url.searchParams.append('company', payload.company);
  url.searchParams.append('department', payload.department);

  await page.goto(url.toString());

  const pdf = await page.pdf({ format: 'A4', landscape: true });
  await browser.close();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment: filename=output.pdf');

  res.send(pdf);
  return 
}