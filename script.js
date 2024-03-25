// Function to save invoice
function saveInvoice() {
    const invoiceNumber = getInvoiceNumber();
    const customerName = document.getElementById('customer-name').value;
    const customerEmail = document.getElementById('customer-email').value;
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;

    // Save invoice data to local storage
    const invoiceData = {
        invoiceNumber: invoiceNumber,
        customerName: customerName,
        customerEmail: customerEmail,
        description: description,
        amount: amount
    };
    localStorage.setItem('invoice_' + invoiceNumber, JSON.stringify(invoiceData));

    // Update invoice number on the page
    document.getElementById('invoice-number').innerText = invoiceNumber;

    // Clear input fields
    document.getElementById('customer-name').value = '';
    document.getElementById('customer-email').value = '';
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';

    // Redirect to history page
    window.location.href = 'history.html';
}

// Function to generate invoice number
function getInvoiceNumber() {
    let invoiceNumber = localStorage.getItem('lastInvoiceNumber');
    if (!invoiceNumber) {
        invoiceNumber = 1;
    } else {
        invoiceNumber = parseInt(invoiceNumber) + 1;
    }
    localStorage.setItem('lastInvoiceNumber', invoiceNumber);
    return invoiceNumber;
}

// Function to export invoice as PDF
function exportAsPDF() {
    // Assuming you have implemented PDF generation on the server side
    // Here you would typically make an AJAX request to the server to generate the PDF

    // For demonstration, let's just open the email app with the invoice data as a draft
    const invoiceData = {
        customerName: document.getElementById('customer-name').value,
        customerEmail: document.getElementById('customer-email').value,
        description: document.getElementById('description').value,
        amount: document.getElementById('amount').value
    };

    const subject = `Invoice for ${invoiceData.customerName}`;
    const body = `
        Dear ${invoiceData.customerName},

        Please find attached the invoice for your recent purchase. 
        Description: ${invoiceData.description}
        Amount: ${invoiceData.amount}

        Sincerely,
        [Your Company Name]
    `;

    const mailtoLink = `mailto:${invoiceData.customerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open default email app
    window.location.href = mailtoLink;
}

// Function to display invoice history
function displayInvoiceHistory() {
    const invoiceHistoryDiv = document.getElementById('invoice-history');
    invoiceHistoryDiv.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('invoice_')) {
            const invoiceData = JSON.parse(localStorage.getItem(key));
            const invoiceItemDiv = document.createElement('div');
            invoiceItemDiv.classList.add('invoice-item');
            invoiceItemDiv.innerHTML = `
                <strong>Invoice Number:</strong> ${invoiceData.invoiceNumber}<br>
                <strong>Customer Name:</strong> ${invoiceData.customerName}<br>
                <strong>Customer Email:</strong> ${invoiceData.customerEmail}<br>
                <strong>Description:</strong> ${invoiceData.description}<br>
                <strong>Amount:</strong> ${invoiceData.amount}<br>
            `;
            invoiceHistoryDiv.appendChild(invoiceItemDiv);
        }
    }
}

// Function to open invoice in print view
function openPrintView() {
    window.print();
}

