import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import { StepByStepAnalysis } from '../types';
import { Calculator, Zap, ListOrdered, Copy, Check } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import Seo from '../components/Seo';

export default function InsideMath() {
  const [code, setCode] = useState(`def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)`);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<StepByStepAnalysis | null>(null);
  const [copied, setCopied] = useState(false);
  const isServer = typeof window === 'undefined';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleAnalyze = async () => {
    if (!code.trim()) return;
    setIsAnalyzing(true);
    setResult(null);
    try {
      const { analyzeCodeStepByStep } = await import('../lib/ai');
      const res = await analyzeCodeStepByStep(code);
      setResult(res);
    } catch (error: any) {
      console.error("Analysis failed:", error);
      if (error?.message?.includes('429')) {
        alert("The math wizards are taking a quick water break. Please try again in 60 seconds (Quota Exceeded).");
      } else {
        alert("Failed to analyze code. Please try again.");
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-12">
      <Seo
        title="Complexity Lab: Line-By-Line Code Analysis | AlgoStory"
        description="Analyze your algorithms step-by-step. Get a mathematical breakdown of loops, recursion, and Big O notation."
        path="/inside-math"
        keywords="big o breakdown, line by line complexity analysis, recursion analysis, algorithm math"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'AlgoStory Complexity Lab',
          description: 'Step-by-step mathematical breakdown of time and space complexity.',
          url: 'https://algostory.com/inside-math',
        }}
      />

      <Breadcrumbs />

      <section className="mb-8 sm:mb-16 text-center px-4">
        <h1 className="font-headline font-black text-4xl sm:text-6xl md:text-8xl text-on-background tracking-tighter mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 italic uppercase">
          <Calculator className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
          Inside the Math
        </h1>
        <p className="text-on-surface-variant text-md sm:text-xl font-bold max-w-3xl mx-auto">
          Paste your code and we'll break it down line-by-line to show you exactly how the Big O complexity is calculated.
        </p>
      </section>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Editor */}
        <section className="lg:col-span-5 space-y-6">
          <div className="bg-on-background rounded-3xl overflow-hidden border-4 border-on-background shadow-[12px_12px_0_#0f172a]">
            <div className="flex items-center justify-between px-4 py-3 bg-on-background/50 border-b-2 border-on-background/30">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-error"></div>
                <div className="w-3 h-3 rounded-full bg-tertiary"></div>
                <div className="w-3 h-3 rounded-full bg-primary-fixed-dim"></div>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleCopy} 
                  className="text-white hover:text-primary transition-colors flex items-center gap-1 font-label text-xs uppercase tracking-widest font-black bg-white/10 px-3 py-1 rounded-lg border border-white/20 cursor-pointer"
                  title="Copy Code"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <span className="text-white font-label text-xs uppercase tracking-widest font-black">your_code</span>
              </div>
            </div>
            <div className="bg-[#1d1f21] min-h-[400px] max-h-[600px] overflow-auto">
              {isServer ? (
                <pre className="overflow-auto p-6 text-sm text-white">
                  <code>{code}</code>
                </pre>
              ) : (
                <Editor
                  value={code}
                  onValueChange={value => setCode(value)}
                  highlight={value => Prism.highlight(value, Prism.languages.python, 'python')}
                  padding={24}
                  style={{
                    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                    fontSize: 14,
                    backgroundColor: 'transparent',
                  }}
                  className="text-white"
                />
              )}
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full bg-primary text-white py-4 sm:py-5 rounded-3xl font-headline font-black text-xl sm:text-2xl uppercase tracking-tighter border-4 border-on-background shadow-[0_6px_0_#064e3b] sm:shadow-[0_8px_0_#064e3b] hover:translate-y-1 hover:shadow-[0_4px_0_#064e3b] sm:hover:shadow-[0_6px_0_#064e3b] active:translate-y-3 active:shadow-none transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isAnalyzing ? (
              <>
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                Crunching...
              </>
            ) : (
              <>
                <Zap className="w-8 h-8" />
                Break Down Code
              </>
            )}
          </button>
        </section>

        {/* Right Side: Step-by-Step Breakdown */}
        <section className="lg:col-span-7">
          {!result && !isAnalyzing && (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-on-surface-variant border-4 border-dashed border-outline-variant rounded-xl p-8 text-center bg-surface-container-lowest">
              <ListOrdered className="w-16 h-16 mb-4 text-outline" />
              <h3 className="font-headline font-bold text-2xl mb-2">Awaiting Code</h3>
              <p>Click "Break Down Code" to see the line-by-line mathematical analysis.</p>
            </div>
          )}

          {isAnalyzing && (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-primary border-4 border-on-background rounded-3xl p-8 text-center bg-white shadow-[12px_12px_0_#0f172a]">
              <div className="w-20 h-20 border-8 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
              <h3 className="font-headline font-black text-3xl animate-pulse uppercase italic">Analyzing paths...</h3>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {/* Overall Complexity Summary */}
              <div className="bg-white p-6 sm:p-10 rounded-3xl border-4 border-on-background shadow-[8px_8px_0_#0f172a] sm:shadow-[12px_12px_0_#0f172a] flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10">
                <div className="text-center md:text-left">
                  <h3 className="font-headline font-black text-xl sm:text-2xl uppercase tracking-tighter text-on-surface-variant mb-1 sm:mb-2 italic">Overall Complexity</h3>
                  <p className="text-md sm:text-lg font-bold">The final calculated cost of the algorithm.</p>
                </div>
                <div className="flex gap-4 sm:gap-6">
                  <div className="bg-primary/5 text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-2xl border-4 border-primary text-center shadow-[4px_4px_0_rgba(5,150,105,0.1)] sm:shadow-[6px_6px_0_rgba(5,150,105,0.1)]">
                    <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest mb-1 opacity-80">Time</div>
                    <div className="font-headline font-black text-2xl sm:text-4xl leading-none">{result.overallTimeComplexity}</div>
                  </div>
                  <div className="bg-secondary/5 text-secondary px-6 sm:px-8 py-3 sm:py-4 rounded-2xl border-4 border-secondary text-center shadow-[4px_4px_0_rgba(2,132,199,0.1)] sm:shadow-[6px_6px_0_rgba(2,132,199,0.1)]">
                    <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest mb-1 opacity-80">Space</div>
                    <div className="font-headline font-black text-2xl sm:text-4xl leading-none">{result.overallSpaceComplexity}</div>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Breakdown */}
              <div className="space-y-4 relative">
                <div className="absolute left-8 top-8 bottom-8 w-1 bg-outline-variant rounded-full hidden md:block"></div>
                
                {result.steps.map((step, index) => (
                  <div key={index} className="relative flex flex-col md:flex-row gap-6 items-start group">
                    <div className="hidden sm:flex w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl border-4 border-on-background shadow-[4px_4px_0_#0f172a] sm:shadow-[6px_6px_0_#0f172a] items-center justify-center shrink-0 z-10 font-headline font-black text-2xl sm:text-3xl text-primary">
                      {index + 1}
                    </div>
                    
                    <div className="flex-grow bg-white p-6 sm:p-8 rounded-3xl border-4 border-on-background shadow-[6px_6px_0_#0f172a] sm:shadow-[8px_8px_0_#0f172a] w-full">
                      <div className="flex flex-col xl:flex-row gap-6">
                        <div className="xl:w-1/2 space-y-4">
                          <div className="bg-[#1d1f21] p-4 rounded-lg overflow-x-auto border-2 border-outline">
                            <pre className="text-sm font-mono text-white m-0">
                              <code dangerouslySetInnerHTML={{ 
                                __html: isServer 
                                  ? step.codeSnippet 
                                  : Prism.highlight(step.codeSnippet, Prism.languages.python, 'python') 
                              }} />
                            </pre>
                          </div>
                        </div>
                        
                        <div className="xl:w-1/2 flex flex-col justify-center">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full font-label font-bold text-sm border-2 border-tertiary">
                              Cost: {step.timeComplexity}
                            </span>
                          </div>
                          <p className="text-on-surface font-body text-sm leading-relaxed">
                            {step.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
