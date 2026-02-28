// Initialize Supabase
const { createClient } = supabase;
const supabaseUrl = "https://sb_publishable__I-5Xru31gg0n-4MSbpOjA_yLmbrqwG;
const supabaseKey = "sb_secret_cmlGfuvNgdAF2XZL6-UoPw_iSx4erWy";
const db = createClient(supabaseUrl, supabaseKey);

// Fetch products
async function fetchProducts(category = null) {
  let query = db.from("products").select("*");
  if (category) query = query.eq("category", category);
  return data;
}

// Add product
async function addProduct(product) {
  const  = await db.from("products").insert([product]);
}

// Delete product
async function deleteProduct(id) {
  const  = await db.from("products").delete().eq("id", id
}
