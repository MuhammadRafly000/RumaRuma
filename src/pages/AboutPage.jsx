import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="container-page py-12 lg:py-20">
      <div className="mx-auto max-w-4xl">
        <header className="mb-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-700">
            Tentang Kami
          </p>
          <h1 className="mt-4 font-display text-4xl text-charcoal-800 sm:text-5xl">
            Menghangatkan Setiap Sudut Rumahmu
          </h1>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 aspect-[16/9] overflow-hidden rounded-[2rem] shadow-elevated"
        >
          <img 
            src="/images/banners/hero_b1.png" 
            alt="RumaRuma Studio" 
            className="h-full w-full object-cover" 
          />
        </motion.div>

        <div className="prose prose-sage prose-lg mx-auto text-charcoal-600 prose-headings:font-display prose-headings:text-charcoal-800">
          <p className="lead text-xl text-charcoal-700 font-medium text-center mb-12">
            RumaRuma bermula dari sebuah keyakinan sederhana: rumah bukan sekadar tempat singgah, melainkan kanvas tempat kenangan terindah dilukis.
          </p>

          <div className="grid gap-12 md:grid-cols-2 mt-16">
            <div>
              <h3 className="text-2xl mb-4 font-display text-charcoal-800">Perjalanan Kami</h3>
              <p className="leading-relaxed">
                Didirikan pada tahun 2021 di sebuah studio kecil di Kemang, Jakarta, RumaRuma lahir dari kecintaan kami terhadap kerajinan tangan dan desain yang tak lekang oleh waktu (timeless). Kami melihat ada celah besar antara produk buatan pabrik yang seragam dan kerajinan lokal yang kurang terjangkau.
              </p>
              <p className="leading-relaxed mt-4">
                Kami ingin menjembatani celah tersebut dengan menciptakan produk homeware yang tidak hanya indah dipandang, tetapi juga fungsional dan terjangkau untuk keluarga Indonesia.
              </p>
            </div>
            <div className="rounded-[2rem] bg-sage-50 p-8">
              <h3 className="text-2xl mb-4 font-display text-charcoal-800">Bersama Pengrajin Lokal</h3>
              <p className="leading-relaxed text-charcoal-600">
                Setiap piring keramik, vas bunga, dan taplak meja yang ada di RumaRuma adalah hasil karya tangan-tangan terampil pengrajin lokal dari berbagai daerah di Indonesia, mulai dari Plered, Kasongan, hingga Jepara.
              </p>
              <p className="leading-relaxed mt-4 text-charcoal-600">
                Kami berkomitmen untuk menjalankan perdagangan yang adil (fair trade) dan membantu memberdayakan komunitas pengrajin agar warisan budaya ini terus hidup dan relevan dengan desain modern.
              </p>
            </div>
          </div>

          <div className="mt-20 border-t border-charcoal-100 pt-16 text-center">
            <h2 className="text-3xl font-display text-charcoal-800 mb-6">Filosofi Desain</h2>
            <div className="grid gap-8 sm:grid-cols-3 mt-10">
              <div>
                <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-cream-100 text-xl font-bold text-sage-700">1</div>
                <h4 className="font-semibold text-charcoal-800 mb-2">Fungsional</h4>
                <p className="text-sm">Keindahan yang sia-sia jika tidak bisa digunakan setiap hari. Kami merancang untuk keseharian.</p>
              </div>
              <div>
                <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-cream-100 text-xl font-bold text-sage-700">2</div>
                <h4 className="font-semibold text-charcoal-800 mb-2">Sustainable</h4>
                <p className="text-sm">Material alami yang awet bertahun-tahun, mengurangi limbah dan ramah lingkungan.</p>
              </div>
              <div>
                <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-cream-100 text-xl font-bold text-sage-700">3</div>
                <h4 className="font-semibold text-charcoal-800 mb-2">Wabi-Sabi</h4>
                <p className="text-sm">Merayakan ketidaksempurnaan alami dari setiap karya yang dibuat dengan tangan (handmade).</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
