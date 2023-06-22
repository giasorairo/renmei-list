export const config = {
  siteMeta: {
    title: "連名作成アプリ",
    description: "連名を作成するアプリ",
  },
  siteRoot:
    process.env.NODE_ENV === "production"
      ? "https://renmei-list.vercel.app/"
      : "http://localhost:3000",
};