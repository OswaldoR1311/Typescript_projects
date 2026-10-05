import { useState } from 'react';
import { data } from './data';
import Catalogue from './components/Catalogue';
import ShopCart from './components/ShopCart';
import type { Product } from './types/store';
import { Button } from '../@/components/ui/button';
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from '../@/components/ui/sheet';
import { ShoppingCart } from 'lucide-react';
import { useCart } from './hooks/useCart';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(data);
  const { cart, deleteFromCart, totalArticles, totalToPay, addProduct, increment, decrement} = useCart();
  return (
    <div className='min-h-screen bg-slate-50'>
      <header className='flex justify-between items-center px-8 py-4 bg-white border-b shadow-sm sticky'>
        <h1 className='text-xl font-bold text-slate-800'>Oswaldo's E-commerce</h1>
        <Sheet>
          <SheetTrigger>
            <Button variant={'ghost'} className={'relative flex items-center gap-2 cursor-pointer'}>
              <ShoppingCart className='h-6 w-6' />
            </Button>
            {totalArticles > 0 && (
              <span className='absolute top-2 right-7 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>{cart.length}</span>
            )}
          </SheetTrigger>
          <SheetContent className='w-full sm:max-w-md flex flex-col'>
            <SheetHeader>
              <SheetTitle>Your shopping cart</SheetTitle>
            </SheetHeader>
            <div className='flex-1 overflow-y-auto mt-4 pr-1'>
              <ShopCart totalArticles={totalArticles} deleteProduct={deleteFromCart} productsCart={cart} increment={increment} decrement={decrement} totalToPay={totalToPay} />
            </div>
          </SheetContent>
        </Sheet>
      </header>
      <main className='max-w-6xl mx-auto py-8'>
        <Catalogue products={products} addToCart={addProduct} />
      </main>
    </div>
  );
};


export default App;