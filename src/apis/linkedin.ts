const profileApis = [
  { key: "overview", path: "overview" },
  { key: "about", path: "about" },
  { key: "experience", path: "experience" },
  { key: "skills", path: "skills" },
  { key: "education", path: "education" },
  { key: "recommendations", path: "recommendations?type=received" },
  { key: "contactInfo", path: "contact-info" },
  { key: "activity", path: "activity?type=posts" },
  { key: "poepleAlsoViewed", path: "people-also-viewed" },
  { key: "interests", path: "interests?type=influencers" },
  { key: "courses", path: "courses" },
  { key: "events", path: "events" },
  { key: "honorsAndAwards", path: "honors-and-awards" },
  { key: "images", path: "images" },
  { key: "languages", path: "languages" },
  { key: "licensesAndCertifications", path: "licenses-and-certifications" },
  { key: "organizations", path: "organizations" },
  { key: "volunteeringExperience", path: "volunteering-experience" },
  { key: "patents", path: "patents" },
  { key: "projects", path: "projects" },
  { key: "publications", path: "publications" },
  { key: "testScores", path: "test-scores" },
];

const companyApis = [
  { key: "details", path: "details" },
  { key: "jobs", path: "jobs" },
  { key: "people", path: "people" },
  { key: "posts", path: "posts?type=all" },
];

export const linkedinApis = {
  profile: profileApis,
  company: companyApis,
} as const;
