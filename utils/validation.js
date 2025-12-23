export const FIELD_LABELS = {
  // Step 1
  name: "Full Name",
  dateOfBirth: "Date of Birth",
  gender: "Gender",
  email: "Email",
  primaryMobile: "Primary Phone Number",
  language: "Language",
  pCountry: "Permanent Country",
  pState: "Permanent State",
  pCity: "Permanent City",
  pPincode: "Permanent Pincode",
  pArea: "Permanent Area",
  pBuilding: "Permanent Building Name",
  pBlock: "Permanent Block/Door No.",
  cCountry: "Current Country",
  cState: "Current State",
  cCity: "Current City",
  cPincode: "Current Pincode",
  cArea: "Current Area",
  cBuilding: "Current Building Name",
  cBlock: "Current Block/Door No.",
  eName: "Emergency Contact Name",
  eMobile: "Emergency Phone Number",
  eRelation: "Relationship",
  // Step 2
  collegeName: "School/College Name",
  qualification: "Degree/Qualification",
  institute: "University/Institution",
  // Step 3
  registerAs: "Registration Type",
  panCard: "PAN Card Number",
  aadharNumber: "Aadhaar Card Number",
  taxIdentification: "Tax Identification",
  // Step 4
  instagram_link: "Instagram URL",
  facebook_link: "Facebook URL",
  linkdin_link: "LinkedIn URL",
  youtube_link: "YouTube URL",
  instructor_website: "Instructor Website",
  // Step 5
  profileImage: "Profile Image",
  introVideo: "Introduction Video URL",
  teaching_philosophy: "Teaching Philosophy",
  yoga_style: "Yoga Style",
  certifications: "Certifications",
  video_url: "Sample Videos",
  // Step 6
  availableOneOnOne: "One-on-One Class",
  availableGroupClass: "Group Class",
  singleClass: "Single Class",
  startTime: "Start Time",
  endTime: "End Time",
  responseTime: "Response Time",
  days: "Teaching Days",
  times: "Class Times",
  classType: "Class Type",
  // Step 7
  group_class_rate: "Group Class Rate",
  private_class_rate: "Private Class Rate",
  single_class_rate: "Single Class Rate",
  trialMode: "Trial Policy",
  // Step 8
  confirmAccurate: "Agreement - Accuracy",
  ethicalStandards: "Agreement - Ethics",
  serviceMindset: "Agreement - Service Mindset",
  signature: "Digital Signature",
};

export const STEP_FIELDS = {
  1: [
    "name",
    "dateOfBirth",
    "gender",
    "email",
    "primaryMobile",
    "language",
    "pCountry",
    "pState",
    "pCity",
    "pPincode",
    "pArea",
    "pBuilding",
    "pBlock",
    "cCountry",
    "cState",
    "cCity",
    "cPincode",
    "cArea",
    "cBuilding",
    "cBlock",
    "eName",
    "eMobile",
    "eRelation",
  ],
  2: ["collegeName", "qualification", "institute"],
  3: ["registerAs", "panCard", "aadharNumber", "taxIdentification"],
  4: [
    "instagram_link",
    "facebook_link",
    "linkdin_link",
    "youtube_link",
    "instructor_website",
  ],
  5: ["profileImage", "introVideo", "teaching_philosophy", "video_url"],
  6: ["startTime", "endTime", "responseTime"],
  7: [], // handled conditionally below
  8: ["confirmAccurate", "ethicalStandards", "serviceMindset", "signature"],
};

export const REGEX = {
  url: /^(ftp|http|https):\/\/[^ "\s]+$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  yopmail: /^[^\s@]+@yopmail\.com$/i,
  pan: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  aadhar: /^\d{12}$/,
  positiveNumber: /^\d+(\.\d+)?$/,
  gstin: /^[0-3][0-9][A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i,
};

export const isEmpty = (val) =>
  val === undefined ||
  val === null ||
  (typeof val === "string" && !val.trim()) ||
  (Array.isArray(val) && val.length === 0);

  
export const isAdult = (dob) => {
  if (!dob) return false;

  const today = new Date();
  const birthDate = new Date(dob);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age >= 18;
};
