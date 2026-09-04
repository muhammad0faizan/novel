/* =========================================================
   WALI MUHAMMAD — OFFICIAL NOVEL STORE
   JAVASCRIPT
========================================================= */


/* =========================================================
   WEBSITE CONFIGURATION
   صرف یہ values بعد میں اپنی اصل details سے replace کرنی ہیں
========================================================= */

const CONFIG = {

    // Novel pricing
    bookPrice: 1999,
    originalPrice: 2600,

    // WhatsApp number
    // Example: 923001234567
    whatsappNumber: "923XXXXXXXXX",

    // Author Instagram
    instagramUsername: "itsmuhammadfaizan_",

    // Author Gmail
    email: "your-email@gmail.com",

    // Google Apps Script Web App URL
    // بعد میں یہاں اپنی Google Apps Script URL لگائیں گے
    googleScriptURL: "https://script.google.com/macros/s/AKfycbzE8nneKtC21jXg8IhEYXnvqqyU8OvwMIOWFbnrCmcPF9KNNsGHc5zJddAwf-mG2uDxJw/exec",

    // Bank details
    bankName: "United Bank Limited (UBL)",
    accountTitle: "Muhammad Faizan",
    accountNumber: "0998335726428",
    iban: "PK32UNIL0109000335726428",

    // PDF links
    pdfUrdu: "https://drive.google.com/file/d/1s0UkrjSdFMRVGYAhynfW-zTEktzV773S/view?usp=drivesdk",
    pdfEnglish: "#",
    pdfRomanUrdu: "#"
};


/* =========================================================
   DOM ELEMENTS
========================================================= */

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


/* =========================================================
   PAGE INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeWebsite();

});


function initializeWebsite() {

    updatePrice();

    updateContactLinks();

    updateBankDetails();

    updatePDFLinks();

    setCurrentYear();

}


/* =========================================================
   CURRENT YEAR
========================================================= */

function setCurrentYear() {

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }

}


/* =========================================================
   PRICE CALCULATION
========================================================= */

function updatePrice() {

    if (!quantityInput) return;

    const quantity =
        parseInt(quantityInput.value) || 1;

    const total =
        CONFIG.bookPrice * quantity;


    /* Form price */

    if (totalPriceInput) {

        totalPriceInput.value =
            formatPrice(total);

    }


    /* Summary quantity */

    if (summaryQuantity) {

        summaryQuantity.textContent =
            quantity;

    }


    /* Summary total */

    if (summaryTotal) {

        summaryTotal.textContent =
            formatPrice(total);

    }

}


/* =========================================================
   PRICE FORMAT
========================================================= */

function formatPrice(amount) {

    return "Rs. " +
        Number(amount).toLocaleString("en-PK");

}


/* =========================================================
   QUANTITY CHANGE
========================================================= */

if (quantityInput) {

    quantityInput.addEventListener(
        "change",
        updatePrice
    );

    quantityInput.addEventListener(
        "input",
        updatePrice
    );

}


/* =========================================================
   GENERATE UNIQUE ORDER CODE
========================================================= */

function generateOrderCode() {

    const now =
        new Date();

    const year =
        String(now.getFullYear()).slice(-2);

    const month =
        String(now.getMonth() + 1).padStart(2, "0");

    const day =
        String(now.getDate()).padStart(2, "0");

    const random =
        Math.floor(
            1000 + Math.random() * 9000
        );

    return `WM-${year}${month}${day}-${random}`;

}


/* =========================================================
   FORM SUBMISSION
========================================================= */

if (orderForm) {

    orderForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* Make sure price is updated */

            updatePrice();


            /* Generate order code */

            const orderCode =
                generateOrderCode();


            /* Get form values */

            const fullName =
                document.getElementById("fullName").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const whatsapp =
                document.getElementById("whatsapp").value.trim();

            const secondPhone =
                document.getElementById("secondPhone").value.trim();

            const address =
                document.getElementById("address").value.trim();

            const district =
                document.getElementById("district").value.trim();

            const tehsil =
                document.getElementById("tehsil").value.trim();

            const quantity =
                parseInt(
                    document.getElementById("quantity").value
                ) || 1;

            const note =
                document.getElementById("note").value.trim();


            /* Total */

            const total =
                CONFIG.bookPrice * quantity;


            /* Order data */

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

                pricePerBook: CONFIG.bookPrice,

                originalPrice: CONFIG.originalPrice,

                totalPrice: total,

                specialNote: note,

                paymentStatus: "Pending",

                orderStatus: "Order Placed",

                orderDate:
                    new Date().toLocaleString("en-PK")

            };


            /* Disable button */

            const submitButton =
                orderForm.querySelector(
                    ".submit-order-btn"
                );

            const originalButtonText =
                submitButton.textContent;


            submitButton.disabled = true;

            submitButton.textContent =
                "Submitting Order...";


            try {

                /*
                 * Send order to Google Apps Script
                 *
                 * اگر Google Script URL ابھی empty ہے
                 * تو website local mode میں چل جائے گی۔
                 */

                if (CONFIG.googleScriptURL) {

                    await submitToGoogleSheet(
                        orderData
                    );

                }


                /* Save locally as backup */

                saveOrderLocally(orderData);


                /* Show success modal */

                showOrderSuccess(
                    orderData
                );


                /* Reset form */

                orderForm.reset();

                updatePrice();


            } catch (error) {

                console.error(
                    "Order submission error:",
                    error
                );


                alert(
                    "Order submit کرتے وقت مسئلہ آیا ہے۔ براہِ کرم دوبارہ کوشش کریں۔"
                );


            } finally {

                submitButton.disabled = false;

                submitButton.textContent =
                    originalButtonText;

            }

        }
    );

}


/* =========================================================
   SEND DATA TO GOOGLE SHEET
========================================================= */

async function submitToGoogleSheet(orderData) {

    const response =
        await fetch(
            CONFIG.googleScriptURL,
            {

                method: "POST",

                mode: "no-cors",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(orderData)

            }
        );


    /*
     * no-cors response کو browser read نہیں کر سکتا،
     * لیکن request Google Script تک پہنچ جائے گی۔
     */

    return response;

}


/* =========================================================
   SAVE ORDER LOCALLY
========================================================= */

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


/* =========================================================
   SHOW ORDER SUCCESS MODAL
========================================================= */

function showOrderSuccess(orderData) {

    if (!orderModal) return;


    /* Order code */

    generatedOrderCode.textContent =
        orderData.orderCode;


    /* Instagram URL */

    const instagramURL =
        `https://instagram.com/${CONFIG.instagramUsername}`;


    modalInstagram.href =
        instagramURL;


    /*
     * WhatsApp confirmation message
     */

    const whatsappMessage =
        `Assalam-o-Alaikum, I have placed an order for Wali Muhammad.

Order Code: ${orderData.orderCode}

Name: ${orderData.fullName}

Quantity: ${orderData.quantity}

Total: Rs. ${orderData.totalPrice.toLocaleString("en-PK")}

I am sending my payment proof for order confirmation.`;


    const whatsappURL =
        `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(
            whatsappMessage
        )}`;


    modalWhatsApp.href =
        whatsappURL;


    /* Open modal */

    orderModal.classList.add("active");

    orderModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function hideOrderModal() {

    if (!orderModal) return;


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


if (closeModal) {

    closeModal.addEventListener(
        "click",
        hideOrderModal
    );

}


/* =========================================================
   CLOSE MODAL BY BACKDROP
========================================================= */

if (orderModal) {

    orderModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target.classList.contains(
                    "modal-backdrop"
                )
            ) {

                hideOrderModal();

            }

        }
    );

}


/* =========================================================
   ESC KEY CLOSE MODAL
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            orderModal &&
            orderModal.classList.contains("active")
        ) {

            hideOrderModal();

        }

    }
);


/* =========================================================
   COPY ORDER CODE
========================================================= */

if (copyOrderCode) {

    copyOrderCode.addEventListener(
        "click",
        async function () {

            const code =
                generatedOrderCode.textContent.trim();


            try {

                await navigator.clipboard.writeText(
                    code
                );


                const originalText =
                    copyOrderCode.textContent;


                copyOrderCode.textContent =
                    "Copied ✓";


                setTimeout(
                    () => {

                        copyOrderCode.textContent =
                            originalText;

                    },
                    1500
                );


            } catch (error) {

                /*
                 * Fallback for older browsers
                 */

                const tempInput =
                    document.createElement("input");

                tempInput.value =
                    code;

                document.body.appendChild(
                    tempInput
                );

                tempInput.select();

                document.execCommand(
                    "copy"
                );

                tempInput.remove();


                copyOrderCode.textContent =
                    "Copied ✓";


                setTimeout(
                    () => {

                        copyOrderCode.textContent =
                            "Copy Code";

                    },
                    1500
                );

            }

        }
    );

}


/* =========================================================
   CONTACT LINKS
========================================================= */

function updateContactLinks() {

    /*
     * WhatsApp
     */

    if (whatsappLink) {

        const message =
            "Assalam-o-Alaikum, I have placed an order for Wali Muhammad. Please guide me regarding order confirmation.";

        whatsappLink.href =
            `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(
                message
            )}`;

    }


    /*
     * Email
     */

    if (emailLink) {

        emailLink.href =
            `mailto:${CONFIG.email}`;

    }

}


/* =========================================================
   BANK DETAILS
========================================================= */

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


/* =========================================================
   PDF LINKS
========================================================= */

function updatePDFLinks() {

    const pdfCards =
        document.querySelectorAll(
            ".pdf-card"
        );


    if (pdfCards.length >= 3) {

        pdfCards[0].href =
            CONFIG.pdfUrdu;

        pdfCards[1].href =
            CONFIG.pdfEnglish;

        pdfCards[2].href =
            CONFIG.pdfRomanUrdu;

    }

}


/* =========================================================
   PHONE NUMBER BASIC VALIDATION
========================================================= */

function validatePhoneNumber(number) {

    /*
     * Pakistan mobile number:
     * 03XXXXXXXXX
     * or
     * +923XXXXXXXXX
     */

    const pattern =
        /^(03\d{9}|\+923\d{9}|923\d{9})$/;

    return pattern.test(
        number.replace(/\s+/g, "")
    );

}


/* =========================================================
   PHONE VALIDATION ON SUBMIT
========================================================= */

if (orderForm) {

    orderForm.addEventListener(
        "submit",
        function (event) {

            const phone =
                document.getElementById(
                    "phone"
                ).value.trim();

            const whatsapp =
                document.getElementById(
                    "whatsapp"
                ).value.trim();

            const secondPhone =
                document.getElementById(
                    "secondPhone"
                ).value.trim();


            if (!validatePhoneNumber(phone)) {

                event.preventDefault();

                alert(
                    "براہِ کرم درست Phone Number درج کریں۔ مثال: 03001234567"
                );

                document
                    .getElementById("phone")
                    .focus();

                return;

            }


            if (!validatePhoneNumber(whatsapp)) {

                event.preventDefault();

                alert(
                    "براہِ کرم درست WhatsApp Number درج کریں۔ مثال: 03001234567"
                );

                document
                    .getElementById("whatsapp")
                    .focus();

                return;

            }


            if (!validatePhoneNumber(secondPhone)) {

                event.preventDefault();

                alert(
                    "براہِ کرم درست Second Phone Number درج کریں۔"
                );

                document
                    .getElementById("secondPhone")
                    .focus();

                return;

            }

        }
    );

}


/* =========================================================
   NAVIGATION ACTIVE EFFECT
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navigationLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


window.addEventListener(
    "scroll",
    () => {

        let currentSection = "";


        sections.forEach(
            section => {

                const sectionTop =
                    section.offsetTop - 120;

                const sectionHeight =
                    section.offsetHeight;


                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY <
                    sectionTop + sectionHeight
                ) {

                    currentSection =
                        section.getAttribute("id");

                }

            }
        );


        navigationLinks.forEach(
            link => {

                link.classList.remove(
                    "active"
                );


                if (
                    link.getAttribute("href") ===
                    `#${currentSection}`
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);


/* =========================================================
   PREVENT ACCIDENTAL DOUBLE SUBMISSION
========================================================= */

let isSubmitting = false;

if (orderForm) {

    orderForm.addEventListener(
        "submit",
        function () {

            if (isSubmitting) {

                return;

            }

            isSubmitting = true;


            setTimeout(
                () => {

                    isSubmitting = false;

                },
                5000
            );

        }
    );

}


/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(
    "Wali Muhammad Official Novel Store loaded successfully."
);
