export const getFont = async (fontFamily: string) => {
  const fontFamilyName = fontFamily; // 取得したいGoogleフォント名
  const urlFamilyName = fontFamilyName.replace(/ /g, "+"); // URLでは空白を+に置き換える
  const googleApiUrl = `https://fonts.googleapis.com/css?family=${urlFamilyName}`; // Google Fonts APIのURL

  const response = await fetch(googleApiUrl);
  if (response.ok) {
    const cssFontFace = await response.text();
    const matchUrls = cssFontFace.match(/url\(.+?\)/g);
    if (!matchUrls) {
      throw new Error("font is not found !!");
    };
    
    for (const url of matchUrls) {
      const font = new FontFace(fontFamilyName, url);
      await font.load();
      document.fonts.add(font);
    }
  }
};