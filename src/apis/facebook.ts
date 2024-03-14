const profileApis = [
  { key: "timeline", path: "timeline" },
  { key: "about", path: "about" },
  { key: "aboutTabs", path: "about-tabs?tab=WORK_EDUCATION" },
];

const groupApis = [
  { key: "details", path: "details" },
  { key: "jobs", path: "jobs" },
  { key: "people", path: "people" },
  { key: "posts", path: "posts?type=all" },
];

export const facebookApis = {
  profile: profileApis,
  group: groupApis,
} as const;
