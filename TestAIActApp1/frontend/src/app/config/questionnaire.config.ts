export const DEPARTMENTS = [
  'HR',
  'Finance',
  'Legal',
  'IT/Technology',
  'Sales & Marketing',
  'Operations',
  'Customer Service',
  'Communication & PR',
  'Other',
];

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  key: string;
  text: string;
  aiActRef?: string;
  options: QuestionOption[];
  multiSelect?: boolean; // if true, renders checkboxes instead of a dropdown
}

export const UNIVERSAL_QUESTIONS: Question[] = [
  {
    key: 'q1_frequency',
    text: 'How often do you use AI tools in your daily work?',
    aiActRef: 'Art. 4 – AI literacy',
    options: [
      { value: 'never', label: 'Never' },
      { value: 'monthly', label: 'Less than once a month' },
      { value: 'few_per_month', label: 'A few times a month' },
      { value: 'weekly', label: 'Weekly' },
      { value: 'daily', label: 'Daily' },
    ],
  },
  {
    key: 'q2_personal_ai_3months',
    text: 'In the last 3 months, have you used personal AI tools (e.g. ChatGPT, Claude, Copilot) for work tasks?',
    aiActRef: 'Art. 4 – AI literacy / shadow IT risk',
    options: [
      { value: 'no', label: 'No' },
      { value: 'yes_occasionally', label: 'Yes – occasionally' },
      { value: 'yes_regularly', label: 'Yes – regularly' },
    ],
  },
  {
    key: 'q3_personal_ai_purpose',
    text: 'If yes — what did you use personal AI tools for? (select all that apply)',
    aiActRef: 'Art. 4 – AI literacy / shadow IT risk',
    multiSelect: true,
    options: [
      { value: 'drafting_emails', label: 'Drafting emails or documents' },
      { value: 'summarising', label: 'Summarising reports or meetings' },
      { value: 'coding', label: 'Writing or reviewing code' },
      { value: 'hr_tasks', label: 'Job application or performance review assistance' },
      { value: 'customer_comms', label: 'Customer communication' },
      { value: 'data_analysis', label: 'Data analysis' },
      { value: 'translation', label: 'Translation' },
      { value: 'not_applicable', label: 'Not applicable – I did not use personal AI tools' },
    ],
  },
  {
    key: 'q4_affects_people',
    text: 'Do AI outputs directly influence decisions that affect other people (e.g. hiring, credit, care)?',
    aiActRef: 'Annex III – High-risk categories',
    options: [
      { value: 'never', label: 'Never' },
      { value: 'sometimes', label: 'Sometimes' },
      { value: 'regularly', label: 'Regularly' },
      { value: 'always', label: 'Always' },
    ],
  },
  {
    key: 'q5_human_review',
    text: 'Is a human always reviewing AI outputs before acting on them?',
    aiActRef: 'Art. 14 – Human oversight',
    options: [
      { value: 'always', label: 'Always' },
      { value: 'usually', label: 'Usually' },
      { value: 'rarely', label: 'Rarely' },
      { value: 'never_na', label: 'Never / Not applicable' },
    ],
  },
  {
    key: 'q6_personal_data',
    text: 'Does your AI tool process personal data about individuals?',
    aiActRef: 'Art. 10 – Data governance',
    options: [
      { value: 'no', label: 'No' },
      { value: 'yes_anonymised', label: 'Yes – anonymised data only' },
      { value: 'yes_identifiable', label: 'Yes – identifiable personal data' },
      { value: 'unsure', label: 'Unsure' },
    ],
  },
  {
    key: 'q7_oversight_awareness',
    text: 'Do you know who is responsible for AI compliance in your department?',
    aiActRef: 'Art. 9 – Risk management',
    options: [
      { value: 'yes_know', label: 'Yes, I know who it is' },
      { value: 'heard_of', label: "I've heard of someone but not sure" },
      { value: 'no', label: 'No' },
      { value: 'not_applicable', label: 'Not applicable' },
    ],
  },
  {
    key: 'q8_training',
    text: 'Have you received training on responsible or compliant AI use?',
    aiActRef: 'Art. 4 – AI literacy obligations',
    options: [
      { value: 'none', label: 'No training received' },
      { value: 'informal', label: 'Informal awareness only' },
      { value: 'formal', label: 'Formal training completed' },
      { value: 'certified', label: 'Certified / qualified' },
    ],
  },
  {
    key: 'q9_risk_perception',
    text: 'How would you rate the risk of AI misuse in your department?',
    aiActRef: 'Art. 9 – Risk management',
    options: [
      { value: 'high', label: 'High' },
      { value: 'medium', label: 'Medium' },
      { value: 'low', label: 'Low' },
      { value: 'not_thought_about', label: "I haven't thought about it" },
    ],
  },
];

export const DEPARTMENT_QUESTIONS: Record<string, Question> = {
  HR: {
    key: 'q10_dept',
    text: 'Are AI tools used in hiring, performance review, or workforce planning?',
    aiActRef: 'Annex III §4 – Employment, workers management',
    options: [
      { value: 'no', label: 'No' },
      { value: 'yes_one', label: 'Yes – one of these' },
      { value: 'yes_multiple', label: 'Yes – multiple of these' },
    ],
  },
  Finance: {
    key: 'q10_dept',
    text: 'Are AI tools used for credit scoring, fraud detection, or financial risk assessment?',
    aiActRef: 'Annex III §5b – Credit scoring',
    options: [
      { value: 'no', label: 'No' },
      { value: 'yes_one', label: 'Yes – one of these' },
      { value: 'yes_multiple', label: 'Yes – multiple of these' },
    ],
  },
  Legal: {
    key: 'q10_dept',
    text: 'Are AI tools used to draft contracts or support compliance decisions?',
    aiActRef: 'Art. 22 – Automated decision-making',
    options: [
      { value: 'no', label: 'No' },
      { value: 'drafting_only', label: 'Yes – for drafting only' },
      { value: 'risk_compliance', label: 'Yes – for risk / compliance decisions' },
    ],
  },
  'IT/Technology': {
    key: 'q10_dept',
    text: 'Do you build, configure, or deploy AI systems used by others in the organisation?',
    aiActRef: 'Art. 25 – Obligations of deployers',
    options: [
      { value: 'no', label: 'No' },
      { value: 'configure_deploy', label: 'I configure / deploy existing tools' },
      { value: 'build_develop', label: 'I build or develop AI systems' },
    ],
  },
  'Sales & Marketing': {
    key: 'q10_dept',
    text: 'Does your team use AI for customer profiling, targeting, or personalisation?',
    aiActRef: 'Art. 13 – Transparency obligations',
    options: [
      { value: 'no', label: 'No' },
      { value: 'yes_internal', label: 'Yes – for internal analysis only' },
      { value: 'yes_customer_facing', label: 'Yes – directly in customer interactions' },
    ],
  },
};

export const DEFAULT_DEPT_QUESTION: Question = {
  key: 'q10_dept',
  text: 'Are any AI tools used in ways that affect outcomes for customers or employees?',
  aiActRef: 'Art. 14 – Human oversight',
  options: [
    { value: 'no', label: 'No' },
    { value: 'yes_occasionally', label: 'Yes – occasionally' },
    { value: 'yes_regularly', label: 'Yes – regularly' },
  ],
};

export function getDepartmentQuestion(department: string): Question {
  return DEPARTMENT_QUESTIONS[department] ?? DEFAULT_DEPT_QUESTION;
}