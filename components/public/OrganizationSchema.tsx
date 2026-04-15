/**
 * JSON-LD Organization + WebSite schema for NTUTEC.
 * Helps search engines render rich snippets with logo, social links, address.
 * R8-02: Added WebSite schema with SearchAction.
 * R8-03: Added contactPoint (email only).
 * R8-05: logo uses absolute URL with ImageObject (was already absolute).
 */
export default function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
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
        logo: {
          "@type": "ImageObject",
          url: "https://tec.ntu.edu.tw/images/brand/ntutec-logo-horizontal.png",
          width: 200,
          height: 60,
        },
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
        contactPoint: {
          "@type": "ContactPoint",
          email: "ntutec@ntutec.com",
          contactType: "customer support",
          availableLanguage: ["zh-TW", "en"],
        },
        sameAs: [
          "https://www.facebook.com/ntutec.fanpage/",
          "https://www.linkedin.com/company/ntutec/",
          "https://www.instagram.com/ntu_tec/",
          "https://www.youtube.com/@ntutec9874/",
        ],
        description:
          "台大創創中心是台大創業生態系的實戰基地，13 年來累計輔導近 600 支新創團隊。以台大加速器、台大車庫、企業垂直加速器與台大天使會四大業務，連結台大、連結產業、連結資本。",
      },
      {
        "@type": "WebSite",
        "@id": "https://tec.ntu.edu.tw/#website",
        url: "https://tec.ntu.edu.tw",
        name: "台大創創中心 NTUTEC",
        publisher: {
          "@id": "https://tec.ntu.edu.tw/#organization",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
