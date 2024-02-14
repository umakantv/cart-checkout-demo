const { fetchAllProducts } = require("../controllers/products");

const ProductRouter = require("express").Router();

ProductRouter.get("/", async (req, res) => {
  try {
    const products = await fetchAllProducts();
    res.json({ data: products });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

ProductRouter.get("/:id", async (req, res) => {
    try {
        const product = await fetchProductById(req.params.id);

        if (product) {
            res.json({ data: product });
        }
        else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = ProductRouter;