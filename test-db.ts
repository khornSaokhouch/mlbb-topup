import dbConnect from './lib/mongodb';
import Product from './models/Product';

async function check() {
  await dbConnect();
  const count = await Product.countDocuments();
  console.log(`Product count: ${count}`);
  process.exit(0);
}

check().catch(err => {
  console.error(err);
  process.exit(1);
});
