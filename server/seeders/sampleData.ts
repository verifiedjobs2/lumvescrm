import { config } from '../src/config/config';
import { sequelize, connectDB } from '../src/config/database';
import { User, Product } from '../src/models';

const seedDatabase = async () => {
  try {
    console.log('Connecting to database...');
    await connectDB();

    console.log('Creating admin user...');

    // Create admin user
    const adminPassword = await User.hashPassword('admin123');
    const [admin] = await User.findOrCreate({
      where: { email: 'admin@lumves.com' },
      defaults: {
        name: 'System Admin',
        email: 'admin@lumves.com',
        password_hash: adminPassword,
        role: 'admin',
        phone: '+91 9876543210',
      },
    });
    console.log('Admin user created:', admin.email);

    // Create sample manager
    const managerPassword = await User.hashPassword('manager123');
    const [manager] = await User.findOrCreate({
      where: { email: 'manager@lumves.com' },
      defaults: {
        name: 'Sales Manager',
        email: 'manager@lumves.com',
        password_hash: managerPassword,
        role: 'manager',
        phone: '+91 9876543211',
      },
    });
    console.log('Manager user created:', manager.email);

    // Create sample agent
    const agentPassword = await User.hashPassword('agent123');
    const [agent] = await User.findOrCreate({
      where: { email: 'agent@lumves.com' },
      defaults: {
        name: 'Sales Agent',
        email: 'agent@lumves.com',
        password_hash: agentPassword,
        role: 'agent',
        phone: '+91 9876543212',
      },
    });
    console.log('Agent user created:', agent.email);

    // Create sample products
    const sampleProducts = [
      {
        name: 'iPhone 15 Pro Max',
        category: 'smartphones' as const,
        sku: 'IPH-15PM-256',
        price: 159900,
        stock_quantity: 50,
        image_url: 'https://example.com/iphone15.jpg',
      },
      {
        name: 'Samsung Galaxy S24 Ultra',
        category: 'smartphones' as const,
        sku: 'SAM-S24U-256',
        price: 134999,
        stock_quantity: 45,
        image_url: 'https://example.com/s24ultra.jpg',
      },
      {
        name: 'MacBook Pro 14"',
        category: 'laptops' as const,
        sku: 'MBP-14-M3',
        price: 199900,
        stock_quantity: 20,
        image_url: 'https://example.com/mbp14.jpg',
      },
      {
        name: 'Dell XPS 15',
        category: 'laptops' as const,
        sku: 'DELL-XPS15',
        price: 149990,
        stock_quantity: 15,
        image_url: 'https://example.com/xps15.jpg',
      },
      {
        name: 'Sony Bravia 55" 4K OLED',
        category: 'tvs' as const,
        sku: 'SONY-BR55-OLED',
        price: 149990,
        stock_quantity: 10,
        image_url: 'https://example.com/bravia55.jpg',
      },
      {
        name: 'LG 65" NanoCell TV',
        category: 'tvs' as const,
        sku: 'LG-65NANO',
        price: 89990,
        stock_quantity: 12,
        image_url: 'https://example.com/lg65nano.jpg',
      },
      {
        name: 'Instant Pot Duo Plus',
        category: 'kitchen_appliances' as const,
        sku: 'IP-DUO-PLUS',
        price: 9999,
        stock_quantity: 100,
        image_url: 'https://example.com/instantpot.jpg',
      },
      {
        name: 'Philips Air Fryer XXL',
        category: 'kitchen_appliances' as const,
        sku: 'PH-AF-XXL',
        price: 24999,
        stock_quantity: 35,
        image_url: 'https://example.com/airfryer.jpg',
      },
      {
        name: 'Dyson V15 Detect',
        category: 'home_electronics' as const,
        sku: 'DYS-V15-DET',
        price: 62900,
        stock_quantity: 25,
        image_url: 'https://example.com/dysonv15.jpg',
      },
      {
        name: 'Roomba j7+',
        category: 'home_electronics' as const,
        sku: 'IRO-J7-PLUS',
        price: 79900,
        stock_quantity: 18,
        image_url: 'https://example.com/roombaj7.jpg',
      },
    ];

    console.log('Creating sample products...');
    for (const productData of sampleProducts) {
      const [product] = await Product.findOrCreate({
        where: { sku: productData.sku },
        defaults: productData,
      });
      console.log('Product created:', product.name);
    }

    console.log('\n========================================');
    console.log('Database seeded successfully!');
    console.log('========================================');
    console.log('\nDefault login credentials:');
    console.log('Admin:   admin@lumves.com / admin123');
    console.log('Manager: manager@lumves.com / manager123');
    console.log('Agent:   agent@lumves.com / agent123');
    console.log('========================================\n');

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
