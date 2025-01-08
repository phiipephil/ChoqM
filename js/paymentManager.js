class PaymentManager {
    constructor() {
        this.payments = [];
        this.loadPayments();
    }

    async loadPayments() {
        try {
            const stored = localStorage.getItem('payments');
            if (stored) {
                this.payments = JSON.parse(stored);
            } else {
                this.payments = [];
                localStorage.setItem('payments', JSON.stringify(this.payments));
            }
            return this.payments;
        } catch (error) {
            console.error('Erreur lors du chargement des paiements:', error);
            return [];
        }
    }

    async savePayment(payment) {
        try {
            payment.id = this.generateId();
            this.payments.push(payment);
            await this.saveToFile();
            return payment;
        } catch (error) {
            console.error('Erreur lors de la sauvegarde du paiement:', error);
            throw error;
        }
    }

    generateId() {
        return Date.now().toString();
    }

    async saveToFile() {
        try {
            localStorage.setItem('payments', JSON.stringify(this.payments));
        } catch (error) {
            console.error('Erreur lors de la sauvegarde du fichier:', error);
            throw error;
        }
    }
}
