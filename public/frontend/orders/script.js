const token = localStorage.getItem('token');

const role = localStorage.getItem('role');

document.addEventListener('DOMContentLoaded', () => {
    if (!token) {
    window.location.href = '/';
    }

   
    
    if(role != 'admin'){
        const createButton = document.getElementById('create_button');

        createButton.style.display='none';
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Месяцы с 0
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }


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
                <td>
                    <img src="http://127.0.0.1:8000/${order.image}" alt="${order.name}" class="order-thumb">
                </td>
                <td><a href="order.html?id=${order.id}">${order.name}</a></td>
                <td>${order.number}</td>
                <td>${order.status}</td>
                <td>${order.price}</td>
                <td>${order.workers.map(worker => worker.full_name).join(', ')}</td>
                <td>${formatDate(order.created_at)}</td>
                ${role=='admin' ?`
                <td>
                     <button class="btn" onclick="deleteOrder(${order.id})">Удалить</button>
                </td>` : ''}
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
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        alert("Заказ успешно удалён");
        location.reload(); // Перезагрузка страницы, чтобы обновить список
    } else {
        alert("Ошибка при удалении заказа");
    }
}