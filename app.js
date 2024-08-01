document.addEventListener("DOMContentLoaded", () => {
    const eventForm = document.getElementById('event-form');
    const eventsList = document.getElementById('events');
    const eventsTableBody = document.getElementById('events-body');
    const isEventManagementPage = document.body.classList.contains('event-management');

    let events = JSON.parse(localStorage.getItem('events')) || [];

    const displayEvents = () => {
        if (eventsList) {
            eventsList.innerHTML = '';
            events.forEach((event, index) => {
                const li = document.createElement('li');
                const link = document.createElement('a');
                link.href = `tasks.html?title=${encodeURIComponent(event.title)}&description=${encodeURIComponent(event.description)}&coordinator=${encodeURIComponent(event.coordinator)}`;
                link.textContent = `${event.title} - ${event.date}`;
                li.appendChild(link);

                if (isEventManagementPage) {
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.classList.add('btn', 'btn-danger');
                    deleteButton.style.marginLeft = '10px';
                    deleteButton.addEventListener('click', () => {
                        events.splice(index, 1);
                        localStorage.setItem('events', JSON.stringify(events));
                        displayEvents();
                    });
                    li.appendChild(deleteButton);
                }

                eventsList.appendChild(li);
            });
        }

        if (eventsTableBody) {
            eventsTableBody.innerHTML = '';
            events.forEach(event => {
                const row = document.createElement('tr');
                const titleCell = document.createElement('td');
                const coordinatorCell = document.createElement('td');
                const link = document.createElement('a');
                link.href = `tasks.html?title=${encodeURIComponent(event.title)}&description=${encodeURIComponent(event.description)}&coordinator=${encodeURIComponent(event.coordinator)}`;
                link.textContent = event.title;
                titleCell.appendChild(link);
                coordinatorCell.textContent = event.coordinator;
                row.appendChild(titleCell);
                row.appendChild(coordinatorCell);
                eventsTableBody.appendChild(row);
            });
        }
    };

    if (eventForm) {
        eventForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const coordinator = document.getElementById('coordinator').value;
            const date = document.getElementById('date').value;

            const newEvent = { title, description, coordinator, date };
            events.push(newEvent);

            localStorage.setItem('events', JSON.stringify(events));
            displayEvents();
            eventForm.reset();
        });
    }

    // Handle student form submission
    const studentForm = document.getElementById('student-form');
    if (studentForm) {
        studentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const studentName = document.getElementById('student-name').value;
            const studentId = document.getElementById('student-id').value;
            const studentNumber = document.getElementById('student-number').value;
            const taskTitle = document.getElementById('task-title').value;

            const selectedEvent = events.find(event => event.title === taskTitle);

            if (selectedEvent) {
                alert(`Success! Student ${studentName} is registered for the task: ${taskTitle}. Coordinator: ${selectedEvent.coordinator}`);
                window.location.href = `success.html?taskTitle=${encodeURIComponent(taskTitle)}&coordinator=${encodeURIComponent(selectedEvent.coordinator)}`;
            } else {
                alert("Task not found. Please check the task title.");
            }
        });
    }

    displayEvents();
});