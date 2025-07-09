import CountUp from "../components/CounterSection";
import { Star, ShieldCheck, Clock3 } from "lucide-react";

type StatProps = {
  to: number;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  color?: string;
  separator?: string;
};

function StatItem({
  to,
  label,
  description,
  icon,
  color = "text-green-400",
  separator,
}: StatProps) {
  return (
    <div className="bg-[#121212] border border-zinc-800 p-8 rounded-3xl shadow-2xl hover:shadow-green-500/20 transition-transform hover:scale-105 duration-300">
      <CountUp
        from={0}
        to={to}
        duration={2.5}
        separator={separator}
        className={`text-5xl font-extrabold ${color}`}
      />

      <div className="flex items-center mt-6 gap-4 mb-2">
        <div className="bg-green-600/10 p-3 rounded-xl text-green-400">
          {icon}
        </div>
        <div className="text-left">
          <h3 className="text-xl font-bold text-white">{label}</h3>
          <p className="text-zinc-400 text-sm">{description}</p>
        </div>
      </div>
      
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="w-full py-24 bg-black text-white font-sans">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-extrabold text-white mb-4">Why Choose Mr.Gloss?</h2>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-16">
          We don’t just detail cars — we elevate them. Here's why our customers trust us.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <StatItem
            to={1200}
            label="Happy Customers"
            description="5-star rated car detailing service across the city"
            icon={<Star size={28} />}
          />
          <StatItem
            to={350}
            label="Ceramic Coatings"
            description="Premium ceramic & graphene jobs completed"
            icon={<ShieldCheck size={28} />}
          />
          <StatItem
            to={480}
            label="Hours Saved"
            description="Fast service turnaround while maintaining perfection"
            icon={<Clock3 size={28} />}
          />
        </div>
      </div>
    </section>
  );
}
