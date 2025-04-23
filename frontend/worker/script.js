document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const workerId = params.get("id");

    if (!workerId) {
        alert("Некорректный ID рабочего!");
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/worker/${workerId}`);
        const worker = await response.json();


        const imagePath = worker.image;
        const imageUrl = `http://127.0.0.1:8000/${imagePath}`;

        // Заполняем данные о рабочем
        document.getElementById('worker-id').textContent = worker.id;
        document.getElementById('worker-name').textContent = worker.full_name;
        document.getElementById('worker-image').src = imageUrl;
        document.getElementById('worker-post').textContent = worker.post;

        updateEditLink(worker.id);

        // Выводим заказы
        const ordersList = document.getElementById('worker-orders');
        ordersList.innerHTML = ''; // Очищаем список

        if (worker.orders.length === 0) {
            ordersList.innerHTML = "<p>Этот рабочий пока не участвовал в заказах.</p>";
        } else {
            worker.orders.forEach(order => {
                const orderItem = document.createElement('li');
                orderItem.innerHTML = `<a href="order.html?id=${order.id}">${order.name}</a> - ${order.status}, ${order.price} грн`;
                ordersList.appendChild(orderItem);
            });
        }
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        alert("Ошибка при загрузке информации о рабочем!");
    }
});

function updateEditLink(workerId) {
    const editLink = document.querySelector("a[href='editWorker.html']");
    if (editLink) {
        editLink.href = `editWorker.html?id=${workerId}`;
    }
}
