import React from "react";
import { Helmet } from "react-helmet-async";

interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
}

export const SEO: React.FC<SeoProps> = ({
  title = "Fast Motors | Método Exclusivo",
  description = "Acelere seus resultados e aumente seus lucros com o método Fast Motors.",
  keywords = "fast motors, lucros, entrega, vendas de carros, automotivo",
  ogImage = "/placeholder.svg",
  ogUrl = typeof window !== "undefined" ? window.location.href : "",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};
