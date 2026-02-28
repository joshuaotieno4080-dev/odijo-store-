form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const price = document.getElementById("price").value.trim();
  const category = document.getElementById("category").value;
  const file = document.getElementById("image-file").files[0];

  console.log("Fields:", { name, price, category, file });

  if(!name || !price || !category || !file){
    return alert("Fill all fields and select an image.");
  }

  try {
    // 1️⃣ Upload image
    const filePath = `images/${Date.now()}_${Math.floor(Math.random()*1000)}_${file.name}`;
    console.log("Uploading file to path:", filePath);

    const { data: uploadData, error: uploadError } = await db.storage
      .from("images")
      .upload(filePath, file, { upsert: true });
    if(uploadError) throw uploadError;

    console.log("UploadData:", uploadData);

    // 2️⃣ Get public URL
    const { publicUrl, error: urlError } = db.storage
      .from("images")
      .getPublicUrl(uploadData.path);
    console.log("Public URL:", publicUrl, "Error:", urlError);
    if(urlError || !publicUrl) throw urlError || new Error("Cannot get public URL");

    // 3️⃣ Insert product
    console.log("Inserting product:", { name, price, category, image: publicUrl });
    const { data: insertData, error: insertError } = await db
      .from("products")
      .insert([{ name, price, category, image: publicUrl }]);
    console.log("Insert result:", insertData, "Error:", insertError);
    if(insertError) throw insertError;

    alert("Product added successfully!");
    form.reset();
    loadProducts();

  } catch(err) {
    console.error("Add product failed:", err);
    alert("Failed to add product. Check console for details.");
  }
});
