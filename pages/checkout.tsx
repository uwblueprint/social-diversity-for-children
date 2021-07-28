import { CheckoutButton } from "@components/CheckoutButton";

// test price id corresponding to a product in stripe
const testPriceId = "price_1J1GuzL97YpjuvTOePyVbsRh";

// test quantity to specify number of products
const testQuantity = 1;

/**
 * This is a test page to test the Checkout Button Component
 * TODO: delete this page once the checkout button is consumed in
 * a different component or page
 */
export default function Checkout(): JSX.Element {
    return (
        <div>
            <CheckoutButton priceId={testPriceId} quantity={testQuantity} />
        </div>
    );
}
