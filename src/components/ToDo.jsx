import React, { useState, useEffect } from 'react';
import video from '../assets/video.mp4';

function ToDo() {
    // states set to write task, task title and to separate completed and incomplete tasks filter
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [filter, setFilter] = useState('all');

    // Load tasks from local storage on component mount
    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    // Save tasks to local storage whenever tasks state changes
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);


    // function to create task title
    const handleInputChange = (e) => {
        setNewTaskTitle(e.target.value);
    };

    // function to submit task
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (newTaskTitle.trim() === '') return;
        const newTask = {
            title: newTaskTitle,
            completed: false,
        };
        setTasks([newTask, ...tasks]);
        setNewTaskTitle('');
    };

    // function to delete task
    const handleDeleteTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    };

    // function to filter tasks
    const filteredTasks = tasks.filter((task) => {
        if (filter === 'all') {
            return true;
        } else if (filter === 'completed') {
            return task.completed;
        } else {
            return !task.completed;
        }
    });

    return (
        <section className='container'>
            <video src={video} muted autoPlay loop type="video/mp4"></video>
            <div className='title-container'>
                <h1>Task List</h1>
                <form onSubmit={handleFormSubmit}>
                    <input
                    className='task-input'
                        type="text"
                        placeholder="Enter task title"
                        value={newTaskTitle}
                        onChange={handleInputChange}
                    />
                    <button className='task-button' type="submit">Add Task</button>
                </form>
                <div className='filters'>
                    <button className='filter-all' onClick={() => setFilter('all')}>All</button>
                    <button className='filter-complete' onClick={() => setFilter('completed')}>Completed</button>
                    <button className='filter-incomplete' onClick={() => setFilter('incomplete')}>Incomplete</button>
                </div>
                <ul>
                    {filteredTasks.map((task, index) => (
                        <li key={index}>
                            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                {task.title}
                            </span>
                            <button onClick={() => handleDeleteTask(index)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default ToDo;
