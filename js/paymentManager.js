const DEFAULT_PAYMENTS = [
    {
        id: "1",
        date: "2025-01-08",
        client: "CHOQ MÉDIA",
        services: [{
            type: "Heure standard",
            quantity: 1,
            unitPrice: 25.00,
            description: "Animation émission"
        }],
        total: 25.00,
        taxAmount: 3.74,
        totalWithTaxes: 28.74,
        hasTaxes: true,
        status: "pending",
        approvedBy: null,
        paymentDate: null
    }
];

class PaymentManager {
    constructor() {
        this.payments = [...DEFAULT_PAYMENTS];
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
