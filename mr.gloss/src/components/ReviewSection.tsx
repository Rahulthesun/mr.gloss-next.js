const reviews = [
  {
    text: 'Will surely recommend to my friends and family for car detailing service parts and accessories.',
    author: 'Jai Kumar',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjV2qh3AF8r9X9gAR60GwQohpAuxprMhyf_Fphnwaco3MA12ZNXl=w90-h90-p-rp-mo-br100',
  },
  {
    text: 'I came here for sun film (Carpro) and floor mat. The quality and the work was neat and clean.',
    author: 'Mohammed Sheriff',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjU_yCSJPUerSJTjulSRvq_CfDdNc7Sib7VC81QgDuaqsjSyADPY=w90-h90-p-rp-mo-br100',
  },
  {
    text: 'Mr. Ganesh and his staff are cordial and receive the client well.',
    author: 'Sathish Kumar',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKHQNDE6aqVVJWz5YekuH95m4Z1tM2kRVTG44-kt5kN-6EQ0wU=w90-h90-p-rp-mo-br100',
  },
  {
    text: 'It is the greatest location for ceramic coating, PPF, and car washes.',
    author: 'Sulakshana Trivedi',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjVMAlJ1tQye-HkvhsHqCsPaaPUkDeu8Oq_JXin1P3VtkDT_fXZwxw=w90-h90-p-rp-mo-br100',
  },
  {
    text: 'Their attention to detail in car detailing ensures a flawless finish every time.',
    author: 'Aswin CR',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjWs7wvokvADukOaAnvUUleZxDkEMbF7919qTvyLJZbnYVPtoTQP=w90-h90-p-rp-mo-br100',
  },
  {
    text: 'Their dedication to quality car detailing and paint protection film is commendable.',
    author: 'Abhishek Cz',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjVCbWpclQ_jT7kX5N21kPFMzG95Ae7pAhr9INbb3PCH6odePR7D=w90-h90-p-rp-mo-br100',
  },
  {
    text: 'Very nice work, satisfied and benefit 💯',
    author: 'Yamini Chittu',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjUERYa0J6tJ784PN4ynzUhfC1-yTjagPu9X5uaBew08EJc71XY=w90-h90-p-rp-mo-br100',
  },
  {
    text: 'Very much satisfied with Graphene coating.',
    author: 'Explore, Cook & Taste',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjVCZ_S9BV5qe0fn1jdWqPDEec81fyRQMXmU7f9uw3K2PLUlpJKI=w90-h90-p-rp-mo-br100',
  },
  {
    text: 'My car looks neat & clean with glossy finish after Graphene coat.',
    author: 'Antony Alapatt',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjUza3PHREnl0wvybZqmQfpcHFWjTCAwGIVHUdEvhLQz3oiGjhQO=w90-h90-p-rp-mo-br100',
  },
  {
    text: 'Nice experience with MrGloss. Changed the appearance of my car with ceramic coating.',
    author: 'Ramji Padmanabhan',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjXI4ksqQgmuXdjmttfZhIk6u8FBW95EBu08SvgYonNiTSE7zpfF=w90-h90-p-rp-mo-br100',
  },
  {
    text: "Will visit again... it's become a clinic for my car.",
    author: 'Prabhu K',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjUF_Za-KZSHrpC6aVD9x09dpdZQbjKi3SR2vBQqfkLcf_28l9Niew=w90-h90-p-rp-mo-ba3-br100',
  },
  {
    text: 'Budget friendly service and the way they handle customers is really cool.',
    author: 'Padma Priya',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjUvECk9s-1cvCrPjsBhPcrZNUSq4cOx-J1QyHCiLAVIWcH29UEF=w90-h90-p-rp-mo-br100',
  },
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
    const duplicated = [...data, ...data]; // seamless scroll
  
    return (
      <div className="overflow-hidden mt-6">
        <div className={`flex gap-6 whitespace-nowrap ${className}`}>
          {duplicated.map((review, i) => (
            <div
              key={i}
              className="flex-none w-72 bg-zinc-900 p-5 rounded-2xl border border-zinc-800 shadow-xl text-sm hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="w-10 h-10 rounded-full border border-zinc-700 object-cover"
                />
                <p className="text-green-400 font-medium text-base">{review.author}</p>
              </div>
              <p className="text-zinc-300 leading-relaxed italic whitespace-normal">
                "{review.text}"
              </p>
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
        <h2 className="text-5xl py-10 text-center font-extrabold text-white mb-4">Loved By Our Customers</h2>
  
        <ReviewRow data={row1} className="scroll-x" />
        <ReviewRow data={row2} className="scroll-x2" />
        <ReviewRow data={row3} className="scroll-x3" />
      </section>
    );
  }
  