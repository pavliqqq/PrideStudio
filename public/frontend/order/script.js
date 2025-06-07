const token = localStorage.getItem('token');

const role = localStorage.getItem('role');

document.addEventListener("DOMContentLoaded", async function () {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("id");

    if (!orderId) {
        alert("Некорректный ID заказа!");
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/order/${orderId}`, {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + token,
              'Accept': 'application/json',
            },
        });
        const order = await response.json();

        const imagePath = order.image;
        const imageUrl = `http://127.0.0.1:8000/${imagePath}`;

        document.getElementById("order-id").textContent = order.id;
        document.getElementById("order-name").textContent = order.name;
        document.getElementById('order-image').src = imageUrl;
        document.getElementById("order-description").textContent = order.description || "Нет описания";
        document.getElementById("order-status").textContent = order.status;
        document.getElementById("order-number").textContent = order.number;
        document.getElementById("order-price").textContent = order.price;


        updateEditLink(order.id);

        
        const workersList = document.getElementById('order-workers');
        workersList.innerHTML = ''; // Очищаем список

        if (order.workers.length === 0) {
            workersList.innerHTML = "<p>Этот заказ пока никому не назначен.</p>";
        } else {
            order.workers.forEach(worker => {
                const workerItem = document.createElement('li');
                workerItem.innerHTML = `<a href="worker.html?id=${worker.id}">${worker.full_name} - ${worker.post}</a>`;
                workersList.appendChild(workerItem);
            });
        }
    } catch (error) {
        console.error("Ошибка при загрузке заказа:", error);
    }
});

function updateEditLink(orderId) {
    const editLink = document.querySelector("a[href='editOrder.html']");
    if (editLink) {
        editLink.href = `editOrder.html?id=${orderId}`;
    }
}

if(role!='admin')
    {
        const editButton = document.getElementById('edit_button');

        editButton.style.display = 'none';
    }
