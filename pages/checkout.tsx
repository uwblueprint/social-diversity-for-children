import { CheckoutButton } from "@components/CheckoutButton";

/**
 * This is a test page to test the Checkout Button Component
 * TODO: delete this page once the checkout button is consumed in
 * a different component or page
 */

const testPriceId = "price_1J1GuzL97YpjuvTOePyVbsRh";
const testQuantity = 1;
export default function Checkout(): JSX.Element {
    return (
        <div>
            <CheckoutButton priceId={testPriceId} quantity={testQuantity} />
        </div>
    );
}
