import styles from './CreateItemPage.module.scss'
import Input from "@/shared/ui/Input/Input";
import Button from "@/shared/ui/Button/Button";
import FavoriteIcon from '/public/assets/svg/favorite.svg'
import BackIcon from '/public/assets/svg/backArrow.svg'
import cn from "classnames";

export default function CreateItemPage() {
    return (
        <section className={styles.createPage}>
            <div className="container">

                <div className={styles.header}>
                    <div className={'backBtn'}><BackIcon/></div>
                    <h2>Создание товара</h2>
                    <div></div>
                </div>


                <form>
                    <div className={styles.formSection}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="itemName">
                                Название товара <span className={styles.required}>*</span>
                            </label>
                            <Input
                                type="text"
                                id="itemName"
                                placeholder="Например: Молоко"
                                required
                                minLength={2}
                                autoFocus
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="itemPrice">
                                Первая цена <span className={styles.required}>*</span>
                            </label>
                            <div className={styles.priceInputWrapper}>
                                <Input
                                    type="number"
                                    id="itemPrice"
                                    className={styles.priceInput}
                                    placeholder="70"
                                    required
                                    min="1"
                                    step="10"
                                />
                                <span className={styles.currency}>₽</span>
                            </div>
                            <div className={styles.hint}>Основная цена товара</div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="itemCategory">
                                Категория
                            </label>
                            <select id="itemCategory" className={styles.select}>
                                <option value="">Без категории</option>
                                <option value="products">🍞 Продукты</option>
                                <option value="transport">🚗 Транспорт</option>
                                <option value="home">🏠 Дом</option>
                                <option value="health">💊 Здоровье</option>
                                <option value="entertainment">🎮 Развлечения</option>
                            </select>
                        </div>


                        <div className={styles.formGroup}>
                            <label className={styles.checkboxWrapper}>
                                <input type="checkbox" className={styles.checkbox}/>
                                <span className={styles.checkboxLabel}>
                                    <span><FavoriteIcon/></span>
                                    <span>Добавить в избранное</span>
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className={styles.pricesSection}>
                        <h3 className={styles.pricesTitle}>Дополнительные цены</h3>
                        <p className={styles.pricesDescription}>
                            Добавьте типичные цены для быстрого выбора при создании расхода
                        </p>

                        <div className={styles.priceItem}>
                            <div className={cn(styles.priceInputWrapper, styles.priceItemInput)}>
                                <Input
                                    type="number"
                                    className={styles.priceInput}
                                    placeholder="80"
                                    min="1"
                                    step="10"
                                />
                                <span className={styles.currency}>₽</span>
                            </div>
                            <button type="button" className={styles.removeButton}>
                                ×
                            </button>
                        </div>



                        <div className={styles.pricesList}>
                            <div className={styles.emptyPrices}>
                                Пока нет дополнительных цен
                            </div>
                        </div>

                        <button type="button" className={styles.addPriceButton}>
                            <span>Добавить цену</span>
                        </button>
                    </div>

                    <div className={styles.actions}>
                        <div className={styles.actionsContainer}>
                            <Button variant={'secondary'} size={'large'}>
                                Отмена
                            </Button>
                            <Button variant={'primary'} size={'large'}>
                                Создать товар
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}
