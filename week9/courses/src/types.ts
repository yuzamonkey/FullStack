interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseNormalSubmissionAndSpecialBase extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseNormalSubmissionAndSpecialBase {
  type: "normal";//"described";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseNormalSubmissionAndSpecialBase {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseNormalSubmissionAndSpecialBase {
  type: "special";
  requirements: Array<string>;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;