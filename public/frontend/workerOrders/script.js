const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

document.addEventListener('DOMContentLoaded', async () => {
    if (!token) {
        window.location.href = '/';
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const workerId = params.get("id");

    if (!workerId) {
        alert("Некорректный ID рабочего!");
        return;
    }

    await fetchOrders(workerId);
});

async function fetchOrders(workerId, page = 1) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/workerOrders/${workerId}?page=${page}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Ошибка от сервера:", errorData);
            alert("Ошибка: " + (errorData.message || "Не удалось загрузить заказы."));
            return;
        }

        const data = await response.json();
        const worker = data.worker;
        const orders = data.orders.data;

        document.getElementById('worker-name').textContent = worker.full_name;
        document.getElementById('back_button').href = "worker.html?id=" + workerId;

        const ordersList = document.getElementById('worker-orders');
        ordersList.innerHTML = '';

        if (!orders || orders.length === 0) {
            ordersList.innerHTML = "<p>Этот рабочий пока не участвовал в заказах.</p>";
        } else {
            orders.forEach(order => {
                const imageUrl = `http://127.0.0.1:8000/${order.image}`;
                const orderItem = document.createElement('li');
                orderItem.classList.add('order-item');
                orderItem.innerHTML = `
                    <a href="order.html?id=${order.id}" class="order-link">
                        <img class="order-image" src="${imageUrl}" alt="${order.name}">
                        <div class="order-info">
                            <div class="order-name">${order.name}</div>
                            <div class="order-description">${order.description}</div>
                            <div class="order-status">${order.status}</div>
                            <div class="order-price">${order.price} грн</div>
                        </div>
                    </a>`;
                ordersList.appendChild(orderItem);
            });
        }

        renderPagination(data.orders, workerId);
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        alert("Ошибка при загрузке заказов рабочего!");
    }
}

function renderPagination(paginationData, workerId) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= paginationData.last_page; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.classList.add('btn');
        if (i === paginationData.current_page) btn.classList.add('active');

        btn.addEventListener('click', () => {
            fetchOrders(workerId, i);
        });

        pagination.appendChild(btn);
    }
}
