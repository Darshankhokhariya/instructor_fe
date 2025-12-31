import React from "react";
import Input from "../common/Input";
import Selector from "../common/Selector";
import PhoneInput from "../common/PhoneInput";
import SmartSelect from "../common/SmartSelect";
import SectionHeader from "./SectionHeader";
import { FaMapMarkerAlt, FaRoad } from "react-icons/fa";
import { BiWorldIcon } from "../../../utils/icon";
import { languageOptions } from "../../../utils/onboarding";

const StepEight = ({
  formData,
  handleChange,
  validationErrors,
}) => {

  return (
    <div className="space-y-6 sm:space-y-10">
      <div className="space-y-4">
        <SectionHeader
          title="Bank Details"
          subtitle="Required for account verification and payments."
        />
        <Selector
          label="Payment Method"
          name="payment_method"
          options={[
            { label: "Bank", value: "bank" },
            { label: "Paypal", value: "paypal" },
          ]}
          value={formData.payment_method}
          onChange={handleChange}
          required
          placeholder="Select Payment Method"
          error={validationErrors.payment_method}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <Input
            label="Bank Name"
            name="bank_name"
            type="text"
            value={formData.bank_name}
            onChange={handleChange}
            required
            placeholder="Bank Name"
            error={validationErrors.bank_name}
          />
          <Input
            label="Bank Account Holder Name"
            name="bank_account_holder_name"
            type="text"
            value={formData.bank_account_holder_name}
            onChange={handleChange}
            required
            placeholder="Bank Account Holder Name"
            error={validationErrors.bank_account_holder_name}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <Input
            label="Bank Account Number"
            name="bank_account_number"
            min="text"
            max={18}
            value={formData.bank_account_number}
            onChange={handleChange}
            required
            placeholder="Bank Account Number"
            error={validationErrors.bank_account_number}
          />
          <Input
            label="Branch Name"
            name="branch_name"
            type="text"
            value={formData.branch_name}
            onChange={handleChange}
            required
            placeholder="Branch Name"
            error={validationErrors.branch_name}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <Selector
            label="Bank Account Type"
            name="account_type"
            options={[
              { label: "Current", value: "current" },
              { label: "Saving", value: "saving" },
            ]}
            value={formData.account_type}
            onChange={handleChange}
            required
            placeholder="Select Bank Account Type"
            error={validationErrors.account_type}
          />
          <Input
            label="Bank Account IFSC Code"
            name="ifsc_code"
            type="text"
            value={formData.ifsc_code}
            onChange={handleChange}
            required
            placeholder="Bank Account IFSC Code"
            error={validationErrors.ifsc_code}
          />
        </div>
      </div>

    </div>
  );
};

export default StepEight;
