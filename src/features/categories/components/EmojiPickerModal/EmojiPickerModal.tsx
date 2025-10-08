import styles from './EmojiPickerModal.module.scss';
import Modal from '@/shared/ui/Modal/Modal';
import Input from '@/shared/ui/Input/Input';
import Button from '@/shared/ui/Button/Button';
import { EMOJI_CATEGORIES } from '@/features/categories/constants/emojis';
import { useState } from 'react';
import cn from 'classnames';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    selectedEmoji: string;
    onSelect: (emoji: string) => void;
};

export default function EmojiPickerModal({ isOpen, onClose, selectedEmoji, onSelect }: Props) {
    const [customEmoji, setCustomEmoji] = useState('');

    const handleEmojiClick = (emoji: string) => {
        onSelect(emoji);
        onClose();
    };

    const handleCustomEmojiSubmit = () => {
        if (customEmoji.trim()) {
            onSelect(customEmoji.trim());
            setCustomEmoji('');
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Выбрать эмодзи">
            <div className={styles.content}>
                {EMOJI_CATEGORIES.map((category) => (
                    <div key={category.label} className={styles.categoryGroup}>
                        <div className={styles.categoryLabel}>{category.label}</div>
                        <div className={styles.emojiGrid}>
                            {category.emojis.map((emoji) => (
                                <button
                                    key={emoji}
                                    type="button"
                                    className={cn(styles.emojiButton, selectedEmoji === emoji && styles.selected)}
                                    onClick={() => handleEmojiClick(emoji)}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                <div className={styles.divider}>или</div>

                <div>
                    <label className={styles.label}>Свой эмодзи</label>
                    <Input
                        type="text"
                        className={styles.customEmojiInput}
                        placeholder="😀"
                        value={customEmoji}
                        onChange={(e) => setCustomEmoji(e.target.value)}
                        maxLength={2}
                    />
                    <div className={styles.hint}>Введи любой эмодзи с клавиатуры</div>
                </div>

                <Button
                    variant="primary"
                    size="large"
                    className={styles.submitBtn}
                    onClick={handleCustomEmojiSubmit}
                    disabled={!customEmoji.trim()}
                >
                    Готово
                </Button>
            </div>
        </Modal>
    );
}
