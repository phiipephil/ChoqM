window.PaymentManager = class PaymentManager {
    constructor() {
        this.payments = [];
        this.loadFromStorage();
    }

    loadFromStorage() {
        try {
            const stored = localStorage.getItem('payments');
            if (stored) {
                this.payments = JSON.parse(stored);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des paiements:', error);
            this.payments = [];
        }
    }

    async loadPayments() {
        return [...this.payments];
    }

    async savePayment(payment) {
        try {
            payment.id = Date.now().toString();
            payment.createdAt = new Date().toISOString();
            this.payments.push(payment);
            localStorage.setItem('payments', JSON.stringify(this.payments));
            return payment;
        } catch (error) {
            console.error('Erreur lors de la sauvegarde du paiement:', error);
            throw error;
        }
    }

    clearPayments() {
        this.payments = [];
        localStorage.removeItem('payments');
    }
}
