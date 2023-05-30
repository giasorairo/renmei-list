'use client'

import { Page, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

/** react-pdf は 72 dpi の設定なのでこの値になる */
const PDF_A4_PIXEL_SIZE = {
  width: '824px',
  height: '595px',
};

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: PDF_A4_PIXEL_SIZE.height,
    width: PDF_A4_PIXEL_SIZE.width,
  },
  image: {
    width: '500px',
    height: '300px',
  }
});

type Props = {
  base64Image: string,
}

export const RenmeiDocument = (props: Props) => {
  const { base64Image } = props;
  return (
    <Document>
      {/* A4 = 595 px * 842 px (72 dpi) */}
      <Page size="A4" orientation="landscape">
        <View style={styles.view}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image src={base64Image} style={styles.image} />
        </View>
      </Page>
    </Document>
  );
};