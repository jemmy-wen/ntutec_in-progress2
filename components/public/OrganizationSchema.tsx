/**
 * JSON-LD Organization schema for NTUTEC homepage and key public pages.
 * Helps search engines render rich snippets with logo, social links, address.
 */
export default function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    "@id": "https://tec.ntu.edu.tw/#organization",
    name: "台大創創中心",
    alternateName: [
      "NTUTEC",
      "NTU Taidah Entrepreneurship Center",
      "國立臺灣大學創意創業中心",
      "台大創意創業中心",
    ],
    url: "https://tec.ntu.edu.tw",
    logo: "https://tec.ntu.edu.tw/logo.png",
    foundingDate: "2013",
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "國立臺灣大學",
      url: "https://www.ntu.edu.tw",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "思源街 18 號 台大水源校區卓越研究大樓 7 樓",
      addressLocality: "中正區",
      addressRegion: "台北市",
      addressCountry: "TW",
    },
    email: "ntutec@ntutec.com",
    sameAs: [
      "https://www.facebook.com/ntutec.fanpage/",
      "https://www.linkedin.com/company/ntutec/",
      "https://www.instagram.com/ntu_tec/",
      "https://www.youtube.com/@ntutec9874/",
    ],
    description:
      "台大創創中心是台大創業生態系的實戰基地，13 年來累計輔導近 600 支新創團隊。以台大加速器、台大車庫、企業垂直加速器與天使投資俱樂部四大業務，連結台大、連結產業、連結資本。",
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
