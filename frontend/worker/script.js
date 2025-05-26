const token = localStorage.getItem('token');

const role = localStorage.getItem('role');

document.addEventListener('DOMContentLoaded', async () => {
    if (!token) {
    window.location.href = '/';
    }

    const params = new URLSearchParams(window.location.search);
    const workerId = params.get("id");

    if (!workerId) {
        alert("Некорректный ID рабочего!");
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/worker/${workerId}`, {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + token,
              'Accept': 'application/json',
            },
          });
        const worker = await response.json();


        const imagePath = worker.image;
        const imageUrl = `http://127.0.0.1:8000/${imagePath}`;

        // Заполняем данные о рабочем
        document.getElementById('worker-id').textContent = worker.id;
        document.getElementById('worker-name').textContent = worker.full_name;
        document.getElementById('worker-image').src = imageUrl;
        document.getElementById('worker-post').textContent = worker.post;

        updateEditLink(worker.id);
        updateOrdersLink(worker.id);

    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        alert("Ошибка при загрузке информации о рабочем!");
    }
    weekTasks(workerId);
});

function updateEditLink(workerId) {
    const editLink = document.querySelector("a[href='editWorker.html']");
    if (editLink) {
        editLink.href = `editWorker.html?id=${workerId}`;
    }
}
function updateOrdersLink(workerId) {
    const editLink = document.querySelector("a[href='workerOrders.html']");
    if (editLink) {
        editLink.href = `workerOrders.html?id=${workerId}`;
    }
}

if(role!='admin')
    {
        const editButton = document.getElementById('edit_button');

        editButton.style.display = 'none';
    }

async function weekTasks(workerId) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/worker/tasks/week?id=${workerId}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
            },
        });

        const weekOrders = await response.json();
        const ordersContainer = document.getElementById('week-tasks');
        ordersContainer.innerHTML = ''; // очистка

        const days = Object.keys(weekOrders);

        if (days.length === 0) {
            ordersContainer.innerHTML = "<p>На эту неделю задач нет.</p>";
            return;
        }

        days.forEach(date => {
            const dayBlock = document.createElement('div');
            dayBlock.classList.add('day-tasks');

            const readableDate = new Date(date).toLocaleDateString("ru-RU", { weekday: 'long', day: 'numeric', month: 'long' });

            let html = `<h3>${readableDate}</h3><ul>`;
            weekOrders[date].forEach(order => {
                html += `
                <li class="order-item">
                    <img src="http://127.0.0.1:8000/${order.image}" alt="${order.name}" class="order-thumb">
                    <div class="order-info">
                        <a href="order.html?id=${order.id}">${order.name}</a> - ${order.status}, ${order.price} грн
                    </div>
                </li>`;
            });
            html += '</ul>';
            dayBlock.innerHTML = html;
            ordersContainer.appendChild(dayBlock);
        });
    } catch (err) {
        console.error("Ошибка при получении задач на неделю:", err);
    }
}