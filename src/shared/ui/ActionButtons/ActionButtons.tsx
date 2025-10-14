import styles from './ActionButtons.module.scss'
import Button from "@/shared/ui/Button/Button";
import {useRouter} from "next/navigation";


type Props = {
    isDisabled: boolean;
    submitLabel: string
    isSubmitLabel: string
}

export default function ActionButtons({isDisabled, submitLabel, isSubmitLabel}:Props) {
    const router = useRouter()
    return (
        <div className={styles.actions}>
            <div className={styles.actionsContainer}>
                <Button
                    type="button"
                    variant={'secondary'}
                    size={'large'}
                    onClick={() => router.back()}
                    disabled={isDisabled}
                >
                    Отмена
                </Button>
                <Button
                    type="submit"
                    variant={'primary'}
                    size={'large'}
                    loading={isDisabled}
                >
                    {isDisabled ? isSubmitLabel : submitLabel}
                </Button>
            </div>
        </div>
    );
}
