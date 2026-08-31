import axios from "axios";

async function getProduct() {
    const res = await axios.get("https://api-vercel-master.onrender.com/api/products");
    // JSON-da id yoxdur, ona görə sıra nömrəsini id kimi veririk
    return res.data.map((product, index) => ({ id: index + 1, ...product }));
}

export default getProduct;