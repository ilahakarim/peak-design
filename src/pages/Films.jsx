const films = [
  { title: "Behind the Factory", desc: "A look inside our Fair Trade certified factory in the Philippines." },
  { title: "City Line Launch", desc: "Six new bags, one story — how City Line came to life." },
  { title: "Made for the Field", desc: "Photographers put our camera bags to the test." },
];

function Films() {
  return (
    <div className="px-6 sm:px-10 md:px-16 py-16">
      <p className="text-[13px] uppercase tracking-widest text-gray-500">Films</p>

      <h1 className="text-[32px] sm:text-[44px] font-serif mt-3 mb-10">
        Stories worth watching.
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {films.map((film) => (
          <div key={film.title} className="border border-gray-200 rounded-md p-6">
            <div className="aspect-video bg-gray-100 rounded-md mb-4 flex items-center justify-center text-gray-400 text-sm">
              ▷ Watch
            </div>
            <h3 className="font-medium">{film.title}</h3>
            <p className="text-[14px] text-gray-500 mt-1">{film.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Films;