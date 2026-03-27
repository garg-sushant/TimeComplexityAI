import React, { useState, useMemo } from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { Gauge } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const ComplexityCalculator = ({ complexityClass }: { complexityClass: string }) => {
  const [n, setN] = useState<number>(10);

  const calculateOperations = (n: number, type: string) => {
    switch (type) {
      case 'O(1)': return 1;
      case 'O(log N)': return Math.max(1, Math.ceil(Math.log2(n)));
      case 'O(N)': return n;
      case 'O(N log N)': return Math.ceil(n * Math.log2(n));
      case 'O(N^2)': return n * n;
      case 'O(2^N)': return Math.pow(2, Math.min(n, 50)); // Cap to avoid infinity
      case 'O(N!)': {
        let fact = 1;
        for (let i = 2; i <= Math.min(n, 18); i++) fact *= i; // Cap to avoid infinity
        return fact;
      }
      default: return n;
    }
  };

  const ops = calculateOperations(n, complexityClass);

  const chartData = useMemo(() => {
    const data = [];
    const step = Math.max(1, Math.floor(n / 20)); // Generate around 20 points
    for (let i = 1; i <= n; i += step) {
      data.push({
        n: i,
        operations: calculateOperations(i, complexityClass)
      });
    }
    // Ensure the last point is exactly n
    if (n > 0 && (data.length === 0 || data[data.length - 1].n !== n)) {
      data.push({
        n: n,
        operations: calculateOperations(n, complexityClass)
      });
    }
    return data;
  }, [n, complexityClass]);

  return (
    <div className="bg-white p-4 sm:p-8 rounded-3xl border-4 border-on-background my-4 sm:my-8 shadow-[6px_6px_0_rgba(5,150,105,0.1)] sm:shadow-[8px_8px_0_rgba(5,150,105,0.1)] w-full">
      <h4 className="font-headline font-black text-xl sm:text-2xl mb-4 sm:mb-6 text-primary flex items-center gap-3 italic uppercase tracking-tighter">
        <Gauge className="w-6 h-6 sm:w-8 sm:h-8" /> Interactive Lab Metrics
      </h4>
      <p className="text-md sm:text-lg text-on-surface-variant mb-6 sm:mb-8 font-bold">
        Adjust the input size <InlineMath math="N" /> to see how the number of operations grows for <InlineMath math={complexityClass.replace('O(', '\\mathcal{O}(')} />.
      </p>
      
      <div className="flex flex-col xl:flex-row gap-10 items-start">
        <div className="w-full xl:w-1/2 space-y-8">
          <div className="flex items-center gap-6">
            <label className="font-label font-black text-sm uppercase tracking-widest text-on-surface-variant">Input Size (N):</label>
            <input 
              type="range" 
              min="1" 
              max="1000" 
              value={n} 
              onChange={(e) => setN(parseInt(e.target.value))}
              className="flex-grow accent-primary h-3 bg-surface-container rounded-lg appearance-none cursor-pointer"
            />
            <input 
              type="number" 
              min="1" 
              value={n} 
              onChange={(e) => setN(parseInt(e.target.value) || 1)}
              className="w-28 px-4 py-2 rounded-xl border-4 border-on-background bg-white text-on-background font-mono font-bold text-lg shadow-[4px_4px_0_#0f172a]"
            />
          </div>
          <div className="bg-primary/5 p-4 sm:p-6 rounded-2xl border-4 border-primary/20 flex justify-between items-center shadow-inner">
            <span className="font-headline font-black text-[10px] sm:text-sm uppercase tracking-widest text-primary">Estimated Ops:</span>
            <span className="font-mono font-black text-xl sm:text-3xl text-primary truncate ml-2">
              {ops > 1e15 ? 'INF 🚀' : ops.toLocaleString()}
            </span>
          </div>
        </div>
        
        <div className="w-full xl:w-1/2 h-64 bg-white rounded-2xl p-4 border-4 border-on-background shadow-[8px_8px_0_rgba(15,23,42,0.05)]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="n" 
                tick={{ fontSize: 12, fontWeight: 'bold', fill: '#475569' }} 
                tickFormatter={(val) => `N=${val}`}
              />
              <YAxis 
                tick={{ fontSize: 12, fontWeight: 'bold', fill: '#475569' }} 
                tickFormatter={(val) => val > 1000 ? `${(val/1000).toFixed(1)}k` : val}
                width={50}
              />
              <Tooltip 
                formatter={(value: number) => [value.toLocaleString(), 'Operations']}
                labelFormatter={(label) => `Input Size (N): ${label}`}
                contentStyle={{ borderRadius: '16px', fontSize: '14px', fontWeight: 'bold', border: '4px solid #0f172a', boxShadow: '8px 8px 0 #0f172a' }}
              />
              <Line 
                type="monotone" 
                dataKey="operations" 
                stroke="#059669" 
                strokeWidth={5} 
                dot={false}
                activeDot={{ r: 8, fill: '#059669', stroke: '#ffffff', strokeWidth: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
