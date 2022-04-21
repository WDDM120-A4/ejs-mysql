const deleteProduct = async (e) => {
  e.preventDefault();
  const id = e.target.id;
  try {
    await fetch('http://localhost:8080/delete-product-submit/' + id, {
      method: 'DELETE', body: {id}
    });
    window.location = '/';
  } catch (e) {
    alert(e.message);
    console.log(e);
  }
}