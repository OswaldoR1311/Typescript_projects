import type { Product } from '../types/store';
import {Button} from '../../@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle, CardFooter} from '../../@/components/ui/card';
import { ShoppingCartPlus } from 'lucide-react';


interface CatalogueProps {
  products: Product[],
  addToCart: (product: Product) => void
}

const Catalogue: React.FC<CatalogueProps> = ({ products, addToCart}) => {
  
  if (products.length === 0) {
    return <p>There are no products available.</p>;
  }

  return (
    <div className='flex justify-center'>
      <ul className='flex flex-wrap p-4 gap-4 justify-center list-none m-0'>
        {products.map(p => (
          <li key={p.id}>
            <Card className='w-60 h-56 flex flex-col justify-between p-4 shadow-sm'>
              <CardHeader className='p-0 space-y-1'>
                <CardTitle className='text-base truncate' title={p.name}>
                  {p.name}
                </CardTitle>
                <span className='text-xs uppercase text-slate-400 font-semibold'>{p.category}</span>
              </CardHeader>
              <CardContent className='p-0 my-auto'>
                <p className='text-lg font-bold text-slate-800'>{p.price}$</p>
              </CardContent>
              <CardFooter className=''>
                <Button className='w-full cursor-pointer rounded-full gap-2' variant={'default'} onClick={() => addToCart(p)}>add to cart
                  <ShoppingCartPlus className='h-4 w-4'/>
                </Button>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Catalogue;