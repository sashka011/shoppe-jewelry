import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoods, addedGoods } from './JewelryCatalogsSlice';
import { showNotification } from '../notification/NotificationSlice';

import JewelryPromoItem from '../JewelryItems/JewelryPromoItem';
import './jewelryCatalogs.scss';

const JewelryPromoCatalog = () => {
    const dispatch = useDispatch();

    const {goods} = useSelector(state => state.goods);

    useEffect(() => {
        dispatch(fetchGoods());
        // eslint-disable-next-line
    }, []);

    const onBuy = (id) => {
        dispatch(addedGoods(id));
        dispatch(showNotification(true))

        setTimeout(() => {
            dispatch(showNotification(false));
        }, 2000); 
    }

    function renderCatalog (arr) {
        const items = arr.map(({name, price, id}) => {
            return (<JewelryPromoItem onBuy={() => onBuy(id)} name={name} price={price} key={id}/>)
        })

        return (
            <>
                {items}
            </>
        )
    }

    const catalog = renderCatalog(goods);
    return (
        <div className="catalog">
            <div className="container">
                <div className="catalog__wrapper">    
                    {catalog}
                </div>
            </div>

        </div>
    )
}

export default JewelryPromoCatalog;