import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoods, addedGoods } from './JewelryCatalogsSlice';
import { showNotification } from '../notification/NotificationSlice';

import JewelryPromoItem from '../JewelryItems/JewelryPromoItem';
import './jewelryCatalogs.scss';
import Spiner from '../spinner/Spinner';

const JewelryPromoCatalog = () => {
    const {goods, goodsLoadingStatus} = useSelector(state => state.goods);
    const dispatch = useDispatch();

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

    if (goodsLoadingStatus === 'loading') {
        return <Spiner/>
    } else if (goodsLoadingStatus === "error") {
        return <h5 className='no-results-message'>An error occurred while loading the data</h5>
    }

    function renderCatalog (arr) {
        
        const items = arr.map(({name, price, id}) => {
            return (<JewelryPromoItem onBuy={() => onBuy(id)} name={name} price={price} key={id} id={id}/>)
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