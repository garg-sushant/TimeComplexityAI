import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import EditorModule from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import { useAuth } from '../contexts/AuthContext';
import { AnalysisResult } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, BookOpen, Cpu, Activity, Lightbulb, Save, Copy, Check, ArrowRight, Sparkles } from 'lucide-react';
import { LazyComplexityCalculator } from '../components/LazyComplexityCalculator';
import Seo from '../components/Seo';
import { homeRouteMetadata, SITE_URL } from '../data/contentMetadata';

const CodeEditor =
  (EditorModule as unknown as { default?: typeof EditorModule }).default ?? EditorModule;

export default function Home() {
  const { user } = useAuth();
  const { pathname } = useLocation();
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
    let cancelled = false;

    const timer = setTimeout(async () => {
      if (code.trim().length > 10) {
        try {
          const { fastCodeHint } = await import('../lib/ai');
          const quickHint = await fastCodeHint(code);
          if (!cancelled) {
            setHint(quickHint);
          }
        } catch (e) {
          console.error(e);
        }
      }
    }, 1500);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [code]);

  const handleAnalyze = async () => {
    if (!code.trim()) return;
    setIsAnalyzing(true);
    setResult(null);
    setIsSaved(false);
    try {
      const { analyzeCodeComplexity } = await import('../lib/ai');
      const res = await analyzeCodeComplexity(code);
      setResult(res);
      setAnalyzedCode(code);
    } catch (error: any) {
      console.error("Analysis failed:", error);
      const msg = (error?.message || '').toLowerCase();
      const isQuotaLike =
        msg.includes('429') ||
        msg.includes('quota') ||
        msg.includes('rate limit') ||
        msg.includes('exhausted');

      if (isQuotaLike) {
        alert("Wait a second! The AI wizards are overwhelmed. Please wait a minute and try again (quota/rate limit).");
        return;
      }

      const status = error?.status ? `(${error.status}) ` : '';
      const message = error?.message || 'Unknown error';
      alert(`Failed to analyze code. ${status}${message.substring(0, 100)}${message.length > 100 ? '...' : ''}`);
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
      const [{ db }, firestore] = await Promise.all([
        import('../lib/firebase'),
        import('firebase/firestore'),
      ]);

      await firestore.addDoc(firestore.collection(db, 'users', user.uid, 'analyses'), {
        code: analyzedCode,
        complexity: result.complexity,
        complexityClass: result.complexityClass,
        spaceComplexity: result.spaceComplexity,
        explanationPoints: result.explanationPoints,
        createdAt: firestore.serverTimestamp()
      });
      setIsSaved(true);
    } catch (error) {
      console.error("Error saving analysis:", error);
      alert("Failed to save analysis.");
    } finally {
      setIsSaving(false);
    }
  };

  const pageSeo =
    homeRouteMetadata[pathname as keyof typeof homeRouteMetadata] ?? homeRouteMetadata['/'];
  const pagePath = pathname || '/';
  const isTimeCalculator = pagePath === '/time-complexity-calculator';
  const isSpaceCalculator = pagePath === '/space-complexity-calculator';
  const isServer = typeof window === 'undefined';
  const pageLead = isSpaceCalculator
    ? 'Useful for queries like space complexity calc, auxiliary space calculator, and memory complexity analyzer.'
    : isTimeCalculator
      ? 'Useful if you are searching for a time complexity calc, Big O calculator, runtime complexity analyzer, or code complexity calculator.'
      : 'Use AlgoStory as a learning hub for calculators, Big O explainers, tutorials, and algorithm breakdowns.';

  const processTitle = isSpaceCalculator
    ? 'How This Space Complexity Calculator Works'
    : isTimeCalculator
      ? 'How This Time Complexity Calculator Works'
      : 'How AlgoStory Helps You Learn Complexity';
  const processIntro = isSpaceCalculator
    ? 'Estimate auxiliary memory growth, recursion stack usage, and temporary storage from real code.'
    : isTimeCalculator
      ? 'Paste code, inspect loops and recursion, and turn runtime growth into a readable Big O explanation.'
      : 'Move from quick answers to deeper understanding with calculators, articles, and guided tutorials.';
  const processSteps = isSpaceCalculator
    ? [
        {
          title: 'Paste Code',
          description: 'Drop in Python, JavaScript, Java, C, or C++ code that allocates arrays, maps, stacks, or recursive calls.',
          icon: <Copy className="w-5 h-5" />,
        },
        {
          title: 'Inspect Memory Growth',
          description: 'The analyzer looks for auxiliary arrays, recursion depth, and data structures that grow with input size.',
          icon: <Cpu className="w-5 h-5" />,
        },
        {
          title: 'Read The Tradeoff',
          description: 'Get a clearer view of how time and space interact so you can compare implementations more confidently.',
          icon: <Lightbulb className="w-5 h-5" />,
        },
      ]
    : isTimeCalculator
      ? [
          {
            title: 'Paste Code',
            description: 'Use Python, JavaScript, Java, C, or C++ snippets that you want to estimate quickly.',
            icon: <Copy className="w-5 h-5" />,
          },
          {
            title: 'Trace Loops And Recursion',
            description: 'The calculator checks iteration depth, repeated work, divide-and-conquer patterns, and built-in operations.',
            icon: <Activity className="w-5 h-5" />,
          },
          {
            title: 'Get Big O',
            description: 'Read the estimated runtime class, then follow the explanation to see why the growth rate fits.',
            icon: <Zap className="w-5 h-5" />,
          },
        ]
      : [
          {
            title: 'Analyze',
            description: 'Use the free calculators for fast feedback on runtime and memory behavior.',
            icon: <Zap className="w-5 h-5" />,
          },
          {
            title: 'Understand',
            description: 'Use the math lab and tutorials to connect loops, recursion, and data structures to Big O.',
            icon: <BookOpen className="w-5 h-5" />,
          },
          {
            title: 'Apply',
            description: 'Carry the patterns into interviews, coursework, and production code reviews.',
            icon: <Lightbulb className="w-5 h-5" />,
          },
        ];
  const faqItems = isSpaceCalculator
    ? [
        {
          q: 'What does this space complexity calculator measure?',
          a: 'It estimates auxiliary memory growth, including temporary arrays, maps, recursion stack usage, and other input-dependent storage.',
          icon: <Cpu className="w-5 h-5" />,
        },
        {
          q: 'Does it include recursion stack and helper data structures?',
          a: 'Yes. The goal is to explain both explicit allocations and implicit memory growth from recursion depth and support structures.',
          icon: <Activity className="w-5 h-5" />,
        },
        {
          q: 'Can I compare time and space complexity together?',
          a: 'Yes. The calculator and linked guides are meant to help you compare runtime efficiency against memory tradeoffs.',
          icon: <Lightbulb className="w-5 h-5" />,
        },
      ]
    : isTimeCalculator
      ? [
          {
            q: 'What does this time complexity calculator analyze?',
            a: 'It estimates how runtime grows with input size by looking at loops, nested loops, recursion, and common operations in your code.',
            icon: <Zap className="w-5 h-5" />,
          },
          {
            q: 'Is this also a Big O calculator?',
            a: 'Yes. If you searched for a Big O calculator or time complexity calc, this page is designed for that exact use case.',
            icon: <Activity className="w-5 h-5" />,
          },
          {
            q: 'Can I use this time complexity calc for Python, JavaScript, Java, C, and C++?',
            a: 'Yes. The interface is built around those languages so you can estimate runtime complexity across common interview and coursework code.',
            icon: <BookOpen className="w-5 h-5" />,
          },
        ]
      : [
          {
            q: 'When should I use the time complexity calculator?',
            a: 'Use it when you want to estimate how runtime changes as input size grows, especially for loops, recursion, and repeated work.',
            icon: <Zap className="w-5 h-5" />,
          },
          {
            q: 'When should I use the space complexity calculator?',
            a: 'Use it when memory growth matters, including recursion stack depth, temporary arrays, maps, and helper data structures.',
            icon: <Cpu className="w-5 h-5" />,
          },
          {
            q: 'Can I learn Big O here as well?',
            a: 'Yes. AlgoStory combines calculators with tutorials, blog explainers, and a step-by-step lab so you can move from answer to understanding.',
            icon: <Lightbulb className="w-5 h-5" />,
          },
        ];

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: isSpaceCalculator
        ? 'AlgoStory Space Complexity Calculator'
        : isTimeCalculator
          ? 'AlgoStory Time Complexity Calculator'
          : 'AlgoStory Code Complexity Analyzer',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Any',
      url: `${SITE_URL}${pagePath === '/' ? '' : pagePath}`,
      description: pageSeo.description,
      offers: {
        '@type': 'Offer',
        price: '0',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    },
  ];

  return (
    <div className="graph-paper min-h-screen">
      <Seo
        title={pageSeo.title}
        description={pageSeo.description}
        path={pagePath}
        keywords={
          isSpaceCalculator
            ? 'space complexity calculator, space complexity calc, auxiliary space calculator, memory complexity analyzer, big o space complexity'
            : isTimeCalculator
              ? 'time complexity calculator, time complexity calc, big o calculator, big o calc, runtime complexity analyzer, code complexity calculator'
              : 'algostory, code complexity analyzer, big o notation, algorithm tutorials, time complexity calculator, space complexity calculator'
        }
        schema={schema}
      />

      <div className="mb-16 text-center max-w-4xl mx-auto space-y-6 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-headline font-black text-5xl sm:text-6xl md:text-8xl tracking-tight leading-[1] md:leading-[0.95]"
        >
          {pagePath === '/' ? (
            <>
              Every line of code{' '}
              <span className="modern-gradient-text italic underline decoration-8 md:decoration-[14px] decoration-primary/10 underline-offset-8">
                tells a story.
              </span>
            </>
          ) : (
            <>
              {pageSeo.heading.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="modern-gradient-text italic underline decoration-8 md:decoration-[14px] decoration-primary/10 underline-offset-8">
                {pageSeo.heading.split(' ').slice(-1)}
              </span>
            </>
          )}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-2xl text-on-surface-variant font-bold max-w-3xl mx-auto leading-relaxed"
        >
          {pageSeo.intro}
        </motion.p>
        <p className="mx-auto max-w-3xl text-sm font-bold uppercase tracking-wider text-on-surface-variant/70">
          {pageLead}
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: The Lab */}
        <motion.section 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-8"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-container rounded-2xl border-2 border-on-background shadow-neo">
              <Activity className="text-primary w-8 h-8" />
            </div>
            <h2 className="font-headline font-black text-3xl tracking-tighter uppercase italic">The Lab</h2>
          </div>

          <div className="relative group px-1 sm:px-0">
            <div className="bg-[#0f172a] rounded-[2.5rem] overflow-hidden border-2 border-on-background shadow-neo-lg sm:shadow-neo-xl transition-all group-hover:shadow-neo group-hover:translate-x-1 group-hover:translate-y-1">
              <div className="flex items-center justify-between px-6 py-4 bg-on-background/20 border-b border-white/10">
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
                {isServer ? (
                  <pre className="overflow-auto p-6 text-sm text-white">
                    <code>{code}</code>
                  </pre>
                ) : (
                  <CodeEditor
                    value={code}
                    onValueChange={code => setCode(code)}
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
            {hint && (
              <div className="absolute -bottom-4 right-4 bg-tertiary-container text-on-tertiary-container px-4 py-2 rounded-lg font-label text-xs font-bold shadow-lg transform rotate-2 z-10">
                💡 {hint}
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-6 py-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="bg-primary text-white w-44 h-44 sm:w-56 sm:h-56 rounded-[3rem] flex flex-col items-center justify-center gap-3 border-2 sm:border-4 border-on-primary-container shadow-neo-lg sm:shadow-neo-xl hover:translate-y-1 hover:shadow-neo active:translate-y-2 active:shadow-none transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <Zap className={`w-14 h-14 ${isAnalyzing ? 'animate-bounce' : 'group-hover:rotate-12 transition-transform'}`} />
              <span className="font-headline font-black text-center px-4 leading-none uppercase text-sm sm:text-base tracking-tighter">
                {isAnalyzing ? 'Decoding...' : 'Analyze Story'}
              </span>
            </motion.button>
            <div className="flex items-center gap-2 font-label text-on-surface-variant text-sm font-black tracking-widest uppercase italic opacity-60">
              <Sparkles className="w-4 h-4" />
              <span>Push it. I dare you.</span>
            </div>
          </div>
        </motion.section>

        {/* Right Side: The Story */}
        <motion.section 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-8"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary-container rounded-2xl border-2 border-on-background shadow-neo">
              <BookOpen className="text-secondary w-8 h-8" />
            </div>
            <h2 className="font-headline font-black text-3xl tracking-tighter uppercase italic">The Story</h2>
          </div>

          <div className="bg-white border-2 border-on-background rounded-[2.5rem] p-5 sm:p-10 shadow-neo-lg sm:shadow-neo-xl min-h-[400px] sm:min-h-[500px] flex flex-col relative overflow-hidden group">
            {/* Subtle light glow effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-primary/10 transition-colors"></div>
            
            <AnimatePresence mode="wait">
              {!result && !isAnalyzing ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-grow flex flex-col items-center justify-center text-on-surface-variant font-headline text-lg italic gap-4"
                >
                  <div className="p-4 bg-surface-container rounded-3xl opacity-20">
                    <Sparkles className="w-12 h-12" />
                  </div>
                  <span className="opacity-40">"Your code is a blank page. Let's write the story."</span>
                </motion.div>
              ) : isAnalyzing ? (
                <motion.div 
                  key="analyzing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-grow flex flex-col items-center justify-center gap-6"
                >
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-primary/20 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <Activity className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary w-8 h-8 animate-pulse" />
                  </div>
                  <p className="font-headline font-black text-primary uppercase tracking-tighter animate-pulse text-xl">Consulting the math wizards...</p>
                </motion.div>
              ) : result ? (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-grow flex flex-col h-full"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div className="flex flex-col">
                      <span className="font-label text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-60">Growth Metric</span>
                      <span className="font-headline font-black text-xl italic uppercase tracking-tighter">Computational Velocity</span>
                    </div>
                    <div className="flex flex-wrap gap-3 items-center">
                      <div className="px-4 py-2 bg-primary-container border-2 border-on-background rounded-full text-xs font-black font-label shadow-neo">
                        Time: {result.complexityClass}
                      </div>
                      <button 
                        onClick={handleSaveAnalysis}
                        disabled={isSaving || isSaved}
                        className="flex items-center gap-2 px-6 py-2 bg-tertiary text-white rounded-full font-black text-xs shadow-neo border-2 border-on-background hover:translate-y-0.5 hover:shadow-none transition-all disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        {isSaving ? 'Saving...' : isSaved ? 'Saved!' : 'Save Analysis'}
                      </button>
                    </div>
                  </div>

                  <div className="w-full mb-10">
                    <LazyComplexityCalculator complexityClass={result.complexityClass} />
                  </div>

                  <div className="mt-auto flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-8 border-t-2 border-on-background/5">
                    <div className="w-20 h-20 rounded-3xl border-2 border-on-background bg-secondary-container shadow-neo flex items-center justify-center shrink-0">
                      <Cpu className="w-10 h-10 text-on-secondary-container" />
                    </div>
                    <div className="p-6 bg-surface-container-low border-2 border-on-background rounded-[2rem] shadow-neo w-full relative">
                      <div className="absolute -top-3 -left-3 bg-primary text-white p-2 rounded-xl border-2 border-on-background shadow-neo rotate-[-6deg]">
                        <Lightbulb className="w-4 h-4" />
                      </div>
                      <h3 className="font-headline font-black text-2xl text-primary mb-4 italic uppercase tracking-tighter">
                        {result.complexity}
                      </h3>
                      <ul className="font-body text-on-surface leading-relaxed space-y-3 list-none">
                        {result.explanationPoints?.map((point, index) => (
                          <li key={index} className="text-sm font-bold flex gap-3 items-start">
                            <span className="text-primary mt-1 flex-shrink-0">●</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.section>
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

      <section className="mt-24 mb-20 rounded-[3rem] border-2 border-on-background bg-white px-8 py-14 shadow-neo-xl">
        <div className="mb-10 max-w-3xl">
          <h2 className="mb-4 font-headline text-4xl sm:text-5xl font-black uppercase italic tracking-tighter">
            {processTitle}
          </h2>
          <p className="text-lg font-bold leading-relaxed text-on-surface-variant opacity-80">
            {processIntro}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {processSteps.map((step) => (
            <article
              key={step.title}
              className="rounded-[2rem] border-2 border-on-background bg-surface-container-low p-6 shadow-neo"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-on-background bg-white text-primary shadow-neo">
                {step.icon}
              </div>
              <h3 className="mb-3 font-headline text-2xl font-black uppercase italic tracking-tighter">
                {step.title}
              </h3>
              <p className="text-sm font-bold leading-relaxed text-on-surface-variant opacity-80">
                {step.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {['Python', 'JavaScript', 'Java', 'C', 'C++'].map((language) => (
            <span
              key={language}
              className="rounded-full border-2 border-on-background bg-primary-container px-4 py-2 text-xs font-black uppercase tracking-widest text-on-background shadow-neo"
            >
              {language}
            </span>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-sm font-bold leading-relaxed text-on-surface-variant">
          {isSpaceCalculator
            ? 'This page is built for space complexity queries, but it also works best when paired with the time complexity calculator so you can compare speed against memory usage.'
            : isTimeCalculator
              ? 'This page is designed to match tool intent. If someone searches for a Big O calculator, time complexity calc, or runtime complexity analyzer, the goal is to answer that need directly on this URL.'
              : 'The homepage is the overview. For search intent that is specifically tool-driven, the main target page is the time complexity calculator.'}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/blog/how-to-calculate-time-complexity"
            className="inline-flex items-center gap-2 rounded-full border-2 border-on-background bg-white px-5 py-3 text-xs font-black uppercase tracking-widest shadow-neo"
          >
            How To Calculate Time Complexity
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/blog/big-o-notation-explained"
            className="inline-flex items-center gap-2 rounded-full border-2 border-on-background bg-secondary-container px-5 py-3 text-xs font-black uppercase tracking-widest shadow-neo"
          >
            Read The Big O Guide
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Common Complexity Classes Section */}
      <section className="mt-32 mb-16 px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl text-center md:text-left"
          >
            <h2 className="font-headline font-black text-4xl sm:text-6xl tracking-tighter uppercase italic mb-6">
              Common <span className="modern-gradient-text">{isTimeCalculator ? 'Big O' : 'Complexity'}</span> Classes
            </h2>
            <p className="text-xl text-on-surface-variant font-bold leading-relaxed opacity-80">
              {isSpaceCalculator
                ? 'These patterns help you compare how memory grows, especially when recursion, auxiliary arrays, and data structures are involved.'
                : isTimeCalculator
                  ? 'These are the runtime growth patterns a time complexity calculator usually maps to when it sees loops, recursion, and divide-and-conquer structure.'
                  : 'Every algorithm has its own growth story. Here are the most common computational arcs you will encounter in the wild.'}
            </p>
          </motion.div>
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="hidden lg:flex w-28 h-28 bg-primary rounded-[2rem] border-2 border-on-background shadow-neo-lg items-center justify-center"
          >
            <Sparkles className="w-12 h-12 text-white animate-pulse" />
          </motion.div>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            { tag: 'O(1)', title: 'Constant', desc: 'Array access, hash lookup', color: 'bg-primary' },
            { tag: 'O(log n)', title: 'Logarithmic', desc: 'Binary searching', color: 'bg-secondary' },
            { tag: 'O(n)', title: 'Linear', desc: 'Single loop, linear search', color: 'bg-[#f59e0b]' },
            { tag: 'O(n log n)', title: 'Linearithmic', desc: 'Merge sort, quick sort', color: 'bg-[#d97706]' },
            { tag: 'O(n²)', title: 'Quadratic', desc: 'Nested loops, bubble sort', color: 'bg-error' },
            { tag: 'O(2ⁿ)', title: 'Exponential', desc: 'Recursive Fibonacci', color: 'bg-[#991b1b]' },
          ].map((cls, idx) => (
            <motion.div 
              key={idx} 
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white p-10 rounded-[2.5rem] border-2 border-on-background shadow-neo-lg transition-all cursor-default group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-on-background/5 blur-3xl rounded-full -mr-10 -mt-10 group-hover:bg-primary/5 transition-colors"></div>
              
              <div className="flex items-center justify-between mb-8 relative z-10">
                <span className={`${cls.color} text-white px-5 py-2 rounded-full font-headline font-black text-xs border-2 border-on-background shadow-neo uppercase tracking-tighter`}>
                  {cls.tag}
                </span>
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center opacity-40 group-hover:opacity-100 transition-all border border-on-background/10">
                  <Activity className="w-5 h-5 text-on-surface-variant" />
                </div>
              </div>
              
              <h3 className="font-headline font-black text-2xl mb-3 text-on-surface uppercase italic tracking-tighter relative z-10 group-hover:text-primary transition-colors">
                {cls.title}
              </h3>
              <p className="text-on-surface-variant text-sm font-bold leading-relaxed opacity-70 relative z-10">
                {cls.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="mb-16 pt-16 border-t-2 border-on-background/10">
        <div className="text-center mb-16 px-4">
          <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-black text-on-background mb-4 uppercase italic tracking-tighter">
            {isSpaceCalculator ? 'The ' : 'The '}
            <span className="text-primary italic">
              {isSpaceCalculator
                ? 'Free Space Complexity'
                : isTimeCalculator
                  ? 'Free Time Complexity'
                  : 'Free Complexity'}
            </span>{' '}
            {isSpaceCalculator
              ? 'Calculator'
              : isTimeCalculator
                ? 'Calculator'
                : 'Storyteller'}
          </h2>
          <p className="text-xl text-on-surface-variant max-w-2xl mx-auto font-bold opacity-80">
            {isSpaceCalculator
              ? 'Estimate memory growth, auxiliary storage, and recursion stack usage without signing up.'
              : isTimeCalculator
                ? 'Estimate runtime growth, compare Big O classes, and understand why the code scales the way it does.'
                : 'AlgoStory provides deep computational insights for free. Every algorithm deserves its narrative.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <FeatureItem 
            icon={<Zap className="w-8 h-8 text-primary" />}
            title="Time Complexity Analyzer"
            desc="Instantly analyze O(N), O(log N), O(N²) and more patterns in your code. Get Big O notation with AI explanations."
            color="bg-primary-container"
          />
          <FeatureItem 
            icon={<Cpu className="w-8 h-8 text-secondary" />}
            title="Space Complexity Calculator"
            desc="Calculate auxiliary space and memory usage of your algorithms. Analyze O notation with AI-powered insights."
            color="bg-secondary-container"
          />
          <FeatureItem 
            icon={<Lightbulb className="w-8 h-8 text-tertiary" />}
            title="AI-Powered Insights"
            desc="Get natural language explanations of complexity patterns. Understand algorithm efficiency in plain English."
            color="bg-tertiary-container"
          />
          <FeatureItem 
            icon={<BookOpen className="w-8 h-8 text-error" />}
            title="Master Big O Notation"
            desc="Master algorithm complexity with 16+ interactive tutorials. From linear search to dynamic programming."
            color="bg-error-container"
          />
        </div>
      </section>

      <section className="mb-24 glass-panel p-8 sm:p-16 rounded-[3rem] border-2 border-on-background shadow-neo-xl">
        <h2 className="font-headline text-3xl sm:text-5xl font-black text-on-background text-center mb-16 italic uppercase tracking-tighter">
          Why Choose <span className="modern-gradient-text">AlgoStory</span>?
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-on-background/10">
                <th className="text-left p-6 font-headline font-black text-xl text-on-background uppercase tracking-tight">Feature</th>
                <th className="text-center p-6 font-headline font-black text-xl text-primary bg-primary/5 rounded-t-3xl">AlgoStory</th>
                <th className="text-center p-6 font-headline font-black text-xl text-on-surface-variant opacity-40 italic">Others</th>
              </tr>
            </thead>
            <tbody className="font-body font-bold text-base">
              {[
                { f: 'AI-Powered Explanations', val: true },
                { f: 'Space Complexity Labs', val: true },
                { f: '16+ Deep-Dive Tutorials', val: true },
                { f: 'Step-by-Step Breakdowns', val: true },
                { f: 'Free & Clean UI', val: true },
              ].map((row, i) => (
                <tr key={i} className="border-b border-on-background/5 hover:bg-on-background/[0.02] transition-colors">
                  <td className="p-6 text-on-background">{row.f}</td>
                  <td className="text-center p-6 bg-primary/[0.02]"><Check className="mx-auto text-primary w-6 h-6" /></td>
                  <td className="text-center p-6 opacity-20">---</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-24 rounded-[3rem] border-2 border-on-background bg-white px-8 py-16 shadow-neo-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-tertiary/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-tertiary/10 transition-colors"></div>
        
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between relative z-10">
          <div className="max-w-2xl">
            <h2 className="mb-4 font-headline text-4xl sm:text-6xl font-black uppercase italic tracking-tighter">
              Learn The Patterns
            </h2>
            <p className="text-lg font-bold leading-relaxed text-on-surface-variant opacity-80">
              Go beyond the calculator. These deep-dive guides connect theory to the lines of code you write every day.
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3 relative z-10">
          <LinkCard 
            to="/tutorials"
            icon={<BookOpen className="w-10 h-10 text-primary" />}
            title="Tutorials"
            desc="Crawlable guides on binary search, merge sort, graphs, and dynamic programming."
            color="bg-primary-container"
            action="Browse Guides"
          />
          <LinkCard 
            to="/inside-math"
            icon={<Cpu className="w-10 h-10 text-secondary" />}
            title="Math Lab"
            desc="Use the step-by-step analyzer to understand where each complexity term comes from."
            color="bg-secondary-container"
            action="Enter Lab"
          />
          <LinkCard 
            to="/blog"
            icon={<Activity className="w-10 h-10 text-tertiary" />}
            title="The Blog"
            desc="Read focused explainers on Big O notation, Bubble Sort, and Merge Sort theory."
            color="bg-tertiary-container"
            action="Read Articles"
          />
        </div>
      </section>

      <section className="mb-20 px-4">
        <div className="mb-12 max-w-3xl">
          <h2 className="mb-4 font-headline text-4xl font-black uppercase italic tracking-tighter">
            {isSpaceCalculator
              ? 'Space Complexity Calculator FAQ'
              : isTimeCalculator
                ? 'Time Complexity Calculator FAQ'
                : 'Complexity FAQ'}
          </h2>
          <p className="text-lg font-bold text-on-surface-variant opacity-80">
            {isSpaceCalculator
              ? 'Answers to common questions about memory growth, auxiliary space, and how to use this page.'
              : isTimeCalculator
                ? 'Answers to common questions about Big O, runtime growth, and using this time complexity calculator.'
                : 'Answers to common questions about algorithmic complexity and how to use our toolkit.'}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {faqItems.map((item, idx) => (
            <motion.article
              key={idx}
              whileHover={{ y: -5 }}
              className="rounded-[2.5rem] border-2 border-on-background bg-white p-8 shadow-neo-lg"
            >
              <div className="w-10 h-10 bg-surface-container rounded-xl flex items-center justify-center mb-6 border border-on-background/5 shadow-neo text-primary">
                {item.icon}
              </div>
              <h3 className="mb-4 font-headline text-2xl font-black leading-tight tracking-tight uppercase italic">{item.q}</h3>
              <p className="text-sm font-bold leading-relaxed text-on-surface-variant opacity-70">{item.a}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}

function FeatureItem({ icon, title, desc, color }: { icon: React.ReactNode, title: string, desc: string, color: string }) {
  return (
    <div className={`${color} p-8 rounded-[2.5rem] border-2 border-on-background shadow-neo-lg hover:shadow-neo transition-all group`}>
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-white border-2 border-on-background rounded-2xl shadow-neo group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="font-headline font-black text-xl text-on-background tracking-tight italic uppercase">{title}</h3>
      </div>
      <p className="text-on-surface-variant font-bold opacity-80 leading-relaxed">{desc}</p>
    </div>
  );
}

function LinkCard({ to, icon, title, desc, color, action }: { to: string, icon: React.ReactNode, title: string, desc: string, color: string, action: string }) {
  return (
    <Link
      to={to}
      className={`${color} rounded-[2.5rem] border-2 border-on-background p-8 shadow-neo-lg transition-all hover:translate-y-[-4px] hover:shadow-neo-xl group`}
    >
      <div className="mb-6 h-14 w-14 bg-white border-2 border-on-background rounded-2xl flex items-center justify-center shadow-neo group-hover:rotate-6 transition-transform">
        {icon}
      </div>
      <h3 className="mb-3 font-headline text-3xl font-black italic uppercase tracking-tighter">{title}</h3>
      <p className="mb-6 text-sm font-bold leading-relaxed text-on-surface-variant opacity-80">
        {desc}
      </p>
      <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-on-background group-hover:text-primary transition-colors">
        {action}
        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
      </span>
    </Link>
  );
}
