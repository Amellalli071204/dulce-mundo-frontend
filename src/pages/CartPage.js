{showOptions && (
  <div className="payment-options">
    <p>¿Cómo deseas pagar?</p>

    <button
      className="btn-option digital-btn"
      onClick={handleDigitalCheckout}
      disabled={loading}
    >
      Tarjeta, Transferencia, OXXO
    </button>

    {localStorage.getItem('userRole') === 'admin' && (
      <button
        className="btn-option cash-btn"
        onClick={handleCashCheckout}
        disabled={loading}
      >
        Efectivo (Contra Entrega)
      </button>
    )}
  </div>
)}
