import { useRegisterSW } from 'virtual:pwa-register/react'

function PWAUpdatePrompt() {
    const {
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r: ServiceWorkerRegistration | undefined) {
            console.log('SW Registered:', r)
        },
        onRegisterError(error: Error) {
            console.log('SW registration error', error)
        },
    })

    if (!needRefresh) return null

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '1.5rem',
                right: '1.5rem',
                zIndex: 9999,
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '1rem',
                padding: '1rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                animation: 'slideUp 0.4s ease-out',
            }}
        >
            <style>{`
        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

            <div style={{ color: '#e2e8f0', fontSize: '0.875rem' }}>
                <strong style={{ color: '#06b6d4' }}>Nouvelle version disponible</strong>
                <br />
                <span style={{ opacity: 0.7 }}>Cliquez pour mettre à jour</span>
            </div>

            <button
                onClick={() => updateServiceWorker(true)}
                style={{
                    background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    whiteSpace: 'nowrap',
                }}
            >
                Mettre à jour
            </button>

            <button
                onClick={() => setNeedRefresh(false)}
                style={{
                    background: 'transparent',
                    color: '#94a3b8',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    padding: '0.25rem',
                    lineHeight: 1,
                }}
                aria-label="Fermer"
            >
                ×
            </button>
        </div>
    )
}

export default PWAUpdatePrompt
