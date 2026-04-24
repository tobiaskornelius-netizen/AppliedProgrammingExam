// Questionnaire configuration for the AI Act employee survey.
// This file is intentionally separate so the real questionnaire can be
// dropped in here without touching any component logic.

export const DEPARTMENTS = [
  'HR',
  'Finance',
  'Legal',
  'IT/Technology',
  'Operations',
  'Marketing',
  'Customer Service',
  'Other',
];

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  key: string;
  text: string;
  aiActRef?: string; // e.g. "Art. 4", "Annex III"
  options: QuestionOption[];
}

// Universal questions shown to every respondent regardless of department
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
    key: 'q2_type',
    text: 'What type of AI tool do you use most?',
    aiActRef: 'Art. 3 – Definitions',
    options: [
      { value: 'chatbot_llm', label: 'Chatbot / LLM (e.g. ChatGPT, Copilot)' },
      { value: 'image_video', label: 'Image / video generation' },
      { value: 'predictive', label: 'Predictive analytics' },
      { value: 'decision_support', label: 'Automated decision support' },
      { value: 'code_assistant', label: 'Code assistant' },
      { value: 'none', label: "I don't use AI tools" },
    ],
  },
  {
    key: 'q3_affects_people',
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
    key: 'q4_human_review',
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
    key: 'q5_personal_data',
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
    key: 'q6_training',
    text: 'Have you received training on responsible or compliant AI use?',
    aiActRef: 'Art. 4 – AI literacy obligations',
    options: [
      { value: 'none', label: 'No training received' },
      { value: 'informal', label: 'Informal awareness only' },
      { value: 'formal', label: 'Formal training completed' },
      { value: 'certified', label: 'Certified / qualified' },
    ],
  },
];

// Department-specific follow-up question (q7)
// Maps department name → question definition
export const DEPARTMENT_QUESTIONS: Record<string, Question> = {
  HR: {
    key: 'q7_dept',
    text: 'Are AI tools used in hiring, performance review, or workforce planning?',
    aiActRef: 'Annex III §4 – Employment, workers management',
    options: [
      { value: 'no', label: 'No' },
      { value: 'yes_one', label: 'Yes – one of these' },
      { value: 'yes_multiple', label: 'Yes – multiple of these' },
    ],
  },
  Finance: {
    key: 'q7_dept',
    text: 'Are AI tools used for credit scoring, fraud detection, or financial risk assessment?',
    aiActRef: 'Annex III §5b – Credit scoring',
    options: [
      { value: 'no', label: 'No' },
      { value: 'yes_one', label: 'Yes – one of these' },
      { value: 'yes_multiple', label: 'Yes – multiple of these' },
    ],
  },
  Legal: {
    key: 'q7_dept',
    text: 'Are AI tools used to draft contracts or support compliance decisions?',
    aiActRef: 'Art. 22 – Specific obligations for certain providers',
    options: [
      { value: 'no', label: 'No' },
      { value: 'drafting_only', label: 'Yes – for drafting only' },
      { value: 'risk_compliance', label: 'Yes – for risk / compliance decisions' },
    ],
  },
  'IT/Technology': {
    key: 'q7_dept',
    text: 'Do you build, configure, or deploy AI systems used by others in the organisation?',
    aiActRef: 'Art. 25 – Obligations of deployers',
    options: [
      { value: 'no', label: 'No' },
      { value: 'configure_deploy', label: 'I configure / deploy existing tools' },
      { value: 'build_develop', label: 'I build or develop AI systems' },
    ],
  },
};

// Default department-specific question for all other departments
export const DEFAULT_DEPT_QUESTION: Question = {
  key: 'q7_dept',
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
