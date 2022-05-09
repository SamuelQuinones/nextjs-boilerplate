export type Example = {
  /** User / Organization behind the repo */
  creator: string;
  /** is this entity a user / organization */
  is_organization: boolean;
  /** Project / App name */
  app_name: string;
  /** Description of app, please keep under 150 characters */
  desctiption: string;
  /** Direct Repo Link */
  link_to_repo: string;
  /** Production App URL */
  app_url: string;
  /** always full width, DO NOT SET THIS IN PR's UNLESS ASKED */
  full_width?: boolean;
};

const examples: Array<Example> = [
  {
    creator: "SamuelQuinones",
    is_organization: false,
    app_name: "samtheq.com",
    desctiption:
      "Personal portfolio site for Samuel Quinones to show off various projects and development prowess.",
    link_to_repo: "https://github.com/SamuelQuinones/samtheq.com",
    app_url: "https://samtheq.com",
    full_width: true,
  },
];
export default examples;
