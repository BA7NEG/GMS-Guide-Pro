export enum MessageRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  isError?: boolean;
}

export enum AppSection {
  INTRO = 'intro',
  PROCESS = 'process',
  TOOLS = 'tools',
  AI_ASSISTANT = 'ai_assistant'
}

export interface StepInfo {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
}