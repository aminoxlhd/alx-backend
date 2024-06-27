import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

const app = express();
const port = 1245;

const redisClient = redis.createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);

const listProducts = [
  { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
  { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
  { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
  { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 }
];

app.use(express.json());

app.get('/list_products', (req, res) => {
  res.json(listProducts);
});

app.get('/list_products/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const product = listProducts.find(item => item.itemId === parseInt(itemId));
  if (!product) {
    return res.json({ status: 'Product not found' });
  }

  try {
    const currentQuantity = await getCurrentReservedStockById(itemId);
    res.json({ ...product, currentQuantity });
  } catch (error) {
    console.error('Error retrieving reserved stock:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/reserve_product/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const product = listProducts.find(item => item.itemId === parseInt(itemId));
  if (!product) {
    return res.json({ status: 'Product not found' });
  }

  try {
    const currentQuantity = await getCurrentReservedStockById(itemId);
    if (currentQuantity >= product.initialAvailableQuantity) {
      return res.json({ status: 'Not enough stock available', itemId: parseInt(itemId) });
    }

    await reserveStockById(itemId, currentQuantity + 1);
    res.json({ status: 'Reservation confirmed', itemId: parseInt(itemId) });
  } catch (error) {
    console.error('Error reserving product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function reserveStockById(itemId, stock) {
  return redisClient.set(`item.${itemId}`, stock);
}

async function getCurrentReservedStockById(itemId) {
  const stock = await getAsync(`item.${itemId}`);
  return stock ? parseInt(stock) : 0;
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
