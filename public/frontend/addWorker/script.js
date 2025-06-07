const token = localStorage.getItem('token');

document.addEventListener("DOMContentLoaded", function () {
    if (!token) {
        window.location.href = '/';
        return;
    }

    const form = document.getElementById("add-worker-form");

    if (!form) {
        console.error("Форма не найдена");
        return;
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append("full_name", document.getElementById("worker-name").value);
        formData.append("post", document.getElementById("worker-post").value);
        formData.append("password", document.getElementById("worker-password").value);

        const imageInput = document.getElementById("worker-image");
        if (imageInput.files.length > 0) {
            formData.append("image", imageInput.files[0]);
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/workers/create`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
                body: formData
            });

            if (!response.ok) throw new Error("Ошибка при добавлении работника");

            alert("Работник успешно добавлен!");
            window.location.href = `workers.html`;
        } catch (error) {
            console.error("Ошибка:", error);
            alert("Ошибка при добавлении работника");
        }
    });
});
