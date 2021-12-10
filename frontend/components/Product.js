import Link from 'next/link';
import styled from 'styled-components';

import { Delete, Edit } from '@styled-icons/material';
import formatMoney from '../lib/formatMoney';
import AddToCart from './AddToCart';
import DeleteProduct from './DeleteProduct';

import ItemStyles from './styles/ItemStyles';
import DescriptionItem from './styles/DescriptionItem';

import PriceTag from './styles/PriceTag';
import TitleItem from './styles/TitleItem';
import { useUser } from './User';
import Promotion from './styles/Promotion';
import NewItem from './styles/NewItem';
import Favorite from './Favorite';

const EditButton = styled.button`
  cursor: pointer;
`;

export default function Product({ product }) {
  const user = useUser();
  // console.log(user);
  const { canManageProducts } = user?.role;
  return (
    <ItemStyles>
      <div className="item-image">
        <img
          src={product?.photo?.image?.publicUrlTransformed}
          alt={product?.name}
        />
        {product?.discount && (
          <Promotion>{`- ${product?.discount?.percent} %`}</Promotion>
        )}
        {product?.new && <NewItem>Nowość</NewItem>}
        <Favorite id={product.id} />
      </div>
      <DescriptionItem>
        <h4>
          {product?.brand?.name} / {product?.category?.name}
        </h4>
        <TitleItem>
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </TitleItem>
        <PriceTag>{formatMoney(product.price)}</PriceTag>
        <AddToCart id={product.id} />
      </DescriptionItem>
      {canManageProducts && (
        <div className="buttonList">
          <EditButton type="button">
            <Link href={{ pathname: '/update', query: { id: product.id } }}>
              <Edit size="18" color="#03120e" title="Edytuj" />
            </Link>
          </EditButton>

          <DeleteProduct id={product.id}>
            <Delete size="18" color="#03120e" title="Usuń" />
          </DeleteProduct>
        </div>
      )}
    </ItemStyles>
  );
}
