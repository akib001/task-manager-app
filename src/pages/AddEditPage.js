import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useGetProjectsQuery} from "../features/projects/projectsApi";
import {useGetTeamsQuery} from "../features/teams/teamsApi";
import {useAddTaskMutation, useEditTaskMutation, useGetTaskQuery} from "../features/tasks/tasksApi";

const AddEditPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [addTask, {isSuccess: isAddTaskSuccess}] = useAddTaskMutation();
    const [editTask, {isSuccess: isEditTaskSuccess}] = useEditTaskMutation();
    const [taskName, setTaskName] = useState('');
    const [assignTo, setAssignTo] = useState('');
    const [projectId, setProjectId] = useState('');
    const [deadline, setDeadline] = useState('');
    const [isEdit] = useState(id !== undefined);

    const {
        data: projectsList
    } = useGetProjectsQuery();

    const {
        data: teamMembersList
    } = useGetTeamsQuery();

    const {
        data: taskData
    } = useGetTaskQuery(Number(id), {
        skip: !isEdit
    });


    useEffect(() => {
        if (isAddTaskSuccess || isEditTaskSuccess) {
            navigate('/');
        }
    }, [isAddTaskSuccess, isEditTaskSuccess, navigate])


    useEffect(() => {
        if (isEdit) {
            setTaskName(taskData?.taskName);
            setAssignTo(taskData?.teamMember.id);
            setProjectId(taskData?.project.id);
            setDeadline(taskData?.deadline);
        }
    }, [isEdit, taskData])

    const submitHandler = (e) => {
        e.preventDefault();
        const teamMember = teamMembersList?.find(teamMember => teamMember.id == assignTo);
        const project = projectsList?.find(project => project.id == projectId);
        const data = {
            taskName,
            teamMember,
            project,
            deadline,
            status: 'pending'
        }
        if (!isEdit) {
            addTask(data);
        } else {
            data['status'] = taskData?.status;
            editTask({
                id: id, data
            })
        }

    }


    return (
        <div className="container relative">
            <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
                <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
                    {isEdit ? 'Edit' : 'Create'} Task for Your Team
                </h1>

                <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div className="fieldContainer">
                            <label htmlFor="lws-taskName">Task Name</label>
                            <input
                                type="text"
                                name="taskName"
                                id="lws-taskName"
                                onChange={(e) => setTaskName(e.target.value)}
                                value={taskName}
                                required
                                placeholder="Implement RTK Query"
                            />
                        </div>

                        <div className="fieldContainer">
                            <label>Assign To</label>
                            <select onChange={(e) => setAssignTo(e.target.value)} value={assignTo} name="teamMember"
                                    id="lws-teamMember"
                                    required>
                                <option value="" hidden>Select Job</option>
                                {teamMembersList?.map((teamMember) => (
                                    <option key={teamMember?.id} value={teamMember?.id}>{teamMember?.name}</option>))}
                            </select>
                        </div>
                        <div className="fieldContainer">
                            <label htmlFor="lws-projectName">Project Name</label>
                            <select id="lws-projectName" onChange={(e) => setProjectId(e.target.value)}
                                    value={projectId} name="projectName" required>
                                <option value="" hidden>Select Project</option>
                                {projectsList?.map((project) => (
                                    <option key={project?.id}
                                            value={project?.id}>{project?.projectName}</option>))}
                            </select>
                        </div>

                        <div className="fieldContainer">
                            <label htmlFor="lws-deadline">Deadline</label>
                            <input onChange={(e) => setDeadline(e.target.value)} value={deadline} type="date"
                                   name="deadline" id="lws-deadline" required/>
                        </div>

                        <div className="text-right">
                            <button type="submit" className="lws-submit">{isEdit ? 'Edit' : 'Save'}</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AddEditPage;