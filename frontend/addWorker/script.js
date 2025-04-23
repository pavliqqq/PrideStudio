document.getElementById("add-worker-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Отмена стандартного сабмита


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
