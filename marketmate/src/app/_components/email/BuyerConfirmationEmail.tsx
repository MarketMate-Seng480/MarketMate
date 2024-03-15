import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from "@react-email/components";
import * as React from "react";
import { OrderInfo } from "../CartTable";
// import them

export interface BuyerEmailProps {
  buyerName: string;
  productLists: OrderInfo[];
}

// TODO: Add the product image, price, and total price

const BuyerEmailTemplate = ({ buyerName, productLists }: BuyerEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Thanks for your purchase!</Preview>
      <Body style={main}>
        <Container>
          {/* Banner */}
          <Text style={logoStyle}>Artisway</Text>
          <Section style={banner}>
            <Heading style={headingStyle}>Order Request Confirmation</Heading>
            <Text style={paragraph}>Hi {buyerName}, thanks for your order!</Text>
            <Text style={paragraph}>
              Our artisans have received your purchase request and are ready to work their magic.
              Your order details are below - get ready for the artful touch they infuse into every
              detail. Thanks for choosing Artisway to support local artisans!
            </Text>
          </Section>

          {/* Order Details */}
          <Section style={box}>
            <Container style={center}>
              <Heading
                as="h3"
                style={headingStyle}
              >
                Order Details
              </Heading>
              <Text style={paragraph}>Mar 15, 2024</Text>
            </Container>

            <Heading
              as="h4"
              style={headingStyle}
            >
              <strong>Vendor: Vendor 1</strong>
            </Heading>

            <Link href={`mailto:hello@example.com`}>Contact Vendor</Link>
            {productLists.map((product) => (
              <Row
                key={product.productName}
                style={rowSection}
              >
                <Column style={columnSection}>
                  <Img
                    alt={product.productName}
                    src={product.vendorEmail}
                    style={productImage}
                  />
                </Column>
                <Column>
                  <Heading as="h3">{product.productName}</Heading>
                  <Text>Quantity: {product.quantity}</Text>
                  {/* <Text>${product.}</Text>x */}
                </Column>
                <Hr style={hr} />
              </Row>
            ))}

            <Text style={paragraph}>
              <strong>Total: $300</strong>
            </Text>

            {/* Footer */}
            <Section style={footerStyle}>
              <Text style={paragraph}>
                If you have any questions, please reply to this email or send us an email at{" "}
                <a href="mailto:info@artisway.ca">info@artisway.ca</a> anytime. We are here to help!
              </Text>

              <Text style={paragraph}>
                All the best,
                <br />
                Artisway Team
              </Text>

              <Button
                href="https://artisway.ca"
                style={button}
              >
                Visit Artisway
              </Button>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default BuyerEmailTemplate;

// STYLES
const main = {
  backgroundColor: "#FDFAF8",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  fontSize: "16px",
  padding: 0,
  margin: 0,
  marginTop: "20px",
};

const banner = {
  backgroundColor: "#FEF5EF",
  textAlign: "center" as const,
  justifyContent: "center",
  alignItems: "center",
  color: "#577D90",
  marginTop: "30px",
  marginBottom: "30px",
  padding: "15px 10px 15px 10px",
  width: "100%",
};

const headingStyle = {
  color: "#577D90",
};

const center = {
  textAlign: "center" as const,
};

const logoStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#CA7A6C",
  textAlign: "center" as const,
  textSpacing: "2px",
};

const footerStyle = {
  margin: "0 auto",
  marginTop: "64px",
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
  color: "#321F0E",
};

const productImage = {
  width: "100px",
  height: "100px",
  objectFit: "cover" as const,
  borderRadius: "5px",
};

const button = {
  backgroundColor: "#CA7A6C",
  borderRadius: "5px",
  color: "#fff",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "10px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
