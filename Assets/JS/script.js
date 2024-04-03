document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const orderForm = document.getElementById('orderForm');
    const itemCounter = document.querySelector('.item-counter');
    const totalBill = document.getElementById('totalBill');
    const cashGivenInput = document.getElementById('cashGiven');
    const nameInput = document.getElementById('name');
    const addressInput = document.getElementById('address');
    const contactNumberInput = document.getElementById('contactNumber');

    
    // Prices for different items
    const prices = {
        turon: 15.00,
        bananacue: 20.00,
        siomai: 35.00,
        kwekkwek: 12.00,
    };

    // Function to update order details based on user input
    function updateOrderDetails() {
        let totalQty = 0;
        let total = 0;

        // Calculate total quantity and total bill from order form
        Array.from(orderForm.elements).forEach(input => {
            if (input.type === "number" && input.name !== "totalBill" && input.name !== "cashGiven") {
                totalQty += parseInt(input.value, 10);
                total += parseInt(input.value, 10) * prices[input.name];
            }
        });

        // Calculate total quantity and total bill from customer information form
        totalQty += parseInt(nameInput.value ? 1 : 0); // Assume each customer information field represents 1 quantity
        totalQty += parseInt(addressInput.value ? 1 : 0);
        totalQty += parseInt(contactNumberInput.value ? 1 : 0);
        total += parseInt(nameInput.value ? 15 : 0); // Assume fixed price for each customer information field
        total += parseInt(addressInput.value ? 20 : 0);
        total += parseInt(contactNumberInput.value ? 25 : 0); // Assuming a fixed price for contact number

        itemCounter.textContent = totalQty;
        totalBill.value = total.toFixed(2);
        updateCashChange();
    }

    // Function to calculate cash change
    function updateCashChange() {
        const cashGiven = parseFloat(cashGivenInput.value);
        const totalAmount = parseFloat(totalBill.value);
        const cashChange = cashGiven - totalAmount;
        if (!isNaN(cashChange)) {
            document.getElementById('cashChange').textContent = `₱${cashChange.toFixed(2)}`;
        }
        updatePayment();
    }

    // Function to update payment amount in modal
    function updatePayment() {
        const cashGiven = parseFloat(cashGivenInput.value);
        if (!isNaN(cashGiven)) {
            modalPayment.textContent = `₱${cashGiven.toFixed(2)}`;
        } else {
            modalPayment.textContent = "";
        }
    }

    // Event listeners for order form
    orderForm.addEventListener('input', updateOrderDetails);
    cashGivenInput.addEventListener('input', updateCashChange);

    // Event listeners for customer information form
    nameInput.addEventListener('input', updateOrderDetails);
    addressInput.addEventListener('input', updateOrderDetails);
    contactNumberInput.addEventListener('input', updateOrderDetails);

    orderForm.addEventListener('input', updateOrderDetails);
    cashGivenInput.addEventListener('input', updateCashChange);

    // Event listeners for customer information form
    nameInput.addEventListener('input', updateOrderDetails);
    addressInput.addEventListener('input', updateOrderDetails);
    contactNumberInput.addEventListener('input', updateOrderDetails);

    // Define modalPayment for updating payment amount in the sales invoice
    const modalPayment = document.getElementById('modalPayment');
    
    // Event listener for submit button
    const submitButton = document.getElementById('submitCustomerInfo');
    submitButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission

        // Retrieve customer information
        const name = nameInput.value;
        const address = addressInput.value;
        const contactNumber = contactNumberInput.value;
        const totalBillValue = parseFloat(totalBill.value).toFixed(2);
        const cashGivenValue = parseFloat(cashGivenInput.value).toFixed(2);
        const change = (cashGivenValue - totalBillValue).toFixed(2);

        // Open a new window for the sales invoice
        const salesInvoiceWindow = window.open('', 'Sales Invoice', 'width=600,height=400');
        salesInvoiceWindow.document.write(`
            <html>
            <head>
                <title>Sales Invoice</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    .invoice-container { margin: 20px; }
                    .invoice-heading { font-size: 20px; margin-bottom: 10px; }
                    .invoice-details { margin-bottom: 20px; }
                    .invoice-details p { margin: 5px 0; }
                </style>
            </head>
            <body>
                <div class="invoice-container">
                    <div class="invoice-heading">Sales Invoice</div>
                    <div class="invoice-details">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Address:</strong> ${address}</p>
                        <p><strong>Contact Number:</strong> ${contactNumber}</p>
                        <p><strong>Total Bill:</strong> ₱${totalBillValue}</p>
                        <p><strong>Payment:</strong> ₱${cashGivenValue}</p>
                        <p><strong>Change:</strong> ₱${change}</p>
                    </div>
                </div>
            </body>
            </html>
        `);
    });

    // Event listener for reset button
    const resetButton = document.getElementById('resetCustomerInfo');
    resetButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission

        // Reset customer information form
        document.getElementById('customerInfoForm').reset();
    });
});

