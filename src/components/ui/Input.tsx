import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = ({ label, error, style, ...props }: InputProps) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {label && <label style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{label}</label>}
            <input
                style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: error ? '1px solid var(--danger-color)' : '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    ...style
                }}
                {...props}
            />
            {error && <span style={{ fontSize: '12px', color: 'var(--danger-color)' }}>{error}</span>}
        </div>
    );
};
