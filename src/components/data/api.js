
import axios from "axios";

async function getProduct() {
    const res = await axios.get("http://localhost:3000/api/products");
    // JSON-da id yoxdur, ona görə sıra nömrəsini id kimi veririk
    return res.data.map((product, index) => ({ id: index + 1, ...product }));
}

export default getProduct;