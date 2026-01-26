document.addEventListener("DOMContentLoaded", () => {

    
    const categoryPrices = [
        { keyword: ["earbud", "headphone", "boat", "noise", "boult"], price: "₹1,499" },
        { keyword: ["watch"], price: "₹2,999" },
        { keyword: ["shoe", "footwear"], price: "₹1,999" },
        { keyword: ["clothing", "fashion", "dress"], price: "₹1,299" },
        { keyword: ["curtain"], price: "₹699" },
        { keyword: ["bedsheet"], price: "₹499" },
        { keyword: ["light", "lamp"], price: "₹1,199" },
        { keyword: ["ac"], price: "₹29,999" },
        { keyword: ["fridge"], price: "₹18,999" },
        { keyword: ["oven", "microwave"], price: "₹6,999" },
        { keyword: ["washing"], price: "₹21,999" },
        { keyword: ["home", "decor", "cushion", "storage"], price: "₹999" }
    ];

    const DEFAULT_PRICE = "₹899";

    
    const style = document.createElement("style");
    style.innerHTML = `
        .overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.65);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }

        .popup {
            background: white;
            padding: 25px;
            border-radius: 15px;
            width: 360px;
            text-align: center;
            font-family: Arial, sans-serif;
            animation: scaleIn 0.3s ease;
        }

        .popup img {
            width: 200px;
            margin-bottom: 15px;
        }

        .popup h3 {
            font-size: 20px;
            margin: 10px 0;
        }

        .popup p {
            font-size: 18px;
            font-weight: bold;
            color: green;
        }

        .popup button {
            margin-top: 20px;
            padding: 10px 25px;
            border: none;
            background: #f0c14b;
            border-radius: 20px;
            cursor: pointer;
        }

        @keyframes scaleIn {
            from { transform: scale(0.85); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

   
    const getPrice = (text) => {
        text = text.toLowerCase();

        for (let category of categoryPrices) {
            if (category.keyword.some(word => text.includes(word))) {
                return category.price;
            }
        }
        return DEFAULT_PRICE;
    };

    
    const showPopup = (img) => {
        const overlay = document.createElement("div");
        overlay.className = "overlay";

        const popup = document.createElement("div");
        popup.className = "popup";

        const name = img.alt || "Amazon Product";
        const price = getPrice(name + img.src);

        popup.innerHTML = `
            <img src="${img.src}">
            <h3>${name}</h3>
            <p>${price}</p>
            <button>Close</button>
        `;

        overlay.appendChild(popup);
        document.body.appendChild(overlay);

        popup.querySelector("button").onclick = () => overlay.remove();
        overlay.onclick = (e) => e.target === overlay && overlay.remove();
    };

    
    document.querySelectorAll("img").forEach(img => {
        img.style.cursor = "pointer";
        img.addEventListener("click", () => showPopup(img));
    });

});
