class PaymentManager {
    constructor() {
        this.payments = [];
        this.loadPayments();
    }

    async loadPayments() {
        try {
            const response = await fetch('data/payments.json');
            const data = await response.json();
            this.payments = data.payments;
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
            const response = await fetch('data/payments.json', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ payments: this.payments })
            });
            if (!response.ok) throw new Error('Erreur lors de la sauvegarde');
        } catch (error) {
            console.error('Erreur lors de la sauvegarde du fichier:', error);
            throw error;
        }
    }
}
