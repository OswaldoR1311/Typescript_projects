import type { CartItem } from '../types/store';
import { useCart } from '../hooks/useCart';
import { Check, CheckCheck, CheckIcon, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '../../@/components/ui/button';

interface ShopCartProps {
  productsCart: CartItem[],
  increment: (id: number) => void
  decrement: (id: number) => void
  deleteProduct: (id: number) => void
  totalArticles: number
  totalToPay: number
}

const ShopCart: React.FC<ShopCartProps> = ({ productsCart, increment, decrement, deleteProduct, totalToPay, totalArticles }) => {
  

  if (!productsCart || productsCart.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center h-64 text-slate-400 text-center gap-2'>
        <ShoppingBag className='h-12 w-12 stroke-1' />
        <p className='text-sm font-medium'>Your shopping cart is empty</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col justify-between h-full pb-4'>
      <ul className='space-y-3 overflow-y-auto pr-1'>
        {productsCart.map(product => (
          <li key={product.id} className='flex flex-col gap-2 p-3 bg-white border border-slate-100 rounded-lg shadow-2xs '>
            <div className='flex justify-between items-start'>  
                <h4 className='font-semibold text-slate-800 text-sm truncate max-w-45' title={product.name}>{product.name}</h4>
                  <button className='text-slate-400 hover:text-red-500 transition-colors cursor-pointer' title='Delete product' type="button" onClick={() => deleteProduct(product.id)}>
                    <Trash2 className='h-4 w-4'/>
                    </button>
              </div>
              <div className='flex justify-between items-center mt-1'>
                <div className='flex items-center border border-slate-200 rounded-md overflow-hidden bg-slate-50'>
                  <Button variant={'ghost'} size={'icon'} className={'h-7 w-7 rounded-none hover:bg-slate-200 cursor-pointer'} onClick={() => decrement(product.id)}>
                    <Minus className='h-3 w-3'/>
                  </Button>
                  <span className='px-3 text-xs font-semibold text-slate-700'>{product.quantity}</span>
                  <Button variant={'ghost'} size={'icon'} className={'h-7 w-7 rounded-none hover:bg-slate-200 cursor-pointer'} onClick={() => increment(product.id)}>
                    <Plus className='h-3 w-3'/>
                  </Button>
                </div>
                <span className='font-bold text-slate-900 text-sm'>
                  ${(product.price * product.quantity).toFixed(2)}
                </span>
              </div>
          </li>
        ))}
      </ul>
      <div className='border-t border-slate-200 pt-4 px-4 mt-4 space-y-3 bg-white'>
        <div className='flex justify-between items-center'>
          <span className='text-slate-600 font-medium text-sm'>Total to pay:</span>
          <span className='text-lg font-bold text-slate-900'>${totalToPay.toFixed(2)}</span>
        </div>
        <Button className={'w-full font-semibold cursor-pointer'}>
          Proceed to checkout
          <CheckIcon className='h-3 w-3'/>
        </Button>
      </div>
    </div>
  );
};

export default ShopCart;