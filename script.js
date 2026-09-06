/* =========================================================
   WALI MUHAMMAD — OFFICIAL NOVEL STORE
   JAVASCRIPT
========================================================= */

// ================================
// WALI MUHAMMAD — WEBSITE SCRIPT
// ================================

const CONFIG = {
    bookPrice: 1999,
    originalPrice: 2600,

    whatsappNumber: "923XXXXXXXXX",
    instagramUsername: "itsmuhammadfaizan_",
    email: "your-email@gmail.com",

    googleScriptURL:
        "https://script.google.com/macros/s/AKfycbzE8nneKtC21jXg8IhEYXnvqqyU8OvwMIOWFbnrCmcPF9KNNsGHc5zJddAwf-mG2uDxJw/exec",

    bankName: "United Bank Limited (UBL)",
    accountTitle: "Muhammad Faizan",
    accountNumber: "0998335726428",
    iban: "PK32UNIL0109000335726428",

    pdfUrdu:
        "https://drive.google.com/file/d/1s0UkrjSdFMRVGYAhynfW-zTEktzV773S/view?usp=drivesdk",

    pdfEnglish: "#",
    pdfRomanUrdu: "#"
};


// ================================
// DOM ELEMENTS
// ================================

const orderForm = document.getElementById("orderForm");

const quantityInput = document.getElementById("quantity");
const totalPriceInput = document.getElementById("totalPrice");

const summaryQuantity = document.getElementById("summaryQuantity");
const summaryTotal = document.getElementById("summaryTotal");

const orderModal = document.getElementById("orderModal");
const closeModal = document.getElementById("closeModal");

const generatedOrderCode =
    document.getElementById("generatedOrderCode");

const copyOrderCode =
    document.getElementById("copyOrderCode");

const modalInstagram =
    document.getElementById("modalInstagram");

const modalWhatsApp =
    document.getElementById("modalWhatsApp");

const whatsappLink =
    document.getElementById("whatsappLink");

const emailLink =
    document.getElementById("emailLink");

const currentYear =
    document.getElementById("currentYear");


// ================================
// COD WARNING MODAL
// ================================

const codWarningModal =
    document.getElementById("codWarningModal");

const codCancel =
    document.getElementById("codCancel");

const codCancelTop =
    document.getElementById("codCancelTop");

const codContinue =
    document.getElementById("codContinue");

let codConfirmed = false;
let isSubmitting = false;


// ================================
// INITIALIZE WEBSITE
// ================================

document.addEventListener("DOMContentLoaded", function () {

    initializeWebsite();

});


function initializeWebsite() {

    updatePrice();
    updateContactLinks();
    updateBankDetails();
    updatePDFLinks();
    setCurrentYear();

}


// ================================
// PRICE CALCULATION
// ================================

function updatePrice() {

    if (!quantityInput) return;

    let quantity = parseInt(quantityInput.value);

    if (isNaN(quantity) || quantity < 1) {
        quantity = 1;
        quantityInput.value = 1;
    }

    const total = CONFIG.bookPrice * quantity;

    if (summaryQuantity) {
        summaryQuantity.textContent = quantity;
    }

    if (summaryTotal) {
        summaryTotal.textContent =
            `PKR ${total.toLocaleString()}`;
    }

    if (totalPriceInput) {
        totalPriceInput.value = total;
    }
}


// Quantity change

if (quantityInput) {

    quantityInput.addEventListener("input", updatePrice);

    quantityInput.addEventListener("change", updatePrice);

}


// ================================
// ORDER CODE GENERATOR
// ================================

function generateOrderCode() {

    const now = new Date();

    const year = String(now.getFullYear()).slice(-2);

    const month = String(now.getMonth() + 1).padStart(2, "0");

    const day = String(now.getDate()).padStart(2, "0");

    const random =
        Math.floor(1000 + Math.random() * 9000);

    return `WM-${year}${month}${day}-${random}`;
}


// ================================
// PHONE VALIDATION
// ================================

function validatePhoneNumber(phone) {

    if (!phone) return false;

    const cleanedPhone =
        phone.replace(/[\s\-()]/g, "");

    const pakistanPhoneRegex =
        /^(03\d{9}|\+923\d{9}|923\d{9})$/;

    return pakistanPhoneRegex.test(cleanedPhone);
}


function validateOrderPhones() {

    const phoneFields = [
        {
            id: "phone",
            name: "Phone Number"
        },
        {
            id: "whatsapp",
            name: "WhatsApp Number"
        },
        {
            id: "secondPhone",
            name: "Second Phone Number"
        }
    ];

    for (const field of phoneFields) {

        const element =
            document.getElementById(field.id);

        if (!element) continue;

        const value =
            element.value.trim();

        // Optional second phone
        if (
            field.id === "secondPhone" &&
            value === ""
        ) {
            continue;
        }

        if (!validatePhoneNumber(value)) {

            alert(
                `Please enter a valid Pakistani ${field.name}.\n\nExample: 03001234567`
            );

            element.focus();

            return false;
        }
    }

    return true;
}


// ================================
// COD WARNING MODAL
// ================================

function showCodWarning() {

    if (!codWarningModal) return;

    codWarningModal.classList.add("active");

    codWarningModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add("modal-open");
}


function hideCodWarning() {

    if (!codWarningModal) return;

    codWarningModal.classList.remove("active");

    codWarningModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove("modal-open");
}


// Cancel button

if (codCancel) {

    codCancel.addEventListener("click", function () {

        codConfirmed = false;

        hideCodWarning();

    });

}


// Top × button

if (codCancelTop) {

    codCancelTop.addEventListener("click", function () {

        codConfirmed = false;

        hideCodWarning();

    });

}


// Click outside popup

if (codWarningModal) {

    codWarningModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === codWarningModal ||
                event.target.classList.contains("cod-backdrop")
            ) {

                codConfirmed = false;

                hideCodWarning();
            }

        }
    );

}


// ================================
// MAIN FORM SUBMISSION
// ================================

if (orderForm) {

    orderForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            // Prevent double submission
            if (isSubmitting) {
                return;
            }

            // Validate phone numbers first
            if (!validateOrderPhones()) {
                return;
            }

            // Show COD warning before order submission
            if (!codConfirmed) {

                showCodWarning();

                return;
            }

            // Continue with actual order
            submitOrder();

        }
    );

}


// ================================
// YES, CONTINUE
// ================================

if (codContinue) {

    codContinue.addEventListener(
        "click",
        function () {

            // Validate again for safety
            if (!validateOrderPhones()) {
                return;
            }

            codConfirmed = true;

            hideCodWarning();

            submitOrder();

        }
    );

}


// ================================
// ACTUAL ORDER SUBMISSION
// ================================

async function submitOrder() {

    if (!orderForm) return;

    if (isSubmitting) return;

    isSubmitting = true;

    const submitButton =
        orderForm.querySelector(
            ".submit-order-btn"
        );

    const originalButtonText =
        submitButton
            ? submitButton.innerHTML
            : "Place Order";

    try {

        updatePrice();

        const orderCode =
            generateOrderCode();

        const fullName =
            document.getElementById("fullName")?.value.trim() || "";

        const email =
            document.getElementById("email")?.value.trim() || "";

        const phone =
            document.getElementById("phone")?.value.trim() || "";

        const whatsapp =
            document.getElementById("whatsapp")?.value.trim() || "";

        const secondPhone =
            document.getElementById("secondPhone")?.value.trim() || "";

        const address =
            document.getElementById("address")?.value.trim() || "";

        const district =
            document.getElementById("district")?.value.trim() || "";

        const tehsil =
            document.getElementById("tehsil")?.value.trim() || "";

        const quantity =
            parseInt(quantityInput?.value) || 1;

        const note =
            document.getElementById("note")?.value.trim() || "";

        const total =
            CONFIG.bookPrice * quantity;


        // ================================
        // ORDER DATA
        // ================================

        const orderData = {

            orderCode: orderCode,

            fullName: fullName,

            email: email,

            phone: phone,

            whatsapp: whatsapp,

            secondPhone: secondPhone,

            address: address,

            district: district,

            tehsil: tehsil,

            quantity: quantity,

            total: total,

            note: note,

            paymentStatus: "Pending",

            orderStatus: "Order Placed",

            paymentMethod: "Advance Payment",

            cashOnDelivery: "Not Available",

            date: new Date().toISOString()

        };


        // ================================
        // BUTTON LOADING
        // ================================

        if (submitButton) {

            submitButton.disabled = true;

            submitButton.innerHTML =
                "Processing Order...";

        }


        // ================================
        // GOOGLE SHEETS
        // ================================

        if (CONFIG.googleScriptURL) {

            await submitToGoogleSheet(orderData);

        }


        // ================================
        // SAVE LOCALLY
        // ================================

        saveOrderLocally(orderData);


        // ================================
        // SHOW SUCCESS
        // ================================

        showOrderSuccess(orderData);


        // ================================
        // RESET FORM
        // ================================

        orderForm.reset();

        codConfirmed = false;

        updatePrice();


    } catch (error) {

        console.error(
            "Order submission error:",
            error
        );

        alert(
            "Something went wrong while placing your order. Please try again."
        );

        codConfirmed = false;

    } finally {

        isSubmitting = false;

        if (submitButton) {

            submitButton.disabled = false;

            submitButton.innerHTML =
                originalButtonText;

        }

    }

}


// ================================
// GOOGLE SHEETS SUBMISSION
// ================================

async function submitToGoogleSheet(orderData) {

    try {

        await fetch(
            CONFIG.googleScriptURL,
            {
                method: "POST",

                mode: "no-cors",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(orderData)
            }
        );

    } catch (error) {

        console.error(
            "Google Sheets submission error:",
            error
        );

        throw error;

    }

}


// ================================
// SAVE ORDER LOCALLY
// ================================

function saveOrderLocally(orderData) {

    try {

        const existingOrders =
            JSON.parse(
                localStorage.getItem(
                    "waliMuhammadOrders"
                )
            ) || [];

        existingOrders.push(orderData);

        localStorage.setItem(
            "waliMuhammadOrders",
            JSON.stringify(existingOrders)
        );

    } catch (error) {

        console.error(
            "Local storage error:",
            error
        );

    }

}


// ================================
// SUCCESS MODAL
// ================================

function showOrderSuccess(orderData) {

    if (!orderModal) return;

    if (generatedOrderCode) {

        generatedOrderCode.textContent =
            orderData.orderCode;

    }


    // Instagram

    if (modalInstagram) {

        modalInstagram.href =
            `https://instagram.com/${CONFIG.instagramUsername}`;

    }


    // WhatsApp

    const whatsappMessage =
        `Hello Muhammad Faizan, I have placed an order for Wali Muhammad.\n\nOrder Code: ${orderData.orderCode}\nName: ${orderData.fullName}\nQuantity: ${orderData.quantity}\nTotal: PKR ${orderData.total}`;

    const whatsappURL =
        `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(
            whatsappMessage
        )}`;


    if (modalWhatsApp) {

        modalWhatsApp.href =
            whatsappURL;

    }


    orderModal.classList.add("active");

    orderModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add("modal-open");

}


// ================================
// CLOSE SUCCESS MODAL
// ================================

if (closeModal) {

    closeModal.addEventListener(
        "click",
        function () {

            if (!orderModal) return;

            orderModal.classList.remove("active");

            orderModal.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.classList.remove(
                "modal-open"
            );

        }
    );

}


// Click outside success modal

if (orderModal) {

    orderModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === orderModal
            ) {

                orderModal.classList.remove(
                    "active"
                );

                orderModal.setAttribute(
                    "aria-hidden",
                    "true"
                );

                document.body.classList.remove(
                    "modal-open"
                );

            }

        }
    );

}


// ================================
// COPY ORDER CODE
// ================================

if (copyOrderCode) {

    copyOrderCode.addEventListener(
        "click",
        async function () {

            const code =
                generatedOrderCode?.textContent.trim();

            if (!code) return;

            try {

                await navigator.clipboard.writeText(
                    code
                );

                copyOrderCode.textContent =
                    "Copied!";

                setTimeout(
                    function () {

                        copyOrderCode.textContent =
                            "Copy Order Code";

                    },
                    2000
                );

            } catch (error) {

                console.error(
                    "Copy failed:",
                    error
                );

            }

        }
    );

}


// ================================
// CONTACT LINKS
// ================================

function updateContactLinks() {

    if (whatsappLink) {

        const url =
            `https://wa.me/${CONFIG.whatsappNumber}`;

        whatsappLink.href = url;

    }


    if (emailLink) {

        emailLink.href =
            `mailto:${CONFIG.email}`;

    }

}


// ================================
// BANK DETAILS
// ================================

function updateBankDetails() {

    const bankName =
        document.getElementById("bankName");

    const accountTitle =
        document.getElementById("accountTitle");

    const accountNumber =
        document.getElementById("accountNumber");

    const iban =
        document.getElementById("iban");


    if (bankName) {

        bankName.textContent =
            CONFIG.bankName;

    }

    if (accountTitle) {

        accountTitle.textContent =
            CONFIG.accountTitle;

    }

    if (accountNumber) {

        accountNumber.textContent =
            CONFIG.accountNumber;

    }

    if (iban) {

        iban.textContent =
            CONFIG.iban;

    }

}


// ================================
// PDF LINKS
// ================================

function updatePDFLinks() {

    const pdfUrdu =
        document.getElementById("pdfUrdu");

    const pdfEnglish =
        document.getElementById("pdfEnglish");

    const pdfRomanUrdu =
        document.getElementById("pdfRomanUrdu");


    if (pdfUrdu) {

        pdfUrdu.href =
            CONFIG.pdfUrdu;

    }


    if (
        pdfEnglish &&
        CONFIG.pdfEnglish !== "#"
    ) {

        pdfEnglish.href =
            CONFIG.pdfEnglish;

    }


    if (
        pdfRomanUrdu &&
        CONFIG.pdfRomanUrdu !== "#"
    ) {

        pdfRomanUrdu.href =
            CONFIG.pdfRomanUrdu;

    }

}


// ================================
// CURRENT YEAR
// ================================

function setCurrentYear() {

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }

}


// ================================
// ESCAPE KEY FOR MODALS
// ================================

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") {
            return;
        }


        // COD warning

        if (
            codWarningModal &&
            codWarningModal.classList.contains("active")
        ) {

            codConfirmed = false;

            hideCodWarning();

        }


        // Success modal

        if (
            orderModal &&
            orderModal.classList.contains("active")
        ) {

            orderModal.classList.remove(
                "active"
            );

            orderModal.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.classList.remove(
                "modal-open"
            );

        }

    }
);
console.log(
    "Wali Muhammad Official Novel Store loaded successfully."
);
