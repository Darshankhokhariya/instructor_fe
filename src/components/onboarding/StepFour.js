import React from "react";
import SectionHeader from "./SectionHeader";
import Input from "../common/Input";
import { BiLogoFacebook, BiLogoInstagram, BiMaleSign, BiVideo } from "react-icons/bi";
import { BiLinkIcon } from "../../../utils/icon";

const StepFour = ({ formData, handleChange, validationErrors }) => {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Social Media Profiles & Website"
        subtitle="Connect your platforms to showcase your digital presence."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Instagram Link"
          name="instagram_link"
          prefix={<BiLogoInstagram className="text-pink-500" size={16} />}
          placeholder="https://instagram.com/user"
          value={formData.instagram_link}
          onChange={handleChange}
          required={false}
          error={validationErrors.instagram_link}
        />
        <Input
          label="Facebook Link"
          name="facebook_link"
          prefix={<BiLogoFacebook className="text-blue-600" size={16} />}
          placeholder="https://facebook.com/profile"
          value={formData.facebook_link}
          onChange={handleChange}
          required={false}
          error={validationErrors.facebook_link}
        />
        <Input
          label="LinkedIn Link"
          name="linkdin_link"
          prefix={<BiMaleSign className="text-blue-700" size={16} />}
          placeholder="https://linkedin.com/in/profile"
          value={formData.linkdin_link}
          onChange={handleChange}
          required={false}
          error={validationErrors.linkdin_link}
        />
        <Input
          label="YouTube Channel Link"
          name="youtube_link"
          prefix={<BiVideo className="text-red-600" size={16} />}
          placeholder="https://youtube.com/channel"
          value={formData.youtube_link}
          onChange={handleChange}
          required={false}
          error={validationErrors.youtube_link}
        />
      </div>
      {/* New Field: Instructor Website */}
      <Input
        label="Instructor Website (Optional)"
        name="instructor_website"
        prefix={<BiLinkIcon className="text-teal-600" size={16} />}
        placeholder="https://yourwebsite.com"
        value={formData.instructor_website}
        onChange={handleChange}
        required={false}
        error={validationErrors.instructor_website}
      />
    </div>
  );
};

export default StepFour;
