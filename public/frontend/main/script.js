async function getSearch() {
    const div = document.getElementById("number_search");
    const button = document.getElementById("search_button");

    button.style.display = "none";
    div.style.display = "flex";
}

async function search() {
    const number = document.getElementById("number").value;
    const error = document.getElementById("number_error");
    const ordersList = document.getElementById('orders-list');
    const ordersTable = document.getElementById('orders_table');

    error.style.fontSize = "medium";
    error.style.color = "red";

    if (!/^\d{10}$/.test(number)) {

        error.textContent = "Введите корректный номер телефона (10 цифр).";
        return;
    }

    let url = `http://127.0.0.1:8000/api/orders?number=${number}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.data.length === 0) {
        ordersTable.style.display="none";
        error.style.display="inline-block";
        error.textContent = "Заказы не найдены";
    } else {
        ordersList.innerHTML = '';
        error.style.display="none";
        ordersTable.style.display="inline-block";

        
        data.data.forEach(order => {
            const row = document.createElement('tr');
            const statusClass = order.status.toLowerCase().replace(/\s+/g, '-');
            row.innerHTML = `
                <td>
                    <img src="http://127.0.0.1:8000/${order.image}" alt="${order.name}" class="order-thumb">
                </td>
                <td>${order.name}</td>
                <td><span class="badge status-${statusClass}">${order.status}</span></td>
                <td>${order.price} грн</td>
            `;
            ordersList.appendChild(row);
        });
    }
}