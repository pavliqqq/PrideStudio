const token = localStorage.getItem('token');

const role = localStorage.getItem('role');

document.addEventListener('DOMContentLoaded', () => {
    if (!token) {
    window.location.href = '/';
    }
    
    if(role!='admin'){
        const createButton = document.getElementById('create_button');

        createButton.style.display = 'none';
    }
    let currentPage = 1;

    async function fetchWorkers(page = 1) {
        const response = await fetch(`http://127.0.0.1:8000/api/workers?page=${page}`,{
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
              },
            });
        const data = await response.json();
    
        console.log(data); // Лог для проверки
    
        const workersList = document.getElementById('workers-list');
        workersList.innerHTML = '';
    
        data.data.forEach(worker => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${worker.id}</td>
                <td><a href="worker.html?id=${worker.id}">${worker.full_name}</a></td>
                <td>${worker.post}</td>
                ${role=='admin' ?`
                    <td>
                         <button class="btn" onclick="deleteWorker(${worker.id})">Удалить</button>
                    </td>` : ''}
            `;
            workersList.appendChild(row);
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
                fetchWorkers(currentPage);
            });

            pagination.appendChild(btn);
        }
    }
    fetchWorkers();
});


async function deleteWorker(workerId){
    const response = await fetch(`http://127.0.0.1:8000/api/workers/${workerId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    });

    if(response.ok){
        alert("Рабочий успешно удалён");
        window.location.href = `workers.html`;
    }
        else {
            alert("Ошибка при удалении рабочего");
        }
}