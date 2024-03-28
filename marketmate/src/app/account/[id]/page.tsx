"use client";
import BecomeAVendorForm from "@/app/_components/BecomeAVendorForm";
import { CustomButton } from "@/app/_components/CustomButton";
import { useState } from "react";

export default function BuyerAccountPage() {
    const [openBecomeVendorForm, setOpenBecomeVendorForm] = useState(false);

    return (
        <>
            <CustomButton onClick={() => setOpenBecomeVendorForm(true)}>
                Become a Vendor
            </CustomButton>

            <BecomeAVendorForm
                isOpen={openBecomeVendorForm}
                onClose={() => setOpenBecomeVendorForm(false)}
            />
        </>
    );
}
