import React from 'react';
import Task from "./Task";
import {useGetTasksQuery} from "../../features/tasks/tasksApi";
import Loading from "../ui/Loading";
import {useSelector} from "react-redux";

const TaskList = () => {
    const checkedProjects = useSelector(state => state.projects.checkedProjects);
    const {
        data: tasksList, isLoading, isError, error,
    } = useGetTasksQuery();

    const filteredTasks = tasksList?.filter((task) => checkedProjects.includes(task.project.id));


    // decide what to render
    let content = null;

    if (isLoading) content = <Loading/>;
    if (!isLoading && isError) {
        content = <div className="col-span-12">{error}</div>;
    }

    if (!isLoading && !isError && filteredTasks?.length === 0) {
        content = <div className="col-span-12 text-3xl">No task found!</div>;
    }
    if (!isLoading && !isError && filteredTasks?.length > 0) {
        content = filteredTasks.map((task, index) => (
            <Task key={index} taskData={task}/>
        ));
    }

    return (
        <div className="lws-task-list">
            {content}
        </div>
    );
};

export default TaskList;