document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const addCourseForm = document.getElementById('addCourseForm');
    const editCourseForm = document.getElementById('editCourseForm');
    const addCourseModal = document.getElementById('addCourseModal');
    const openAddCourseModalButton = document.getElementById('openAddCourseModal');
    const closeAddCourseModalButton = document.querySelector('.close');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:5000/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    window.location.href = 'index.html';
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error('Erro ao fazer login:', error);
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:5000/api/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, password })
                });
                if (response.ok) {
                    window.location.href = 'login.html';
                } else {
                    const data = await response.json();
                    alert(data.message);
                }
            } catch (error) {
                console.error('Erro ao registrar:', error);
            }
        });
    }

    if (addCourseForm) {
        addCourseForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const token = localStorage.getItem('token');
            const title = document.getElementById('addTitle').value;
            const description = document.getElementById('addDescription').value;
            const duration = document.getElementById('addDuration').value;
            const teacher = document.getElementById('addTeacher').value;
            const image = document.getElementById('addImage').files[0];

            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('duration', duration);
            formData.append('teacher', teacher);
            formData.append('image', image);

            try {
                const response = await fetch('http://localhost:5000/api/courses', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                });
                if (response.ok) {
                    alert('Curso adicionado com sucesso!');
                    location.reload(); // Recarrega a página após adicionar o curso
                } else {
                    const data = await response.json();
                    alert(data.message);
                }
            } catch (error) {
                console.error('Erro ao adicionar curso:', error);
            }
        });
    }

    if (openAddCourseModalButton && addCourseModal && closeAddCourseModalButton) {
        openAddCourseModalButton.addEventListener('click', () => {
            addCourseModal.style.display = 'block';
        });

        closeAddCourseModalButton.addEventListener('click', () => {
            addCourseModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target == addCourseModal) {
                addCourseModal.style.display = 'none';
            }
        });
    }

    async function fetchCourses() {
        try {
            const response = await fetch('http://localhost:5000/api/courses');
            const data = await response.json();
            const courseList = document.getElementById('courseList');

            courseList.innerHTML = ''; // Limpa a lista atual de cursos

            data.forEach(course => {
                const courseItem = document.createElement('div');
                courseItem.classList.add('course-item');
                courseItem.innerHTML = `
                    <img src="data:image/png;base64,${course.image}" alt="${course.title}">
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <p><strong>Duração:</strong> ${course.duration} horas</p>
                    <p><strong>Professor:</strong> ${course.teacher}</p>
                    <button class="edit-course-button" data-id="${course._id}">Editar</button>
                    <button class="delete-course-button" data-id="${course._id}">Excluir</button>
                `;
                courseList.appendChild(courseItem);

                // Adiciona eventos de clique para editar e excluir
                const editButtons = document.querySelectorAll('.edit-course-button');
                editButtons.forEach(button => {
                    button.addEventListener('click', async (e) => {
                        const courseId = e.target.getAttribute('data-id');
                        const course = data.find(c => c._id === courseId);
                        populateEditForm(course);
                    });
                });

                const deleteButtons = document.querySelectorAll('.delete-course-button');
                deleteButtons.forEach(button => {
                    button.addEventListener('click', async (e) => {
                        const courseId = e.target.getAttribute('data-id');
                        const confirmDelete = confirm('Deseja realmente excluir este curso?');
                        if (confirmDelete) {
                            try {
                                const token = localStorage.getItem('token');
                                const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
                                    method: 'DELETE',
                                    headers: {
                                        'Authorization': `Bearer ${token}`
                                    }
                                });
                                if (response.ok) {
                                    alert('Curso excluído com sucesso!');
                                    fetchCourses(); // Atualiza a lista de cursos após a exclusão
                                } else {
                                    const data = await response.json();
                                    alert(data.message);
                                }
                            } catch (error) {
                                console.error('Erro ao excluir curso:', error);
                            }
                        }
                    });
                });
            });
        } catch (error) {
            console.error('Erro ao obter cursos:', error);
        }
    }

    fetchCourses(); // Carrega a lista de cursos ao carregar a página

    function populateEditForm(course) {
        const { _id, title, description, duration, teacher } = course;
        document.getElementById('editCourseId').value = _id;
        document.getElementById('editTitle').value = title;
        document.getElementById('editDescription').value = description;
        document.getElementById('editDuration').value = duration;
        document.getElementById('editTeacher').value = teacher;

        document.getElementById('editCourseFormContainer').style.display = 'block';
    }

    if (editCourseForm) {
        editCourseForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const token = localStorage.getItem('token');
            const courseId = document.getElementById('editCourseId').value;
            const title = document.getElementById('editTitle').value;
            const description = document.getElementById('editDescription').value;
            const duration = document.getElementById('editDuration').value;
            const teacher = document.getElementById('editTeacher').value;

            try {
                const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ title, description, duration, teacher })
                });
                if (response.ok) {
                    alert('Curso atualizado com sucesso!');
                    fetchCourses(); // Atualiza a lista de cursos após a edição
                    document.getElementById('editCourseFormContainer').style.display = 'none';
                } else {
                    const data = await response.json();
                    alert(data.message);
                }
            } catch (error) {
                console.error('Erro ao atualizar curso:', error);
            }
        });
    }
});
