import React, { FC, useMemo } from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { isEvenNumber } from '@/utilities/is-even-number';
import { isOddNumber } from '@/utilities/is-odd-number';
import { FontFamily, fontFamilies } from '@/app/_hooks/use-font-family';

const FONT_SIZE = 20;

fontFamilies.forEach((_fontFamily) => {
  Font.register({
    family: _fontFamily.name,
    src: _fontFamily.src,
  });
});


// ドキュメントに適用するスタイルを作成します
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    padding: 32,
    border: '1px solid black',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  department: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: FONT_SIZE,
    marginRight: FONT_SIZE / 2,
    marginTop: 'auto',
    fontWeight: 'bold',
    fontFamily: 'kouzan-mouhitu',
  },
  company: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: FONT_SIZE,
    marginRight: FONT_SIZE * 1.5,
    marginTop: 'auto',
    marginBottom: FONT_SIZE,
    fontWeight: 'bold',
    fontFamily: 'kouzan-mouhitu',
    lineHeight: 1,
  },
  namesContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: FONT_SIZE,
    fontSize: FONT_SIZE,
    lineHeight: 1,
  },
  namesRowContainer: {
    display: 'flex',
    gap: FONT_SIZE / 2,
    flexDirection: 'row',
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    fontFamily: 'kouzan-mouhitu'
  },
  emptyName: {
    color: 'rgba(0, 0, 0, 0)',
  }
});

type Props = {
  names: string[],
  company: string,
  department: string,
  fontFamily: FontFamily,
}

// PDFドキュメントを作成します
export const RenmeiDocument: FC<Props> = ({
  names,
  company,
  department,
  fontFamily,
}) => {
  const maxLengthName = useMemo(() => Math.max(...names.map((name) => name.length)), [names]);
  return (
    <Document>
      <Page size={[841.89, 595.28]} style={styles.page}>
        <View style={styles.container}>
          <View style={{ ...styles.department, fontFamily:  fontFamily.name}}>
            {department.split('').map((char, key) => (<Text key={key}>{char}</Text>))}
          </View>
          <View style={{ ...styles.company, fontFamily:  fontFamily.name }}>
            {company.split('').map((char, key) => (<Text key={key}>{char}</Text>))}
          </View>
          <View style={styles.namesContainer}>
            <View style={{ ...styles.namesRowContainer }}>
              {names
                .filter((_, i) => isEvenNumber(i))
                .reverse()
                .map((name, nameKey) => (
                  name
                    ? (
                      <View key={nameKey} style={{...styles.nameContainer, height: FONT_SIZE * maxLengthName, fontFamily:  fontFamily.name }}>
                        {name.split('').map((char, charKey) => <Text key={charKey}>{char}</Text>)}
                      </View>
                    )
                    : (
                      <View
                        key={nameKey}
                        style={styles.nameContainer}
                      >
                        <Text style={styles.emptyName}>空</Text>
                      </View>
                    )
                ))
              }
            </View>
            <View style={{ ...styles.namesRowContainer }}>
              {names
                .filter((_, i) => isOddNumber(i))
                .reverse()
                .map((name, nameKey) => (
                  name
                    ? (
                      <View key={nameKey} style={{...styles.nameContainer, height: FONT_SIZE * maxLengthName, fontFamily:  fontFamily.name }}>
                        {name.split('').map((char, charKey) => <Text key={charKey}>{char}</Text>)}
                      </View>
                    )
                    : (
                      <View
                        key={nameKey}
                        style={styles.nameContainer}
                      >
                        <Text style={styles.emptyName}>空</Text>
                      </View>
                    )
                ))
              }
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
