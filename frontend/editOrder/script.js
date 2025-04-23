document.addEventListener("DOMContentLoaded", async function () {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("id");

    if (!orderId) {
        alert("Некорректный ID заказа!");
        return;
    }

    const backButton = document.getElementById("back-button");
    if (backButton) {
        backButton.href = `order.html?id=${orderId}`;
    }

    try {
        const orderResponse = await fetch(`http://127.0.0.1:8000/api/order/${orderId}`);
        const order = await orderResponse.json();

        const workersResponse = await fetch(`http://127.0.0.1:8000/api/workers`);
        const workers = await workersResponse.json();


        document.getElementById("order-id").value = order.id;
        document.getElementById("order-name").value = order.name;
        document.getElementById("order-description").textContent = order.description || "Нет описания";
        document.getElementById("order-number").value = order.number;
        document.getElementById("order-status").value = order.status;
        document.getElementById("order-price").value = order.price;

        const workersList = document.getElementById("workers-list");
        workers.forEach(worker => {
            const isChecked = order.workers.some(w => w.id === worker.id);
            const workerItem = `
                <label>
                    <input type="checkbox" class="worker-checkbox" value="${worker.id}" ${isChecked ? "checked" : ""}>
                    ${worker.full_name} - ${worker.post}
                </label><br>
            `;
            workersList.innerHTML += workerItem;
        });
    } catch (error) {
        console.error("Ошибка при загрузке заказа:", error);
    }
});



document.getElementById("edit-order-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Отмена стандартного сабмита

    const orderId = document.getElementById("order-id").value; // ID заказа
    
    const formData = new FormData();
    formData.append("name", document.getElementById("order-name").value);
    formData.append("description", document.getElementById("order-description").value);
    formData.append("number", document.getElementById("order-number").value);
    formData.append("status", document.getElementById("order-status").value);
    formData.append("price", document.getElementById("order-price").value);

    const imageInput = document.getElementById("order-image");
    if (imageInput.files.length > 0) {
        formData.append("image", imageInput.files[0]);
    }

    const workers = Array.from(document.querySelectorAll(".worker-checkbox:checked")).map(cb => cb.value);
    workers.forEach(id => {
        formData.append('workers[]', id);
    });

    formData.append('_method', 'PATCH');

    try {
        console.log(`Финальный URL запроса: http://127.0.0.1:8000/api/orders/${orderId}`);
        const response = await fetch(`http://127.0.0.1:8000/api/orders/${orderId}`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error("Ошибка при обновлении заказа");

        alert("Заказ успешно обновлен!");
        window.location.href = `order.html?id=${orderId}`;
    } catch (error) {
        console.error("Ошибка:", error);
        alert("Ошибка при обновлении заказа");
    }
});
