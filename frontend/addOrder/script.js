const token = localStorage.getItem('token');
document.addEventListener("DOMContentLoaded", async function () {
    if (!token) {
    window.location.href = '/';
    }
    

    try {
        const workersResponse = await fetch(`http://127.0.0.1:8000/api/workers/all`,{
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
              }
        });
        const workers = await workersResponse.json();

        const workersList = document.getElementById("workers-list");
        workers.forEach(worker => {
            const workerItem = `
                <label>
                    <input type="checkbox" class="worker-checkbox" value="${worker.id}">
                    ${worker.full_name} - ${worker.post}
                </label><br>
            `;
            workersList.innerHTML += workerItem;
        });
    } catch (error) {
        console.error("Ошибка при загрузке заказа:", error);
    }
});



document.getElementById("add-order-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Отмена стандартного сабмита
    
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

    try {
        console.log(`Финальный URL запроса: http://127.0.0.1:8000/api/orders/create`);
        const response = await fetch(`http://127.0.0.1:8000/api/orders/create`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
              },
            body: formData
        });

        if (!response.ok) throw new Error("Ошибка при добавлении заказа");

        alert("Заказ успешно добавлен!");
        window.location.href = `orders.html`;
    } catch (error) {
        console.error("Ошибка:", error);
        alert("Ошибка при добавлении заказа");
    }
});
