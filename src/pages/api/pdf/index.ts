import { NextApiRequest, NextApiResponse } from 'next';
import PDFDocument from 'pdfkit';
import SVGtoPDF from 'svg-to-pdfkit'

export default function pdf(req: NextApiRequest, res: NextApiResponse) {

  console.log('req.method', req.method);
  if (req.method !== 'POST') {
    res.status(404).end();
    return;
  }

  const doc = new PDFDocument({
    layout: 'landscape',
    size: 'A4',
  });

  const { svg } = req.body;

  SVGtoPDF(doc, svg)
  doc.pipe(res);
  doc.end();
  // res.status(200).json({ name: 'jhon' });
}