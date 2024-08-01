const taskList = document.querySelector('.task-list');
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');

addTaskButton.addEventListener('click', () => {
  const newTask = newTaskInput.value.trim(); // Remove leading/trailing whitespaces
  if (newTask) {
    addTask(newTask);
    newTaskInput.value = ''; // Clear input field after adding task
  }
});

function addTask(taskDescription) {
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item');

  // Create checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', () => {
    toggleTaskStatus(taskItem);
  });
  taskItem.appendChild(checkbox);

  // Create task description
  const taskText = document.createElement('span');
  taskText.classList.add('task-description');
  taskText.textContent = taskDescription;
  taskItem.appendChild(taskText);

  // Create status buttons container
  const statusButtons = document.createElement('div');
  statusButtons.classList.add('status-buttons');
  taskItem.appendChild(statusButtons);

  // Create status buttons (Completed, In Progress, Not Started)
  const statuses = ['completed', 'in-progress', 'not-started'];
  statuses.forEach(status => {
    const button = document.createElement('button');
    button.textContent = status;
    button.dataset.status = status;
    button.addEventListener('click', () => {
      updateTaskStatus(taskItem, status);
    });
    statusButtons.appendChild(button);
  });

  // Set initial status (not started by default)
  taskItem.dataset.status = 'not-started';
  updateTaskStatus(taskItem, 'not-started'); // Apply initial styles

  taskList.appendChild(taskItem);
}

function toggleTaskStatus(taskItem) {
  const currentStatus = taskItem.dataset.status;
  const newStatus = currentStatus === 'completed' ? 'not-started' : 'completed';
  updateTaskStatus(taskItem, newStatus);
}

function updateTaskStatus(taskItem, newStatus) {
  taskItem.dataset.status = newStatus;
  const statusDisplay = taskItem.querySelector('.status');
  if (statusDisplay) {
    statusDisplay.remove(); // Remove existing status display (if any)
  }
  const statusElement = document.createElement('span');
  statusElement.classList.add('status', newStatus);
  statusElement.textContent = newStatus;
  taskItem.appendChild(statusElement);

  // Update button styles based on new status
  const buttons = taskItem.querySelectorAll('.status-buttons button');
  buttons.forEach(button => {
    button.classList.remove('active');
    if (button.dataset.status === newStatus) {
      button.classList.add('active');
    }
  });
}

