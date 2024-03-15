import {
  Font,
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from "@react-email/components";
import * as React from "react";
// import { OrderInfo } from "../CartTable";
import emailStyles from "./emailStyle";

// temp fix for the missing type
interface OrderInfo {
  productName: string;
  quantity: number;
  price: number;
  vendorName: string;
  vendorID: string;
  image: string;
}

export interface BuyerEmailProps {
  buyerName: string;
  orderList: OrderInfo[];
}

const BuyerEmailTemplate = ({ buyerName, orderList }: BuyerEmailProps) => {
  // temp data
  buyerName = "Julia";
  const orderTotal = 65;

  orderList = [
    {
      productName: "Clay Mug - Tint Blue",
      quantity: 1,
      price: 15,
      vendorName: "Vendor Name 1",
      vendorID: "vendor1",
      image:
        "https://images.unsplash.com/photo-1495100497150-fe209c585f50?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      productName: "Black Tote Bag",
      quantity: 2,
      price: 50,
      vendorName: "Vendor Name 2",
      vendorID: "vendor2",
      image:
        "https://images.unsplash.com/photo-1578237493287-8d4d2b03591a?q=80&w=2726&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      productName: "Handmade Soap",
      quantity: 1,
      price: 15,
      vendorName: "Vendor Name 2",
      vendorID: "vendor2",
      image:
        "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?q=80&w=2682&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  // group products by vendor
  const vendorProducts = orderList.reduce(
    (acc: Record<string, OrderInfo[]>, product: OrderInfo) => {
      if (!acc[product.vendorID]) {
        acc[product.vendorID] = [];
      }
      acc[product.vendorID].push(product);
      return acc;
    },
    {}
  );

  return (
    <Html>
      <Head>
        <Font
          fontFamily="Averia Serif Libre"
          fallbackFontFamily="Georgia"
          webFont={{
            url: "https://cdn.jsdelivr.net/fontsource/fonts/averia-serif-libre@latest/latin-400-normal.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="DM Sans"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://cdn.jsdelivr.net/fontsource/fonts/dm-sans@latest/latin-400-normal.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="DM Sans"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://cdn.jsdelivr.net/fontsource/fonts/dm-sans@latest/latin-600-normal.woff2",
            format: "woff2",
          }}
          fontWeight={600}
          fontStyle="normal"
        />
      </Head>
      <Preview>Thanks for your order request!</Preview>

      <Body style={emailStyles.container}>
        <Container>
          {/* Banner */}
          <Text style={emailStyles.logoStyle}>Artisway</Text>
          <Section>
            <Heading
              as="h1"
              style={emailStyles.h1}
            >
              Order Request Confirmed
            </Heading>
            <Text style={emailStyles.p}>
              <strong>Hi {buyerName},</strong>
            </Text>
            <Text style={emailStyles.p}>
              Thank you for your order! The artisans who crafted your ordered products have received
              your purchase request. Your order details are below. Thank you for choosing Artisway
              to support local artisans!
            </Text>
          </Section>

          {/* Order Details */}
          <Section>
            <Heading
              as="h2"
              style={emailStyles.h2}
            >
              Order Details
            </Heading>

            <VendorSection vendorProducts={vendorProducts} />

            <Text style={emailStyles.total}>Total: ${orderTotal}</Text>
          </Section>

          {/* Next Steps */}
          <Section>
            <Container>
              <Heading
                as="h2"
                style={emailStyles.h2}
              >
                Next Steps
              </Heading>
            </Container>
            <Text style={emailStyles.p}>
              The artisans will be in contact with you as soon as possible to organize a pickup time
              and location. Payments will be handled at the time of pick-up or drop-off. If you have
              an urgent inquiry, click on the Vendor&apos;s names shown above to contact them
              directly.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={emailStyles.footerStyle}>
            <Text style={emailStyles.p}>
              If you have any questions, please reply to this email or contact us at{" "}
              <a
                href="mailto:info@artisway.ca"
                style={emailStyles.emailLink}
              >
                info@artisway.ca
              </a>
              . We are here to help!
            </Text>

            <Text style={emailStyles.p}>
              All the Best,
              <br />
              The Artisway Team
            </Text>

            <Button
              href="https://artisway.ca"
              style={emailStyles.button}
            >
              Visit Artisway
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

function VendorSection({ vendorProducts }: { vendorProducts: Record<string, OrderInfo[]> }) {
  return (
    <>
      {Object.entries(vendorProducts).map(([vendorID, products]) => (
        <Section key={vendorID}>
          <Text style={emailStyles.vendorField}>
            Vendor:{" "}
            <a
              href={`https://artisway.ca/shop/${products[0].vendorID}`}
              style={emailStyles.vendorName}
            >
              {products[0].vendorName}
            </a>
          </Text>

          {products.map((product) => (
            <Row
              key={product.productName}
              style={emailStyles.rowSection}
            >
              <Column style={emailStyles.columnSection}>
                <Img
                  alt={product.productName}
                  src={product.image}
                  style={emailStyles.productImage}
                />
              </Column>
              <Column>
                <Text style={emailStyles.p}>
                  <strong>{product.productName}</strong>
                </Text>
                <Text style={emailStyles.p}>Quantity: {product.quantity}</Text>
                <Text style={emailStyles.p}>Price: ${product.price}</Text>
              </Column>
              <Hr style={emailStyles.hr} />
            </Row>
          ))}
          <Hr style={emailStyles.hr} />
        </Section>
      ))}
    </>
  );
}

export default BuyerEmailTemplate;
