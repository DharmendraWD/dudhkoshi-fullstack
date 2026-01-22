export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://dudhkoshi.com/sitemap.xml",
  };
}
