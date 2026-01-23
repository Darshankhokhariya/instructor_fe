import React from "react";
import Input from "../common/Input";
import Selector from "../common/Selector";
import SectionHeader from "./SectionHeader";
import { accountType, paymentMethods } from "../constant";

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
          label="Payment Method :"
          name="payment_method"
          options={paymentMethods || []}
          value={formData.payment_method}
          onChange={handleChange}
          required
          placeholder="Select payment method"
          error={validationErrors.payment_method}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <Input
            label="Bank Name :"
            name="bank_name"
            type="text"
            value={formData.bank_name}
            onChange={handleChange}
            placeholder="Enter bank name"
            error={validationErrors.bank_name}
            required
          />
          <Input
            label="Bank Account Holder Name :"
            name="bank_account_holder_name"
            type="text"
            value={formData.bank_account_holder_name}
            onChange={handleChange}
            placeholder="Enter bank account holder name"
            error={validationErrors.bank_account_holder_name}
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <Input
            label="Bank Account Number :"
            name="bank_account_number"
            min="text"
            max={18}
            value={formData.bank_account_number}
            onChange={handleChange}
            required
            placeholder="Enter bank account number"
            error={validationErrors.bank_account_number}
          />
          <Input
            label="Re Enter Bank Account Number :"
            name="bank_account_number1"
            min="text"
            max={18}
            value={formData.bank_account_number1}
            onChange={handleChange}
            required
            placeholder="Enter bank account number"
            error={validationErrors.bank_account_number1}
          />
          <Input
            label="Branch Name :"
            name="branch_name"
            type="text"
            value={formData.branch_name}
            onChange={handleChange}
            required
            placeholder="Enter branch name"
            error={validationErrors.branch_name}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <Selector
            label="Bank Account Type :"
            name="account_type"
            options={accountType || []}
            value={formData.account_type}
            onChange={handleChange}
            placeholder="Select Bank Account Type"
            error={validationErrors.account_type}
            required
          />
          <Input
            label="Bank Account IFSC Code :"
            name="ifsc_code"
            type="text"
            value={formData.ifsc_code}
            onChange={handleChange}
            required
            placeholder="Enter bank account IFSC code"
            error={validationErrors.ifsc_code}
          />
        </div>
      </div>
    </div>
  );
};

export default StepEight;
