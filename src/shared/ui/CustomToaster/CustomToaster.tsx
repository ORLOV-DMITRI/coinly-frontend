import { Toaster } from "react-hot-toast";

export default function CustomToaster() {
    const backgroundVar = 'var(--card)';
    const foregroundVar = 'var(--foreground)';
    const destructiveVar = 'var(--destructive)';

    const baseStyle = {
        background: backgroundVar,
        color: foregroundVar,
        border: '1px solid var(--border)',
        padding: '16px',
    };

    const errorStyle = {
        ...baseStyle,
        background: backgroundVar,
        color: destructiveVar,
        border: `1px solid ${destructiveVar}`,
    };

    return (
        <Toaster
            position="top-center"
            containerStyle={{
                zIndex: 9999,
            }}
            toastOptions={{
                style: baseStyle,
                className: 'responsiveToast',

                error: {
                    style: errorStyle,
                    iconTheme: {
                        primary: destructiveVar,
                        secondary: backgroundVar,
                    },
                },
                success: {
                    iconTheme: {
                        primary: 'var(--success)',
                        secondary: backgroundVar,
                    }
                }
            }}
        />
    );
}