import React from 'react';

export interface AnalysisResult {
  reasoning?: string;
  complexity: string;
  complexityClass: string;
  spaceComplexity: string;
  explanationPoints: string[];
}

export interface StepByStepAnalysis {
  overallTimeComplexity: string;
  overallSpaceComplexity: string;
  steps: {
    codeSnippet: string;
    timeComplexity: string;
    explanation: string;
  }[];
}

export interface Tutorial {
  id: string;
  title: string;
  category: string;
  readTime: string;
  description: string;
  icon: any;
  colorClass: string;
  bgClass: string;
  content: React.ReactNode;
}
