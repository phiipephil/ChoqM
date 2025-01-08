class PaymentManager {
    constructor() {
        this.payments = [];
        const stored = localStorage.getItem('payments');
        if (stored) {
            this.payments = JSON.parse(stored);
        }
    }

    async loadPayments() {
        return this.payments;
    }

    async savePayment(payment) {
        payment.id = Date.now().toString();
        this.payments.push(payment);
        localStorage.setItem('payments', JSON.stringify(this.payments));
        return payment;
    }

    clearPayments() {
        this.payments = [];
        localStorage.removeItem('payments');
    }
}
