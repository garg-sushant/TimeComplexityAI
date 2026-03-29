import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import * as ReactKatex from "react-katex";
import { Gauge } from "lucide-react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts";
const ComplexityCalculator = ({ complexityClass }) => {
  const [n, setN] = useState(10);
  const calculateOperations = (n2, type) => {
    switch (type) {
      case "O(1)":
        return 1;
      case "O(log N)":
        return Math.max(1, Math.ceil(Math.log2(n2)));
      case "O(N)":
        return n2;
      case "O(N log N)":
        return Math.ceil(n2 * Math.log2(n2));
      case "O(N^2)":
        return n2 * n2;
      case "O(2^N)":
        return Math.pow(2, Math.min(n2, 50));
      // Cap to avoid infinity
      case "O(N!)": {
        let fact = 1;
        for (let i = 2; i <= Math.min(n2, 18); i++) fact *= i;
        return fact;
      }
      default:
        return n2;
    }
  };
  const ops = calculateOperations(n, complexityClass);
  const chartData = useMemo(() => {
    const data = [];
    const step = Math.max(1, Math.floor(n / 20));
    for (let i = 1; i <= n; i += step) {
      data.push({
        n: i,
        operations: calculateOperations(i, complexityClass)
      });
    }
    if (n > 0 && (data.length === 0 || data[data.length - 1].n !== n)) {
      data.push({
        n,
        operations: calculateOperations(n, complexityClass)
      });
    }
    return data;
  }, [n, complexityClass]);
  return /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 sm:p-8 rounded-3xl border-4 border-on-background my-4 sm:my-8 shadow-[6px_6px_0_rgba(5,150,105,0.1)] sm:shadow-[8px_8px_0_rgba(5,150,105,0.1)] w-full", children: [
    /* @__PURE__ */ jsxs("h4", { className: "font-headline font-black text-xl sm:text-2xl mb-4 sm:mb-6 text-primary flex items-center gap-3 italic uppercase tracking-tighter", children: [
      /* @__PURE__ */ jsx(Gauge, { className: "w-6 h-6 sm:w-8 sm:h-8" }),
      " Interactive Lab Metrics"
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "text-md sm:text-lg text-on-surface-variant mb-6 sm:mb-8 font-bold", children: [
      "Adjust the input size ",
      /* @__PURE__ */ jsx(ReactKatex.InlineMath, { math: "N" }),
      " to see how the number of operations grows for ",
      /* @__PURE__ */ jsx(ReactKatex.InlineMath, { math: complexityClass.replace("O(", "\\mathcal{O}(") }),
      "."
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col xl:flex-row gap-10 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-full xl:w-1/2 space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
          /* @__PURE__ */ jsx("label", { className: "font-label font-black text-sm uppercase tracking-widest text-on-surface-variant", children: "Input Size (N):" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "range",
              min: "1",
              max: "1000",
              value: n,
              onChange: (e) => setN(parseInt(e.target.value)),
              className: "flex-grow accent-primary h-3 bg-surface-container rounded-lg appearance-none cursor-pointer"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              min: "1",
              value: n,
              onChange: (e) => setN(parseInt(e.target.value) || 1),
              className: "w-28 px-4 py-2 rounded-xl border-4 border-on-background bg-white text-on-background font-mono font-bold text-lg shadow-[4px_4px_0_#0f172a]"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-primary/5 p-4 sm:p-6 rounded-2xl border-4 border-primary/20 flex justify-between items-center shadow-inner", children: [
          /* @__PURE__ */ jsx("span", { className: "font-headline font-black text-[10px] sm:text-sm uppercase tracking-widest text-primary", children: "Estimated Ops:" }),
          /* @__PURE__ */ jsx("span", { className: "font-mono font-black text-xl sm:text-3xl text-primary truncate ml-2", children: ops > 1e15 ? "INF 🚀" : ops.toLocaleString() })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full xl:w-1/2 h-64 bg-white rounded-2xl p-4 border-4 border-on-background shadow-[8px_8px_0_rgba(15,23,42,0.05)]", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(LineChart, { data: chartData, margin: { top: 5, right: 10, left: 0, bottom: 5 }, children: [
        /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e2e8f0" }),
        /* @__PURE__ */ jsx(
          XAxis,
          {
            dataKey: "n",
            tick: { fontSize: 12, fontWeight: "bold", fill: "#475569" },
            tickFormatter: (val) => `N=${val}`
          }
        ),
        /* @__PURE__ */ jsx(
          YAxis,
          {
            tick: { fontSize: 12, fontWeight: "bold", fill: "#475569" },
            tickFormatter: (val) => val > 1e3 ? `${(val / 1e3).toFixed(1)}k` : val,
            width: 50
          }
        ),
        /* @__PURE__ */ jsx(
          Tooltip,
          {
            formatter: (value) => [value.toLocaleString(), "Operations"],
            labelFormatter: (label) => `Input Size (N): ${label}`,
            contentStyle: { borderRadius: "16px", fontSize: "14px", fontWeight: "bold", border: "4px solid #0f172a", boxShadow: "8px 8px 0 #0f172a" }
          }
        ),
        /* @__PURE__ */ jsx(
          Line,
          {
            type: "monotone",
            dataKey: "operations",
            stroke: "#059669",
            strokeWidth: 5,
            dot: false,
            activeDot: { r: 8, fill: "#059669", stroke: "#ffffff", strokeWidth: 4 }
          }
        )
      ] }) }) })
    ] })
  ] });
};
export {
  ComplexityCalculator
};
