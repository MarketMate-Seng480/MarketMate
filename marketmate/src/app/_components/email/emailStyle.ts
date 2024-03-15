import { brandTheme } from "@/app/providers";

// STYLES
const main = {
  backgroundColor: brandTheme.colors.beige[400],
  fontFamily: brandTheme.fonts.body,
  fontSize: "18px",
  padding: 0,
  margin: 0,
  marginTop: "20px",
};

const banner = {
  color: brandTheme.colors.text.heading,
  backgroundColor: brandTheme.colors.beige[400],
  textAlign: "center" as const,
  justifyContent: "center",
  alignItems: "center",
  padding: "15px 10px 15px 10px",
  width: "100%",
};

const headingStyle = {
  color: brandTheme.colors.text.heading,
};

const center = {
  textAlign: "center" as const,
};

const logoStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  color: brandTheme.colors.clay[200],
  textAlign: "center" as const,
  textSpacing: "2px",
  fontFamily: brandTheme.fonts.logo,
  marginTop: "20px",
};

const footerStyle = {
  margin: "0 auto",
  marginTop: "38px",
  marginBottom: "64px",
};

const rowSection = {
  alignItems: "start",
  justifyContent: "start",
  marginTop: "20px",
  marginBottom: "20px",
};

const columnSection = {
  alignItems: "start",
  justifyContent: "start",
  width: "130px",
};

const box = {
  padding: "0 20px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: brandTheme.colors.black,
};

const productName = {
  color: brandTheme.colors.black,
  fontSize: "16px",
  fontWeight: "bold",
};

const productImage = {
  width: "100px",
  height: "100px",
  objectFit: "cover" as const,
  borderRadius: "5px",
};

const contactLink = {
  color: brandTheme.colors.text.emphasis,
  fontSize: "14px",
};

const emailLink = {
  color: brandTheme.colors.text.emphasis,
};

const button = {
  backgroundColor: brandTheme.colors.brand.secondary,
  borderRadius: "5px",
  color: brandTheme.colors.white,
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "10px",
};

const footer = {
  color: brandTheme.colors.text.regularNav,
  fontSize: "12px",
  width: "100%",
};

const emailStyles = {
  main,
  banner,
  headingStyle,
  center,
  logoStyle,
  footerStyle,
  rowSection,
  columnSection,
  box,
  hr,
  paragraph,
  contactLink,
  productName,
  productImage,
  emailLink,
  button,
  footer,
};

export default emailStyles;
