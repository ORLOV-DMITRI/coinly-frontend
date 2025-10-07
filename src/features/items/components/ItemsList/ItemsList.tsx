import styles from './ItemsList.module.scss'
import cn from "classnames";
import FavoriteIcon from '/public/assets/svg/favorite.svg'


const items = [
    {
        name: 'Молоко',
        category: '🍞 Продукты',
        isFavorite: true,
        prices: [50, 100, 200]
    },
    {
        name: 'Молоко',
        category: '🍞 Продукты',
        isFavorite: true,
        prices: [50]
    },
    {
        name: 'Молоко',
        category: '🍞 Продукты',
        isFavorite: false,
        prices: [50, 70, 100, 200]
    },
    {
        name: 'Молоко',
        category: '🍞 Продукты',
        isFavorite: true,
        prices: [50, 70, 200]
    },
    {
        name: 'Молоко',
        category: '🍞 Продукты',
        isFavorite: false,
        prices: [50, 70, 100]
    },
    {
        name: 'Молоко',
        category: '🍞 Продукты',
        isFavorite: true,
        prices: [ 70, 100, 200]
    },
    {
        name: 'Молоко',
        category: '🍞 Продукты',
        isFavorite: false,
        prices: [50, 100, 200]
    },

]

export default function ItemsList() {
    return (
        <div className={styles.itemsList}>

            {items.map((item, index) => (
                <div className={cn(styles.card, 'card')} key={index}>
                    <div className={styles.header}>
                        <div>
                            <div className={styles.name}>{item.name}</div>
                            <div className={styles.category}>{item.category}</div>
                        </div>
                        <div className={cn(styles.favorite, item.isFavorite && styles.active)}>
                            <FavoriteIcon/>
                        </div>
                    </div>
                    <div className={styles.prices}>
                        {item.prices.map((price, index) => (
                            <span className={styles.price} key={index}>{price}₽</span>
                        ))}
                    </div>
                </div>
            ))}



        </div>
    );
}
