# TaskMaster

TaskMaster is a task management application built with Vue 3 using the Composition API and TypeScript. It provides users with the ability to create, edit, and manage tasks, with a focus on a clean and responsive user interface. The project integrates **Storybook** for documenting and testing UI components, ensuring consistency across various scenarios.

## Features

### Core Features

- **Task List View**:
  - Displays a list of tasks with details such as title, description, due date, and status.
- **Task Management**:
  - Add new tasks with required details.
  - Edit and Delete existing tasks.

### User Interface

- Clean and intuitive interface.
- Fully responsive design to work across different screen sizes and devices.

### State Management

- **Pinia** is used for state management to efficiently handle and persist the application's state.
- Application state is stored in **local JSON databse**, ensuring data persistence across page reloads.

### Component Documentation

- The project uses **Storybook** to document and test key components such as task cards, task lists, and task input forms.
- Components have documented variations to represent different states.

## Getting Started

### Prerequisites

- Node.js and yarn must be installed.

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/kiketordera/taskmaster
   ```

2. Navigate to the project directory:

   ```
   cd taskmaster
   ```

3. Install the dependencies:
   ```
   yarn install
   ```

### Running the Application

```
yarn run dev
```

### Running Storybook

```
yarn run storybook
```

### Project Structure

```
├── src
│   ├── components
│   │   ├── TaskItem.vue        # Task item component
│   │   ├── TaskList.vue        # Task list component
│   │   ├── TaskForm.vue        # Form for adding/editing tasks
│   │   └── Modal.vue           # Reusable modal component
│   ├── stories
│   │   ├── TaskItem.stories.ts # Task item Storybook documentation
│   │   ├── TaskList.stories.ts # Task list Storybook documentation
│   │   └── TaskForm.stories.ts # Task form Storybook documentation
│   ├── store
│   │   └── taskStore.ts        # Pinia store for managing task state
│   └── App.vue                 # Main application component
├── public
│   └── index.html              # HTML file for the app
├── package.json                # Project dependencies and scripts
└── vite.config.ts              # Vite configuration
```

## License

This project is licensed under the MIT License.
