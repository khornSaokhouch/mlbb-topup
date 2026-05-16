import Hero from '@/components/home/Hero';
import ProductCard from '@/components/home/ProductCard';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function Home() {
  const products = [
    { id: '1', diamonds: 86, bonus: 9, price: 1.50 },
    { id: '2', diamonds: 172, bonus: 18, price: 3.00 },
    { id: '3', diamonds: 257, bonus: 28, price: 4.50 },
    { id: '4', diamonds: 344, bonus: 37, price: 6.00 },
    { id: '5', diamonds: 706, bonus: 84, price: 12.00 },
    { id: '6', diamonds: 1050, bonus: 134, price: 18.00 },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Hero />
        
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Popular Packages</h2>
              <p className="text-muted-foreground">Choose the best diamond package for your account.</p>
            </div>
            <div className="hidden sm:block">
              <div className="h-1 w-20 bg-primary/50 relative">
                 <div className="absolute top-0 left-0 h-full w-10 bg-primary shadow-[0_0_10px_#00e5ff]" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Link href={`/top-up/mlbb?product=${product.id}`} key={index} className="block">
                <ProductCard {...product} />
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ or other sections can be added here */}
      </main>
      <Footer />
    </div>
  );
}
