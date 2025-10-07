import { Toaster } from "react-hot-toast";

export default function CustomToaster() {
    const backgroundVar = 'var(--card)';
    const foregroundVar = 'var(--foreground)';
    const destructiveVar = 'var(--destructive)';

    const baseStyle = {
        background: backgroundVar,
        color: foregroundVar,
        border: '1px solid var(--border)',
        minWidth: '350px',
        padding: '16px',
    };

    const errorStyle = {
        ...baseStyle,
        background: backgroundVar,
        color: destructiveVar,
        minWidth: '450px',
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