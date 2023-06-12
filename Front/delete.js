const delete_btn = document.getElementById("delete-account");
const delete_account_id = document.getElementById("delete-account_id");

delete_btn.addEventListener("click", () => {
  fetch("/delete.html", {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      delete_account_id: delete_account_id.value,
    }),
  });
});
