import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Calendar } from 'lucide-react';
import { journals } from '@/data/journals';

export default function JournalDetail() {
  const { slug } = useParams();
  const journal = journals.find(j => j.slug === slug);

  if (!journal) {
    return <Navigate to="/404" replace />;
  }

  return (
    <article className="container-page py-12 lg:py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/jurnal"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-charcoal-500 hover:text-charcoal-800"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali ke Jurnal
        </Link>

        <header className="mb-10 text-center">
          <span className="mb-4 inline-block rounded-full bg-sage-100 px-4 py-1.5 text-xs font-semibold text-sage-700">
            {journal.category}
          </span>
          <h1 className="mb-6 font-display text-3xl leading-tight text-charcoal-800 sm:text-4xl lg:text-5xl">
            {journal.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-charcoal-500">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" /> {journal.author}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> {journal.date}
            </span>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 aspect-[21/9] w-full overflow-hidden rounded-[2rem] shadow-elevated"
        >
          <img 
            src={journal.image} 
            alt={journal.title} 
            className="h-full w-full object-cover" 
          />
        </motion.div>

        <div className="prose prose-sage prose-lg mx-auto max-w-none text-charcoal-600 prose-headings:font-display prose-headings:text-charcoal-800 prose-a:text-sage-600 hover:prose-a:text-sage-700">
          {journal.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.trim().startsWith('###')) {
              return <h3 key={idx} className="mt-8 mb-4 font-display text-2xl text-charcoal-800">{paragraph.replace('### ', '')}</h3>
            }
            return <p key={idx} className="mb-4 leading-relaxed">{paragraph}</p>;
          })}
        </div>
      </div>
    </article>
  );
}
