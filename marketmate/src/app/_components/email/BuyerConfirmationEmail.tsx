import {
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
  vendorEmail: string;
  image: string;
}

export interface BuyerEmailProps {
  buyerName: string;
  productLists: OrderInfo[];
}

// TODO: Add the product image, price, and total price

const BuyerEmailTemplate = ({ buyerName, productLists }: BuyerEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Thanks for your order request!</Preview>
      <Body style={emailStyles.main}>
        <Container>
          {/* Banner */}
          <Text style={emailStyles.logoStyle}>Artisway</Text>
          <Section style={emailStyles.banner}>
            <Heading
              as="h1"
              style={emailStyles.headingStyle}
            >
              Order Request Confirmation
            </Heading>
            <Text style={emailStyles.paragraph}>Hi {buyerName}, thanks for your order!</Text>
            <Text style={emailStyles.paragraph}>
              Our artisans have received your purchase request and are ready to work their magic.
              Your order details are below - get ready for the artful touch they infuse into every
              detail. Thanks for choosing Artisway to support local artisans!
            </Text>
          </Section>

          {/* Order Details */}
          <Section style={emailStyles.box}>
            <Container style={emailStyles.center}>
              <Heading
                as="h2"
                style={emailStyles.headingStyle}
              >
                Order Details
              </Heading>
              <Text style={emailStyles.paragraph}>Mar 15, 2024</Text>
            </Container>
            <Heading
              as="h4"
              style={emailStyles.headingStyle}
            >
              <strong>Vendor: Colorway</strong>
            </Heading>
            <a
              href={`mailto:${productLists[0].vendorEmail}`}
              style={emailStyles.contactLink}
            >
              Contact Vendor
            </a>
            {productLists.map((product) => (
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
                  <Text style={emailStyles.productName}>{product.productName}</Text>
                  <Text>Quantity: {product.quantity}</Text>
                  <Text>Price: ${product.price}</Text>
                </Column>
                <Hr style={emailStyles.hr} />
              </Row>
            ))}
            <Heading
              as="h4"
              style={emailStyles.productName}
            >
              <strong>Total: $65</strong>
            </Heading>

            <Section style={emailStyles.banner}>
              <Container style={emailStyles.center}>
                <Heading
                  as="h2"
                  style={emailStyles.headingStyle}
                >
                  Next Steps
                </Heading>
              </Container>
              <Text style={emailStyles.paragraph}>
                Our artisans will be with you as soon as possible to discuss payment and shipping.
                If you have any immediate request, please feel free to reach out to them directly.
              </Text>
            </Section>

            {/* Footer */}
            <Section style={emailStyles.footerStyle}>
              <Text style={emailStyles.paragraph}>
                If you have any other questions, please reply to this email or contact us at{" "}
                <a
                  href="mailto:info@artisway.ca"
                  style={emailStyles.emailLink}
                >
                  info@artisway.ca
                </a>{" "}
                anytime. We are here to help!
              </Text>

              <Text style={emailStyles.paragraph}>
                All the best,
                <br />
                Artisway Team
              </Text>

              <Button
                href="https://artisway.ca"
                style={emailStyles.button}
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
