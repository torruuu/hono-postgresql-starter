import type { Product } from './product.types.js'

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop Pro',
    description: 'High-performance laptop for professionals',
    price: 1299.99,
    stock: 50,
    category: 'Electronics',
  },
  {
    id: '2',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with long battery life',
    price: 29.99,
    stock: 200,
    category: 'Electronics',
  },
  {
    id: '3',
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with Cherry MX switches',
    price: 149.99,
    stock: 75,
    category: 'Electronics',
  },
  {
    id: '4',
    name: 'USB-C Hub',
    description: 'Multi-port USB-C hub with HDMI and SD card reader',
    price: 49.99,
    stock: 150,
    category: 'Accessories',
  },
  {
    id: '5',
    name: 'Monitor Stand',
    description: 'Adjustable monitor stand with cable management',
    price: 79.99,
    stock: 100,
    category: 'Accessories',
  },
]

export function getAllProducts(): Product[] {
  return mockProducts
}

export function getProductById(id: string): Product | undefined {
  return mockProducts.find((product) => product.id === id)
}
