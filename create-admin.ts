import dbConnect from './lib/mongodb';
import User from './models/User';
import bcrypt from 'bcryptjs';

async function createAdmin() {
  await dbConnect();
  
  const adminEmail = 'admin@topup.com';
  const adminPassword = 'admin123';
  
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (existingAdmin) {
    console.log('Admin user already exists!');
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  
  await User.create({
    name: 'Main Admin',
    email: adminEmail,
    password: hashedPassword,
    role: 'admin'
  });

  console.log('Admin user created successfully!');
  console.log('Email: ' + adminEmail);
  console.log('Password: ' + adminPassword);
  process.exit(0);
}

createAdmin().catch(err => {
  console.error('Failed to create admin:', err);
  process.exit(1);
});
