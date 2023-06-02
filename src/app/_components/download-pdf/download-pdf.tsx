'use client'

import { Button } from "@/components/button/button";
import { PDFDownloadLink, Document, Page, View, Text, PDFViewer, Image } from "@react-pdf/renderer";

type Props = {
  canvasBase64: string,
};

export const DownloadPdf = (props: Props) => {
  const { canvasBase64 } = props;

  if (!canvasBase64) {
    return null;
  }

  return (
    <PDFDownloadLink
    // document={<RenmeiDocument base64Image={canvasBase64} />}
    fileName='hoga.pdf'
    document={
      <Document>
        <Page size="A4" orientation='landscape'>
          <Image src={canvasBase64} style={{ width: '500px', height: '300px' }} />
        </Page>
      </Document>
    }
  >
    <button>pdf</button>
  </PDFDownloadLink>

  // <Document>
  //   <Page size="A4">
  //     <Image src={canvasBase64} />
  //     {/* <Text>huga</Text> */}
  //   </Page>
  // </Document>

    // <PDFViewer>
    //   <Document>
    //     <Page>
    //       <View>
    //         <Text>text</Text>
    //       </View>
    //     </Page>
    //   </Document>
    // </PDFViewer>
  );
};