class ExcelReader {
    constructor() {
        this.error = '';
    }

    async readExcelFile(file) {
        try {
            const arrayBuffer = await file.arrayBuffer();
            
            // Lire le fichier Excel avec toutes les options
            const workbook = XLSX.read(arrayBuffer, {
                cellStyles: true,
                cellFormulas: true,
                cellDates: true,
                cellNF: true,
                sheetStubs: true
            });

            // Prendre la première feuille
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            // Convertir en JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
                header: 1,
                raw: false,
                dateNF: 'yyyy-mm-dd'
            });

            // Vérifier si nous avons des données
            if (jsonData.length < 2) {
                throw new Error('Le fichier Excel est vide ou ne contient pas assez de données');
            }

            // Trouver les en-têtes (première ligne non vide)
            const headers = jsonData[0];

            // Transformer les données en format attendu par le système
            const processedData = jsonData.slice(1)
                .map(row => {
                    if (row.length === 0) return null;

                    // Créer un objet de service
                    const service = {
                        date: this.formatExcelDate(row[headers.indexOf('Date')] || ''),
                        client: row[headers.indexOf('Client')] || '',
                        services: [{
                            type: row[headers.indexOf('Type de service')] || 'Service standard',
                            quantity: parseFloat(row[headers.indexOf('Quantité')] || 0),
                            unitPrice: parseFloat(row[headers.indexOf('Prix unitaire')] || 0),
                            description: row[headers.indexOf('Description')] || ''
                        }],
                        hasTaxes: row[headers.indexOf('Taxes')] === 'Oui',
                        status: 'pending'
                    };

                    // Calculer les montants
                    const subtotal = service.services[0].quantity * service.services[0].unitPrice;
                    service.total = subtotal;
                    
                    if (service.hasTaxes) {
                        service.taxAmount = subtotal * 0.14975; // TPS (5%) + TVQ (9.975%)
                        service.totalWithTaxes = subtotal + service.taxAmount;
                    }

                    return service;
                })
                .filter(item => item !== null);

            return processedData;
        } catch (err) {
            this.error = `Erreur lors du traitement du fichier: ${err.message}`;
            throw err;
        }
    }

    formatExcelDate(dateString) {
        try {
            const date = new Date(dateString);
            return date.toISOString().split('T')[0];
        } catch {
            return dateString;
        }
    }
}
