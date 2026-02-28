const supabaseUrl = "https://hncxmcpsiocoidljoayq.supabase.co";
const supabaseKey = "sb_publishable__I-5Xru31gg0n-4MSbpOjA_yLmbrqwG";

const db = supabase.createClient(supabaseUrl, supabaseKey);

async function fetchProducts() {
  const { data, error } = await db.from("products").select("*").order("id", { ascending: false });
  if (error) throw error;
  return data;
}

async function deleteProduct(id) {
  const { error } = await db.from("products").delete().eq("id", id);
  if (error) throw error;
}
