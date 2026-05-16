import dbConnect from './mongodb';
import Product from '../models/Product';

const products = [
  { name: '86 Diamonds', diamonds: 86, bonusDiamonds: 9, price: 1.50, category: 'MLBB', isActive: true, providerCode: 'mlbb_86' },
  { name: '172 Diamonds', diamonds: 172, bonusDiamonds: 18, price: 3.00, category: 'MLBB', isActive: true, providerCode: 'mlbb_172' },
  { name: '257 Diamonds', diamonds: 257, bonusDiamonds: 28, price: 4.50, category: 'MLBB', isActive: true, providerCode: 'mlbb_257' },
  { name: '344 Diamonds', diamonds: 344, bonusDiamonds: 37, price: 6.00, category: 'MLBB', isActive: true, providerCode: 'mlbb_344' },
  { name: '706 Diamonds', diamonds: 706, bonusDiamonds: 84, price: 12.00, category: 'MLBB', isActive: true, providerCode: 'mlbb_706' },
  { name: '1050 Diamonds', diamonds: 1050, bonusDiamonds: 134, price: 18.00, category: 'MLBB', isActive: true, providerCode: 'mlbb_1050' },
  { name: '2195 Diamonds', diamonds: 2195, bonusDiamonds: 303, price: 36.00, category: 'MLBB', isActive: true, providerCode: 'mlbb_2195' },
  { name: '3688 Diamonds', diamonds: 3688, bonusDiamonds: 554, price: 60.00, category: 'MLBB', isActive: true, providerCode: 'mlbb_3688' },
];

async function seed() {
  await dbConnect();
  console.log('Seeding products...');
  
  await Product.deleteMany({});
  await Product.insertMany(products);
  
  console.log('Seed completed successfully!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
