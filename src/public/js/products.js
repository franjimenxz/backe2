const addCartButtons = document.querySelectorAll(".product__addCart");
document
  .getElementById("cart-id")
  .setAttribute("href", `/carts/${sessionStorage.getItem("cartId")}`);
addCartButtons.forEach((button) => {
  button.addEventListener("click", async (e) => {
    e.preventDefault();
    let productId = e.target.parentNode.getAttribute("data-product-id");

    try {
      let cartId = await fetch(
        `/api/carts/${sessionStorage.getItem("cartId")}`,
        {
          method: "GET",
        },
      );
      if (cartId.status === 400) {
        cartId = await fetch("/api/carts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            products: [
              {
                product: productId,
                quantity: 1,
              },
            ],
          }),
        });
        cartId = await cartId.json();
        console.log(cartId);
        sessionStorage.setItem("cartId", cartId.payload._id);
      } else {
        console.log("entre");

        let response = await fetch(
          `/api/carts/${sessionStorage.getItem(
            "cartId",
          )}/products/${productId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              quantity: 1,
            }),
          },
        );
      }
    } catch (error) {
      console.error(error);
    }
  });
});
