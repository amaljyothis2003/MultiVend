export default function LoadingSpinner() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      backgroundColor: 'white',
      minHeight: '60vh'
    }}>
      <div style={{
        width: '60px',
        height: '60px',
        border: '4px solid #e5e7eb',
        borderTop: '4px solid #3b82f6',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '1.5rem'
      }} />
      <p style={{
        fontSize: '1.125rem',
        color: '#6b7280',
        margin: 0,
        fontWeight: '500'
      }}>
        Loading...
      </p>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `
      }} />
    </div>
  );
}

export function LoadingCard() {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
    }}>
      <div style={{
        height: '200px',
        backgroundColor: '#f3f4f6'
      }} />
      <div style={{ padding: '1.5rem' }}>
        <div style={{
          height: '20px',
          backgroundColor: '#f3f4f6',
          borderRadius: '4px',
          marginBottom: '0.75rem'
        }} />
        <div style={{
          height: '16px',
          backgroundColor: '#f3f4f6',
          borderRadius: '4px',
          width: '60%',
          marginBottom: '1rem'
        }} />
        <div style={{
          height: '24px',
          backgroundColor: '#f3f4f6',
          borderRadius: '4px',
          width: '40%'
        }} />
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: .5;
            }
          }
        `
      }} />
    </div>
  );
}
