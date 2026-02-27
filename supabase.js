import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Paste your real values here:
const supabaseUrl = "https:/sb_publishable__I-5Xru31gg0n-4MSbpOjA_yLmbrqwG";
const supabaseKey = "sb_secret_cmlGfuvNgdAF2XZL6-UoPw_iSx4erWy";

export const supabase = createClient(supabaseUrl, supabaseKey);

// Add product
export async function addProduct(name, price, category, imageUrl) {
    .from("products")
    .insert([{ name, price, category, imageUrl }])

// Delete product
export async function deleteProduct(id) {
    .from("products")
    .delete()
    .eq("id", id);
}

// Fetch products
export async function getProducts(category) {
  let query = supabase.from("products").select("*");
  if (category) query = query.eq("category", category);
  const { data, error } = await query;
  return data;
}
