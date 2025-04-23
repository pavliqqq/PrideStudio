document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 1;
    let currentStatus = 'all';

    async function fetchOrders(status = 'all', page = 1) {
        let url = `http://127.0.0.1:8000/api/orders?page=${page}`;
        if (status !== 'all') {
            url += `&status=${status}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        const ordersList = document.getElementById('orders-list');
        ordersList.innerHTML = '';

        data.data.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.id}</td>
                <td><a href="order.html?id=${order.id}">${order.number}</a></td>
                <td>${order.status}</td>
                <td>${order.price}</td>
                <td>${order.workers.map(worker => worker.full_name).join(', ')}</td>
                <td>
                    <button class="btn" onclick="deleteOrder(${order.id})">Удалить</button>
                </td>
            `;
            ordersList.appendChild(row);
        });

        renderPagination(data);
    }

    function renderPagination(data) {
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';

        for (let i = 1; i <= data.last_page; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.classList.add('btn');
            if (i === data.current_page) btn.classList.add('active');

            btn.addEventListener('click', () => {
                currentPage = i;
                fetchOrders(currentStatus, currentPage);
            });

            pagination.appendChild(btn);
        }
    }

    document.getElementById('order-filter').addEventListener('change', function () {
        currentStatus = this.value;
        currentPage = 1;
        fetchOrders(currentStatus, currentPage);
    });

    fetchOrders();
});

async function deleteOrder(orderId) {
    const response = await fetch(`http://127.0.0.1:8000/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        alert("Заказ успешно удалён");
        location.reload(); // Перезагрузка страницы, чтобы обновить список
    } else {
        alert("Ошибка при удалении заказа");
    }
}
