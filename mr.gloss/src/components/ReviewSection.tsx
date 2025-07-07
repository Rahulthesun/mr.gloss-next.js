const reviews = [
    { text: 'ReactBits.dev is 🔥', author: '@reactwizard' },
    { text: 'Perfect for rapid prototyping!', author: '@frontendfox' },
    { text: 'So clean, so reusable.', author: '@uijunkie' },
    { text: 'Minimal and beautiful UI bits.', author: '@designgeek' },
    { text: 'Loved the spotlight card effect!', author: '@nextlover' },
    { text: 'Saves me hours every week.', author: '@timesaverdev' },
    { text: 'Looks like magic ✨', author: '@sorcererjsx' },
    { text: 'Animated with purpose — well done!', author: '@motionmaker' },
    { text: 'A++ for developer experience.', author: '@dxninja' },
    { text: 'My new favorite component source.', author: '@bitslover' },
  ];
  
  function rotateArray<T>(arr: T[], count: number): T[] {
    return arr.slice(count).concat(arr.slice(0, count));
  }
  
  function ReviewRow({
    data,
    className,
  }: {
    data: typeof reviews;
    className?: string;
  }) {
    const duplicated = [...data, ...data]; // 👈 repeat array for seamless scroll
  
    return (
      <div className="overflow-hidden mt-6">
        <div className={`flex gap-6 whitespace-nowrap ${className}`}>
          {duplicated.map((review, i) => (
            <div
              key={i}
              className="flex-none w-auto bg-zinc-900 p-6 py-6 rounded-xl border border-zinc-800 text-sm shadow-lg"
            >
              <p className="italic">{review.text}</p>
              <p className="text-green-400 mt-2">{review.author}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default function ReviewSection() {
    const row1 = reviews;
    const row2 = rotateArray(reviews, 3);
    const row3 = rotateArray(reviews, 6);
  
    return (
      <section className="bg-black text-white py-16 overflow-hidden">
        <h2 className="text-4xl font-bold text-green-400 text-center mb-10">
          Loved by devs worldwide
        </h2>
  
        <ReviewRow data={row1} className="scroll-x" />
        <ReviewRow data={row2} className="scroll-x2" />
        <ReviewRow data={row3} className="scroll-x3" />
      </section>
    );
  }
  