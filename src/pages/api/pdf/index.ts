import { NextApiRequest, NextApiResponse } from 'next';
import chromium from 'chrome-aws-lambda';

type Payload = {
  names: string[],
  company: string,
  department: string,
}

export default async function pdf(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.send(`error: method is ${req.method}`);
    return;
  }

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });
  const page = await browser.newPage();

  const payload = JSON.parse(req.body) as Payload;

  const BASE_URL = process.env.PDF_BASE_URL;

  if (!BASE_URL) {
    res.send(`error: pdf url is ${BASE_URL} !!`);
    return;
  }

  const url = new URL(BASE_URL);
  url.searchParams.append('names', payload.names.join(','));
  url.searchParams.append('company', payload.company);
  url.searchParams.append('department', payload.department);

  await page.goto(url.toString());

  const pdf = await page.pdf({ format: 'a4', landscape: true });
  await browser.close();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment: filename=output.pdf');

  res.send(pdf);
  return 
}