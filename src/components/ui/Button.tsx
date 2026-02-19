import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = ({ variant = 'primary', size = 'md', style, children, ...props }: ButtonProps) => {
    const getBackgroundColor = () => {
        switch (variant) {
            case 'primary': return 'var(--primary-color)';
            case 'danger': return 'var(--danger-color)';
            case 'ghost': return 'transparent';
            case 'secondary': return 'rgba(255, 255, 255, 0.1)';
            default: return 'var(--primary-color)';
        }
    };

    const getColor = () => {
        if (variant === 'ghost') return 'var(--text-secondary)';
        return 'white';
    };

    const getPadding = () => {
        switch (size) {
            case 'sm': return '8px 16px';
            case 'lg': return '16px 32px';
            default: return '12px 24px';
        }
    };

    return (
        <button
            style={{
                backgroundColor: getBackgroundColor(),
                color: getColor(),
                padding: getPadding(),
                borderRadius: '8px',
                fontWeight: 500,
                transition: 'opacity 0.2s',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                ...style
            }}
            {...props}
        >
            {children}
        </button>
    );
};
