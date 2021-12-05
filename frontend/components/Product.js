import Link from 'next/link';
import formatMoney from '../lib/formatMoney';
import AddToCart from './AddToCart';
import DeleteProduct from './DeleteProduct';

import ItemStyles from './styles/ItemStyles';
import DescriptionItem from './styles/DescriptionItem';

import PriceTag from './styles/PriceTag';
import TitleItem from './styles/TitleItem';

export default function Product({ product }) {
  return (
    <ItemStyles>
      <div className="item-image">
        <img
          src={product?.photo?.image?.publicUrlTransformed}
          alt={product?.name}
        />
      </div>
      <DescriptionItem>
        <h4>brand / type</h4>
        <TitleItem>
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </TitleItem>
        <PriceTag>{formatMoney(product.price)}</PriceTag>
        <div className="buttonList">
          <Link href={{ pathname: '/update', query: { id: product.id } }}>
            Edit 🖉
          </Link>
          <AddToCart id={product.id} />
          <DeleteProduct id={product.id}>Delete</DeleteProduct>
        </div>
      </DescriptionItem>
    </ItemStyles>
  );
}
