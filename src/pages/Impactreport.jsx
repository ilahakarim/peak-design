const stats = [
  { number: "100%", label: "Fair Trade Certified Factory" },
  { number: "1M+", label: "Products Made to Last" },
  { number: "0", label: "Landfill-Bound Waste (Goal)" },
];

function ImpactReport() {
  return (
    <div className="px-6 sm:px-10 md:px-16 py-16 max-w-4xl mx-auto">
      <p className="text-[13px] uppercase tracking-widest text-gray-500">Impact Report</p>

      <h1 className="text-[32px] sm:text-[44px] font-serif mt-3">
        Doing business the right way.
      </h1>

      <p className="text-[16px] text-gray-600 mt-6 leading-relaxed max-w-2xl">
        Every year we publish an honest look at our environmental and social
        impact — the progress we've made, and the work still ahead of us.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
        {stats.map((stat) => (
          <div key={stat.label} className="border-t border-gray-200 pt-4">
            <p className="text-[36px] font-serif">{stat.number}</p>
            <p className="text-[14px] text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImpactReport;