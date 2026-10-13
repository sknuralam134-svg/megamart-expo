import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PRIMARY = '#2E7D32';
const PRIMARY_DARK = '#1B5E20';
const WHITE = '#FFFFFF';
const LIGHT_BG = '#F5F5F5';

const PRODUCTS = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    price: 134900,
    oldPrice: 144900,
    image: 'https://m.media-amazon.com/images/I/81Os1SDWpcL._SL1500_.jpg',
    description: 'Apple iPhone 15 Pro 128GB - Natural Titanium. A17 Pro chip, 48MP camera.',
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24',
    price: 74999,
    oldPrice: 89999,
    image: 'https://m.media-amazon.com/images/I/71TPda7cwUL._SL1500_.jpg',
    description: 'Samsung Galaxy S24 5G 256GB. Snapdragon 8 Gen 3, 50MP camera.',
  },
  {
    id: '3',
    name: 'Nike Air Max',
    price: 8995,
    oldPrice: 12995,
    image: 'https://m.media-amazon.com/images/I/71zLvwVXgEL._SL1500_.jpg',
    description: 'Nike Air Max Running Shoes for Men. Comfortable and stylish.',
  },
  {
    id: '4',
    name: 'Sony WH-1000XM5',
    price: 29990,
    oldPrice: 34990,
    image: 'https://m.media-amazon.com/images/I/61vR3x5sTtL._SL1500_.jpg',
    description: 'Sony Wireless Noise Cancelling Headphones. Best in class ANC.',
  },
  {
    id: '5',
    name: "Levi's Slim Jeans",
    price: 2499,
    oldPrice: 3999,
    image: 'https://m.media-amazon.com/images/I/81h4Yw0nKqL._UL1500_.jpg',
    description: "Levi's 511 Slim Fit Jeans for Men. Stretchable and comfortable.",
  },
  {
    id: '6',
    name: 'boAt Airdopes 141',
    price: 1299,
    oldPrice: 4490,
    image: 'https://m.media-amazon.com/images/I/51HBom8xz7L._SL1500_.jpg',
    description: 'boAt Airdopes 141 True Wireless Earbuds with 42 Hours Playback.',
  },
  {
    id: '7',
    name: 'OnePlus Nord CE 3',
    price: 22999,
    oldPrice: 26999,
    image: 'https://m.media-amazon.com/images/I/61QRgOgBx0L._SL1500_.jpg',
    description: 'OnePlus Nord CE 3 5G. 80W charging, 50MP camera.',
  },
  {
    id: '8',
    name: 'Noise ColorFit Pro 4',
    price: 2499,
    oldPrice: 5999,
    image: 'https://m.media-amazon.com/images/I/61ZzwAUXiDL._SL1500_.jpg',
    description: 'Noise ColorFit Pro 4 Smart Watch with Bluetooth Calling.',
  },
];

export default function App() {
  const [page, setPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');

  const filteredProducts = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    Alert.alert('Success', 'Added to Cart!');
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const placeOrder = () => {
    if (cart.length === 0) return;
    setCart([]);
    setPage('success');
  };

  // ========== HOME ========== 
  if (page === 'home') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.logo}>MegaMart</Text>
          <TouchableOpacity onPress={() => setPage('cart')} style={styles.cartBtn}>
            <Ionicons name="cart" size={26} color={WHITE} />
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                setSelectedProduct(item);
                setPage('detail');
              }}
            >
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <Text style={styles.cardName} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.cardPrice}>₹{item.price.toLocaleString('en-IN')}</Text>
              <Text style={styles.oldPrice}>₹{item.oldPrice.toLocaleString('en-IN')}</Text>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
  }

  // ========== DETAIL ========== 
  if (page === 'detail' && selectedProduct) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setPage('home')}>
            <Ionicons name="arrow-back" size={26} color={WHITE} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Product Details</Text>
          <TouchableOpacity onPress={() => setPage('cart')}>
            <Ionicons name="cart" size={26} color={WHITE} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Image source={{ uri: selectedProduct.image }} style={styles.detailImage} />
          <Text style={styles.detailName}>{selectedProduct.name}</Text>
          <Text style={styles.detailPrice}>₹{selectedProduct.price.toLocaleString('en-IN')}</Text>
          <Text style={styles.detailDesc}>{selectedProduct.description}</Text>

          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => addToCart(selectedProduct)}
          >
            <Ionicons name="cart" size={20} color={WHITE} />
            <Text style={styles.addBtnText}>Add to Cart</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ========== CART ========== 
  if (page === 'cart') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setPage('home')}>
            <Ionicons name="arrow-back" size={26} color={WHITE} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Cart</Text>
          <View style={{ width: 26 }} />
        </View>

        {cart.length === 0 ? (
          <View style={styles.emptyCart}>
            <Ionicons name="cart-outline" size={70} color="#ccc" />
            <Text style={styles.emptyText}>Your cart is empty</Text>
          </View>
        ) : (
          <>
            <FlatList
              data={cart}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ padding: 16 }}
              renderItem={({ item }) => (
                <View style={styles.cartItem}>
                  <Image source={{ uri: item.image }} style={styles.cartImage} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cartName}>{item.name}</Text>
                    <Text style={styles.cartPrice}>₹{item.price.toLocaleString('en-IN')}</Text>
                    <View style={styles.qtyRow}>
                      <TouchableOpacity style={styles.qtyBtn} onPress={() => changeQty(item.id, -1)}>
                        <Text style={styles.qtyBtnText}>−</Text>
                      </TouchableOpacity>
                      <Text style={styles.qtyText}>{item.qty}</Text>
                      <TouchableOpacity style={styles.qtyBtn} onPress={() => changeQty(item.id, 1)}>
                        <Text style={styles.qtyBtnText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
            <View style={styles.footer}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>₹{total.toLocaleString('en-IN')}</Text>
              </View>
              <TouchableOpacity style={styles.orderBtn} onPress={placeOrder}>
                <Text style={styles.orderBtnText}>Place Order</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </SafeAreaView>
    );
  }

  // ========== SUCCESS ========== 
  if (page === 'success') {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Ionicons name="checkmark-circle" size={80} color={PRIMARY} />
        <Text style={styles.successTitle}>Order Placed!</Text>
        <Text style={styles.successText}>Thank you for shopping with MegaMart</Text>
        <TouchableOpacity style={styles.orderBtn} onPress={() => setPage('home')}>
          <Text style={styles.orderBtnText}>Continue Shopping</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_BG,
  },
  header: {
    backgroundColor: PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  logo: {
    color: WHITE,
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '600',
  },
  cartBtn: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -8,
    backgroundColor: '#FF5252',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: WHITE,
    fontSize: 11,
    fontWeight: 'bold',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    margin: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 15,
  },
  list: {
    padding: 12,
  },
  card: {
    backgroundColor: WHITE,
    width: '48%',
    borderRadius: 10,
    marginBottom: 14,
    elevation: 2,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 140,
    resizeMode: 'contain',
    backgroundColor: '#fafafa',
  },
  cardName: {
    fontSize: 13,
    fontWeight: '500',
    paddingHorizontal: 10,
    paddingTop: 8,
    height: 40,
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: PRIMARY_DARK,
    paddingHorizontal: 10,
  },
  oldPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  detailImage: {
    width: '100%',
    height: 280,
    resizeMode: 'contain',
    backgroundColor: WHITE,
    borderRadius: 10,
  },
  detailName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 16,
  },
  detailPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: PRIMARY,
    marginTop: 8,
  },
  detailDesc: {
    fontSize: 15,
    color: '#555',
    marginTop: 12,
    lineHeight: 22,
  },
  addBtn: {
    backgroundColor: PRIMARY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    gap: 8,
  },
  addBtnText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: '#999',
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    elevation: 1,
  },
  cartImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 12,
  },
  cartName: {
    fontSize: 15,
    fontWeight: '500',
  },
  cartPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PRIMARY_DARK,
    marginTop: 4,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 12,
  },
  qtyBtn: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnText: {
    fontSize: 18,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    backgroundColor: WHITE,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PRIMARY,
  },
  orderBtn: {
    backgroundColor: PRIMARY,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  orderBtnText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    color: PRIMARY_DARK,
  },
  successText: {
    fontSize: 15,
    color: '#666',
    marginTop: 8,
    marginBottom: 30,
  },
});
