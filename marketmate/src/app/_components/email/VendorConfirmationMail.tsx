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
import { SampleOrderInfo as OrderInfo, productsByVendor } from "./sampleEmailData";
import emailStyles from "./emailStyle";

export interface VendorEmailProps {
  orderList: OrderInfo[];
}

const BuyerEmailTemplate = () => {
  // temp data
  const order = productsByVendor["vendor2"];
  const orderTotal = order.reduce((acc, product) => acc + product.price, 0);

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
      <Preview>You have a new order request!</Preview>

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
              <strong>Hi {order[0].vendorName},</strong>
            </Text>
            <Text style={emailStyles.p}>
              Exciting news! {order[0].buyerName} is interested in your products. The order details
              are below. Thank you for your dedication to your craft; your products bring joy and
              inspiration to our community.
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

            <OrderSection orders={order} />

            <Text style={emailStyles.total}>Total: ${orderTotal}</Text>
          </Section>

          {/* Next Steps */}
          <Section style={{ marginBottom: "50px" }}>
            <Container>
              <Heading
                as="h2"
                style={emailStyles.h2}
              >
                Next Steps
              </Heading>
            </Container>
            <Text style={emailStyles.p}>
              Please contact your buyer as soon as possible to discuss payment and organize a
              pick-up or drop-off. Payments should be handled at the time of pick-up or drop-off.
            </Text>
            <Button
              href={"mailto:" + order[0].buyerEmail}
              style={emailStyles.button}
            >
              Contact {order[0].buyerName}
            </Button>
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
              href="https://artisway.ca/vendor"
              style={emailStyles.secondaryButton}
            >
              Manage Your Store
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

function OrderSection({ orders }: { orders: OrderInfo[] }) {
  return (
    <>
      <Section>
        <Text style={emailStyles.vendorField}>Buyer: {orders[0].buyerName}</Text>

        {orders.map((order) => (
          <Row
            key={order.productName}
            style={emailStyles.rowSection}
          >
            <Column style={emailStyles.columnSection}>
              <Img
                alt={order.productName}
                src={order.image}
                style={emailStyles.productImage}
              />
            </Column>
            <Column>
              <Text style={emailStyles.p}>
                <strong>{order.productName}</strong>
              </Text>
              <Text style={emailStyles.p}>Quantity: {order.quantity}</Text>
              <Text style={emailStyles.p}>Price: ${order.price}/item</Text>
            </Column>
            <Hr style={emailStyles.hr} />
          </Row>
        ))}
        <Hr style={emailStyles.hr} />
      </Section>
    </>
  );
}

export default BuyerEmailTemplate;
