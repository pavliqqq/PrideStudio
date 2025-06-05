const token = localStorage.getItem('token');
document.addEventListener("DOMContentLoaded", async function () {
    if (!token) {
    window.location.href = '/';
    }
    
    const params = new URLSearchParams(window.location.search);
    const workerId = params.get("id");

    if (!workerId) {
        alert("Некорректный ID рабочего!");
        return;
    }
    
    const backButton = document.getElementById("back-button");
    if (backButton) {
        backButton.href = `worker.html?id=${workerId}`;
    }

    try {
        const workerResponse = await fetch(`http://127.0.0.1:8000/api/worker/${workerId}`,{
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
              },
        });
        const worker = await workerResponse.json();


        document.getElementById("worker-id").value = worker.id;
        document.getElementById("worker-name").value = worker.full_name;
        document.getElementById("worker-post").value = worker.post;
    } catch (error) {
        console.error("Ошибка при загрузке заказа:", error);
    }
});



document.getElementById("edit-worker-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Отмена стандартного сабмита

    const workerId = document.getElementById("worker-id").value;

    const formData = new FormData();
    formData.append("full_name", document.getElementById("worker-name").value);
    formData.append("post", document.getElementById("worker-post").value);
    formData.append("password", document.getElementById("worker-password").value);

    const imageInput = document.getElementById("worker-image");
    if (imageInput.files.length > 0) {
        formData.append("image", imageInput.files[0]);
    }

    const orders = Array.from(document.querySelectorAll(".order-checkbox:checked")).map(cb => cb.value);
    orders.forEach((id, index) => {
        formData.append(`orders[${index}]`, id);
    });


    formData.append('_method', 'PATCH');

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/workers/${workerId}`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
              },
            body: formData
        });

        if (!response.ok) throw new Error("Ошибка при обновлении работника");

        alert("Работник успешно обновлен!");
        window.location.href = `worker.html?id=${workerId}`;
    } catch (error) {
        console.error("Ошибка:", error);
        alert("Ошибка при обновлении работника");
    }
});

