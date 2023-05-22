

// GET: Devuelve todos los products de api/tasks
const getProducts = async (id) => {
    const url = "https://fakestoreapi.com/products/"+id;
  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(response.status + " " + response.statusText);

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default getProducts;
