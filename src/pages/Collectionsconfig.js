// pages/collectionsConfig.js
// Bu fayl "data" deyil - hər kolleksiya səhifəsinin necə göstəriləcəyini müəyyən edir
// (hansı banner şəkli, hansı filterlər). Ona görə API-dan yox, buradan gəlir.

export const bannerImages = {
    "camera-gear": "/image/collections/Camera-GearBanner.webp",
    "clips": "/image/collections/Clips-Banner.webp",
    "straps": "/image/collections/Straps-Banner.webp",
    "tripods": "/image/collections/Tripods-Banner.webp",
    "camera-bags": "/image/collections/Camera-Bags-Banner.webp",
    "protection": "/image/collections/Protection-Banner.webp",

    "luggage": "/image/collections/Luggage-Banner.webp",
    "travel-bag": "/image/collections/Travel-Bags-Banner.webp",
    "packing-cubes": "/image/collections/Packing-Cubes-Banner.webp",
    "bag-accessories": "/image/collections/Bag-Accessories-Banner.webp",

    "bags": "/image/collections/Bag-Banner.webp",
    "backpacks": "/image/collections/Backpacks-Banner.webp",
    "duffels": "/image/collections/Duffels-Banner.webp",
    "slings": "/image/collections/Slings-Banner.webp",
    "tote-bags": "/image/collections/Totes-Banner.webp",

    "mobile": "/image/collections/Mobile-Banner.webp",
    "phone-cases": "/image/collections/Phonecase-Banner.webp",
    "phone-accessories": "/image/collections/phone-acc-banner.webp",
    "mounts": "/image/collections/Phone-Mounts-Banner.webp",
    "moto-mounts": "/image/collections/Moto-Mounts-Banner.webp",
    "charging": "/image/collections/Charging-Banner.webp",

    "wallets": "/image/collections/Wallets-Banner.webp",
    "sale": "/image/collections/Sale-Banner.webp",

    "protection1": "/image/collections/Protection-Banner.webp",
    "bag-acc": "/image/collections/Bag-Accessories-Banner.webp",
};

// Hər link hansı kateqoriyaya aiddir
// Bəziləri "category" sahəsinə, bəziləri isə "subCategory" / "bagType" sahəsinə uyğun gəlir.
// Bunun məntiqi CollectionPage.jsx-də izah olunub.
export const categoryMap = {
    "camera-gear": "CAMERA GEAR",
    clips: "CLIPS",
    straps: "STRAPS",
    tripods: "TRIPODS",
    "camera-bags": "CAMERA BAGS",
    protection: "PROTECTION",

    luggage: "TRAVEL",
    "travel-bag": "TRAVEL BAGS",
    "packing-cubes": "PACKING CUBES",
    "bag-accessories": "BAG ACCESSORIES",
    protection1: "BAG PROTECTION",

    bags: "BAGS",
    backpacks: "BACKPACKS",
    duffels: "DUFFELS",
    slings: "SLINGS",
    "tote-bags": "TOTES",
    "bag-acc": "BAG ACCESSORIES",

    mobile: "MOBILE",
    "phone-cases": "PHONE CASES",
    mounts: "PHONE MOUNTS",
    "phone-accessories": "PHONE ACCESSORIES",
    "moto-mounts": "MOTO MOUNTS",
    charging: "CHARGING",

    wallets: "WALLETS",
    sale: "SALE",
};

// "Bags" kateqoriyasının "Shop All" hissəsi 3 fərqli category-dən (CITY, EVERYDAY, OUTDOOR)
// birləşən məhsulları göstərir, çünki bu 3-ü də "gündəlik çanta" sayılır.
export const bagsShopAllCategories = ["CITY", "EVERYDAY", "OUTDOOR"];

// Hər kateqoriyada hansı filterlər görünsün
export const filtersConfig = {
    clips: [
        { key: "mountType", label: "Mount Type", options: ["Photo/Video Mount"] },
    ],

    straps: [
        {
            key: "size",
            label: "Size",
            options: ["Short", "Long", "Standard", "Micro (Mirrorless)", "Neck", "Regular (DSLR)", "Wrist"],
        },
    ],

    tripods: [
        { key: "mountType", label: "Mount Type", options: ["Photo/Video Mount"] },
    ],

    "camera-bags": [
        {
            key: "size",
            label: "Size",
            options: ["X-Small", "Small", "Smedium", "Medium", "Large", "2L", "6L", "7L", "10L", "13L", "15L", "20L", "25L", "30L", "45L", "X-Large", "4L", "18L"],
        },
        { key: "bagType", label: "Bag Type", options: ["Backpacks", "Messengers/Slings"] },
        { key: "useCase", label: "Use Case", options: ["Everyday", "Outdoor"] },
        {
            key: "whatItFits",
            label: "What It Fits",
            options: ['15-16" Laptop', '15" Thin Laptop', '13" or Smaller Laptop', "Multiple Camera Bodies + 5-6 Lenses", "Multiple Camera Bodies + 4-5 Lenses", "Camera Body + 2-3 Lenses", "Camera Body + Lens", 'Larger Tablet (13" or similar)', 'Smaller Tablet (8-11" or similar)', "Water Bottle", "Tripod"],
        },
    ],

    protection: [
        { key: "size", label: "Size", options: ["X-Small", "Small", "Smedium", "X-Large"] },
        { key: "whatItFits", label: "What It Fits", options: ["Camera Body + 2-3 Lenses", "Camera Body + Lens"] },
    ],

    "camera-gear": [
        {
            key: "size",
            label: "Size",
            options: ["Large", "Short", "Long", "2L", "6L", "7L", "10L", "13L", "15L", "20L", "25L", "30L", "45L", "Standard", "4L", "18L", "Micro (Mirrorless)", "Neck", "Regular (DSLR)", "Wrist"],
        },
        { key: "bagType", label: "Bag Type", options: ["Backpacks", "Messengers/Slings"] },
        { key: "useCase", label: "Use Case", options: ["Everyday", "Outdoor"] },
        {
            key: "whatItFits",
            label: "What It Fits",
            options: ['15-16" Laptop', '15" Thin Laptop', '13" or Smaller Laptop', "Multiple Camera Bodies + 4-5 Lenses", "Camera Body + 2-3 Lenses", "Camera Body + Lens", 'Larger Tablet (13" or similar)', 'Smaller Tablet (8-11" or similar)', "Water Bottle", "Tripod"],
        },
    ],
};

// Slug-dan başlıq düzəldir: "camera-gear" -> "Camera Gear"
export function getBannerTitle(slug) {
    return slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}