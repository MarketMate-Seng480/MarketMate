const brandTheme = {
  fonts: {
    logo: "'Averia Serif Libre', serif",
    body: "'DM Sans', sans-serif",
    heading: "'DM Sans', sans-serif",
  },
  colors: {
    background: "#FDFAF8",
    white: "#FDFAF8",
    black: "#321F0E",
    gray: "##DEE3E3",
    brand: {
      primary: "#577D90",
      secondary: "#CA7A6C",
    },
    text: {
      heading: "#577D90",
      emphasis: "#119DA4",
      body: "#321F0E",
      caption: "#9FADAC",
    },
  },
};

// Custom styles for the email
const container = {
  backgroundColor: brandTheme.colors.background,
  color: brandTheme.colors.text.body,
  fontFamily: brandTheme.fonts.body,
  fontSize: "18px",
  margin: 0,
  marginTop: "20px",
  padding: "0 20px",
};

const logoStyle = {
  color: brandTheme.colors.brand.secondary,
  fontSize: "24px",
  fontWeight: "bold",
  fontFamily: brandTheme.fonts.logo,
  textAlign: "center" as const,
  textSpacing: "1px",
  marginTop: "20px",
};

const h1 = {
  color: brandTheme.colors.text.heading,
  fontSize: "32px",
  fontWeight: "bold",
};

const h2 = {
  color: brandTheme.colors.text.heading,
  fontSize: "24px",
  marginTop: "20px",
  // fontWeight: 600,
};

const vendorField = {
  color: brandTheme.colors.text.emphasis,
  fontSize: "20px",
  fontWeight: "bold",
};

const vendorName = {
  color: brandTheme.colors.text.emphasis,
  fontSize: "20px",
  fontWeight: "bold",
};

const p = {
  color: brandTheme.colors.text.body,
  fontSize: "18px",
  lineHeight: "1.5",
  margin: "0",
  padding: "0",
  marginBottom: "16px",
};

const footerStyle = {
  margin: "0 auto",
  marginTop: "16px",
  marginBottom: "52px",
};

// Product Row
const rowSection = {
  alignItems: "start",
  justifyContent: "start",
  marginTop: "20px",
  marginBottom: "20px",
};

const columnSection = {
  alignItems: "start",
  justifyContent: "start",
  width: "150px",
};

const productImage = {
  width: "125px",
  height: "125px",
  objectFit: "cover" as const,
  borderRadius: "10px",
};

const hr = {
  borderColor: brandTheme.colors.gray,
  margin: "20px 0",
};

const total = {
  fontSize: "20px",
  fontWeight: "bold",
  alignItems: "end",
};

const emailLink = {
  color: brandTheme.colors.text.emphasis,
};

const button = {
  backgroundColor: brandTheme.colors.brand.secondary,
  borderRadius: "10px",
  color: brandTheme.colors.white,
  fontWeight: "bold",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "10px",
};

const emailStyles = {
  container,
  h1,
  h2,
  p,
  logoStyle,
  vendorField,
  vendorName,
  rowSection,
  columnSection,
  hr,
  total,
  productImage,
  emailLink,
  button,
  footerStyle,
};

export default emailStyles;
