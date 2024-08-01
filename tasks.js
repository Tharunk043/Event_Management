document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventTitle = urlParams.get('title');
    const eventDescription = urlParams.get('description');
    const eventCoordinator = urlParams.get('coordinator');

    const eventTitleElement = document.getElementById('event-title');
    const eventDescriptionElement = document.getElementById('event-description');
    const eventCoordinatorElement = document.getElementById('event-coordinator');

    if (eventTitle) {
        eventTitleElement.textContent = `Event: ${eventTitle}`;
    }

    if (eventDescription) {
        eventDescriptionElement.textContent = `Description: ${eventDescription}`;
    }

    if (eventCoordinator) {
        eventCoordinatorElement.textContent = `Coordinator: ${eventCoordinator}`;
    }
});