import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/themes/prism-tomorrow.css';
import { useAuth } from '../contexts/AuthContext';
import { analyzeCodeComplexity, fastCodeHint } from '../lib/gemini';
import { AnalysisResult } from '../types';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Zap, BookOpen, Cpu, Activity, Lightbulb, Save, Copy, Check } from 'lucide-react';
import { ComplexityCalculator } from '../components/ComplexityCalculator';

export default function Home() {
  const { user } = useAuth();
  const [code, setCode] = useState(`def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr`);
  
  const [hint, setHint] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analyzedCode, setAnalyzedCode] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (code.trim().length > 10) {
        try {
          const quickHint = await fastCodeHint(code);
          setHint(quickHint);
        } catch (e) {
          console.error(e);
        }
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [code]);

  const handleAnalyze = async () => {
    if (!code.trim()) return;
    setIsAnalyzing(true);
    setResult(null);
    setIsSaved(false);
    try {
      const res = await analyzeCodeComplexity(code);
      setResult(res);
      setAnalyzedCode(code);
    } catch (error: any) {
      console.error("Analysis failed:", error);
      if (error?.message?.includes('429')) {
        alert("Wait a second! The AI wizards are overwhelmed. Please wait a minute and try again (Quota Exceeded).");
      } else {
        alert("Failed to analyze code. The gremlins are acting up!");
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveAnalysis = async () => {
    if (!user) {
      alert("Please log in to save your analysis.");
      return;
    }
    if (!result) return;

    setIsSaving(true);
    try {
      await addDoc(collection(db, 'users', user.uid, 'analyses'), {
        code: analyzedCode,
        complexity: result.complexity,
        complexityClass: result.complexityClass,
        spaceComplexity: result.spaceComplexity,
        explanationPoints: result.explanationPoints,
        createdAt: serverTimestamp()
      });
      setIsSaved(true);
    } catch (error) {
      console.error("Error saving analysis:", error);
      alert("Failed to save analysis.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="graph-paper min-h-screen">
      <Helmet>
        <title>AlgoStory: AI-Powered Code Complexity Visualizer</title>
        <meta name="description" content="Instantly analyze Big O time and space complexity with AI-powered narrative explanations. Master algorithms through the art of storytelling." />
        <link rel="canonical" href="https://algostory.com" />
        <meta property="og:title" content="AlgoStory: AI-Powered Code Complexity Visualizer" />
        <meta property="og:description" content="Instantly analyze Big O time and space complexity with AI-powered narrative explanations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://algostory.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "AlgoStory Complexity Calculator",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0"
            }
          })}
        </script>
      </Helmet>

      <div className="mb-12 text-center max-w-3xl mx-auto space-y-4 px-4">
        <h1 className="font-headline font-black text-4xl sm:text-5xl md:text-7xl tracking-tight leading-[1.1] md:leading-[1.05]">
          Every line of code <span className="text-primary italic underline decoration-[8px] md:decoration-[12px] decoration-primary-container">tells a story.</span>
        </h1>
        <p className="text-lg md:text-xl text-on-surface-variant font-bold max-w-2xl mx-auto">Paste your code below and watch the complexity come to life with our whimsical analyzer.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* Left Side: The Lab */}
        <section className="lg:col-span-5 space-y-8">
          <div className="flex items-center gap-3">
            <Activity className="text-primary w-10 h-10" />
            <h2 className="font-headline font-black text-4xl tracking-tighter uppercase italic">The Lab</h2>
          </div>

          <div className="relative group px-2 sm:px-0">
            <div className="bg-[#0f172a] rounded-3xl overflow-hidden border-4 border-on-background shadow-[8px_8px_0_#0f172a] sm:shadow-[12px_12px_0_#0f172a]">
              <div className="flex items-center justify-between px-4 py-3 bg-on-background/50 border-b-2 border-on-background/30">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-error"></div>
                  <div className="w-3 h-3 rounded-full bg-tertiary"></div>
                  <div className="w-3 h-3 rounded-full bg-primary-fixed-dim"></div>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={handleCopy} 
                    className="text-white hover:text-primary-fixed-dim transition-colors flex items-center gap-1 font-label text-[10px] sm:text-xs uppercase tracking-widest font-black bg-white/20 px-2 py-1 rounded-lg border border-white/20 cursor-pointer"
                    title="Copy Code"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                  <span className="text-white/70 font-label text-[10px] sm:text-xs uppercase tracking-widest font-black">your_code</span>
                </div>
              </div>
              <div className="bg-[#1d1f21] min-h-[250px] max-h-[400px] overflow-auto">
                <Editor
                  value={code}
                  onValueChange={code => setCode(code)}
                  highlight={code => Prism.highlight(code, Prism.languages.python, 'python')}
                  padding={24}
                  style={{
                    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                    fontSize: 14,
                    backgroundColor: 'transparent',
                  }}
                  className="text-white"
                />
              </div>
            </div>
            {hint && (
              <div className="absolute -bottom-4 right-4 bg-tertiary-container text-on-tertiary-container px-4 py-2 rounded-lg font-label text-xs font-bold shadow-lg transform rotate-2 z-10">
                💡 {hint}
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-4 py-4">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="bg-primary text-white w-40 h-40 sm:w-52 sm:h-52 rounded-full flex flex-col items-center justify-center gap-2 border-4 sm:border-8 border-on-primary-container shadow-[0_8px_0_#064e3b] sm:shadow-[0_12px_0_#064e3b] hover:translate-y-1 hover:shadow-[0_6px_0_#064e3b] sm:hover:shadow-[0_8px_0_#064e3b] active:translate-y-3 active:shadow-none transition-all duration-150 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className={`w-12 h-12 ${isAnalyzing ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
              <span className="font-headline font-extrabold text-center px-4 leading-tight uppercase">
                {isAnalyzing ? 'Analyzing...' : 'Analyze Complexity'}
              </span>
            </button>
            <p className="font-label text-on-surface-variant text-sm font-bold tracking-wide italic">"Push it. I dare you."</p>
          </div>
        </section>

        {/* Right Side: The Story */}
        <section className="lg:col-span-7 space-y-8">
          <div className="flex items-center gap-3">
            <BookOpen className="text-tertiary w-10 h-10" />
            <h2 className="font-headline font-black text-4xl tracking-tighter uppercase italic">The Story</h2>
          </div>

          <div className="bg-white border-4 border-on-background rounded-3xl p-4 sm:p-8 shadow-[8px_8px_0_#0f172a] sm:shadow-[16px_16px_0_#0f172a] min-h-[400px] sm:min-h-[500px] flex flex-col relative overflow-hidden">
            {/* Subtle light glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/2 blur-[100px] rounded-full pointer-events-none"></div>
            {!result && !isAnalyzing && (
              <div className="flex-grow flex items-center justify-center text-on-surface-variant font-headline text-lg italic">
                Waiting for your code...
              </div>
            )}

            {isAnalyzing && (
              <div className="flex-grow flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 border-8 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="font-headline font-bold text-primary animate-pulse">Consulting the math wizards...</p>
              </div>
            )}

            {result && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex flex-col">
                    <span className="font-label text-xs font-bold text-on-surface-variant uppercase tracking-tighter">Growth Metric</span>
                    <span className="font-headline font-bold text-lg">Computational Velocity</span>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center justify-end">
                    <span className="px-3 py-1 bg-surface-container rounded-full text-xs font-bold font-label">Time: {result.complexity}</span>
                    <span className="px-3 py-1 bg-secondary-container rounded-full text-xs font-bold font-label text-on-secondary-container">Space: {result.spaceComplexity}</span>
                    <button 
                      onClick={handleSaveAnalysis}
                      disabled={isSaving || isSaved}
                      className="flex items-center gap-2 px-4 py-1.5 bg-primary text-on-primary rounded-full font-bold text-xs shadow hover:bg-primary/90 disabled:opacity-50 transition-all"
                    >
                      <Save className="w-4 h-4" />
                      {isSaving ? 'Saving...' : isSaved ? 'Saved!' : 'Save Analysis'}
                    </button>
                  </div>
                </div>

                <div className="w-full">
                  <ComplexityCalculator complexityClass={result.complexityClass} />
                </div>

                <div className="mt-12 flex items-start gap-4 z-10">
                  <div className="w-20 h-20 rounded-2xl border-4 border-on-background bg-tertiary-container shadow-[6px_6px_0_#0f172a] flex items-center justify-center shrink-0">
                    <Cpu className="w-10 h-10 text-on-tertiary-container" />
                  </div>
                  <div className="speech-bubble p-4 sm:p-8 rounded-3xl shadow-[6px_6px_0_#0f172a] sm:shadow-[8px_8px_0_#0f172a] bg-white w-full">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="font-headline font-black text-2xl text-primary">{result.complexity}</h3>
                    </div>
                    <ul className="font-body text-on-surface leading-relaxed list-disc list-inside space-y-2">
                      {result.explanationPoints?.map((point, index) => (
                        <li key={index} className="text-sm">{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </div>

      {result && (
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 relative z-10 px-2 sm:px-4">
          <div className="bg-white p-6 sm:p-10 rounded-3xl border-4 border-on-background shadow-[6px_6px_0_rgba(5,150,105,0.15)] sm:shadow-[8px_8px_0_rgba(5,150,105,0.15)] hover:shadow-[10px_10px_0_rgba(5,150,105,0.25)] transition-all group">
            <Cpu className="text-primary mb-4 sm:mb-6 w-10 h-10 sm:w-12 sm:h-12 group-hover:scale-110 transition-transform" />
            <h4 className="font-headline font-black text-xl sm:text-2xl mb-2 uppercase text-on-surface italic">Space Complexity</h4>
            <p className="text-md sm:text-lg text-on-surface-variant font-bold">Your script uses <strong className="text-primary">{result.spaceComplexity}</strong> auxiliary space.</p>
          </div>
          <div className="bg-white p-6 sm:p-10 rounded-3xl border-4 border-on-background shadow-[6px_6px_0_rgba(2,132,199,0.15)] sm:shadow-[8px_8px_0_rgba(2,132,199,0.15)] hover:shadow-[10px_10px_0_rgba(2,132,199,0.25)] transition-all group">
            <Lightbulb className="text-secondary mb-4 w-8 h-8 group-hover:scale-110 transition-transform" />
            <h4 className="font-headline font-bold text-lg mb-2 uppercase">Pro Tip</h4>
            <p className="text-sm text-on-surface-variant font-medium">Keep an eye on nested loops or recursive calls. They are the usual suspects for high complexity!</p>
          </div>
        </div>
      )}

      {/* Common Complexity Classes Section */}
      <section className="mt-32 mb-16 px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="font-headline font-black text-4xl sm:text-5xl tracking-tighter uppercase italic mb-4">
              Common Complexity Classes
            </h2>
            <p className="text-lg text-on-surface-variant font-bold leading-relaxed">
              Every algorithm has its own growth story. Here are the most common computational arcs you'll encounter.
            </p>
          </div>
          <div className="hidden lg:block w-24 h-24 bg-primary rounded-full border-4 border-on-background shadow-[6px_6px_0_#0f172a] animate-bounce"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { tag: 'O(1)', title: 'Constant', desc: 'Array access, hash lookup', color: 'bg-primary', accent: '#059669' },
            { tag: 'O(log n)', title: 'Logarithmic', desc: 'Binary search', color: 'bg-secondary', accent: '#0284c7' },
            { tag: 'O(n)', title: 'Linear', desc: 'Single loop, linear search', color: 'bg-[#f59e0b]', accent: '#f59e0b' },
            { tag: 'O(n log n)', title: 'Linearithmic', desc: 'Merge sort, quick sort', color: 'bg-[#d97706]', accent: '#d97706' },
            { tag: 'O(n²)', title: 'Quadratic', desc: 'Nested loops, bubble sort', color: 'bg-error', accent: '#dc2626' },
            { tag: 'O(2ⁿ)', title: 'Exponential', desc: 'Recursive Fibonacci', color: 'bg-[#991b1b]', accent: '#991b1b' },
          ].map((cls, idx) => (
            <div 
              key={idx} 
              className={`bg-white p-8 rounded-3xl border-4 border-on-background shadow-[8px_8px_0_#0f172a] hover:-translate-y-2 transition-transform cursor-default group ${idx % 2 === 1 ? 'lg:rotate-1' : 'lg:-rotate-1'}`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className={`${cls.color} text-white px-4 py-1.5 rounded-full font-headline font-black text-sm border-2 border-on-background shadow-[3px_3px_0_#0f172a] uppercase`}>
                  {cls.tag}
                </span>
                <Activity className="w-6 h-6 text-on-surface-variant opacity-20 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-headline font-black text-2xl mb-2 text-on-surface uppercase italic tracking-tighter">
                {cls.title}
              </h3>
              <p className="text-on-surface-variant text-sm font-bold leading-relaxed">
                {cls.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
