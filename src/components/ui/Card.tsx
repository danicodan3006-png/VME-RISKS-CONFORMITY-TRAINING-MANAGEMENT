import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    children: React.ReactNode;
}

export const Card = ({ title, children, style, ...props }: CardProps) => {
    return (
        <div
            style={{
                backgroundColor: 'var(--surface-color)',
                ...style // Allow style override (e.g. padding, shadow, border)
            }}
            {...props}
        >
            {title && (
                <h3 style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'var(--primary-color)',
                    marginBottom: '16px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                }}>
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
};
