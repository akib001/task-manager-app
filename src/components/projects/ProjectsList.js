import React from 'react';
import {useGetProjectsQuery} from "../../features/projects/projectsApi";
import Loading from "../ui/Loading";
import {useDispatch, useSelector} from "react-redux";
import {setCheckedProjects} from "../../features/projects/projectsSlice";

const ProjectsList = () => {
    const dispatch = useDispatch();
    const checkedProjects = useSelector(state => state.projects.checkedProjects) || [];

    const {
        data: projectsList, isLoading, isError, error,
    } = useGetProjectsQuery();

    const handleCheckItems = (event) => {
        const checkedValue = Number(event.target.value);
        const checkedProjectsArr = [...checkedProjects];
        const findIndex = checkedProjectsArr?.findIndex(id => id === checkedValue);
        if (findIndex === -1) {
            checkedProjectsArr.push(checkedValue)
        } else {
            checkedProjectsArr.splice(findIndex, 1);
        }
        dispatch(setCheckedProjects(checkedProjectsArr))

    }


    // decide what to render
    let content = null;

    if (isLoading) content = <Loading/>;
    if (!isLoading && isError) {
        content = <div className="col-span-12">{error}</div>;
    }
    if (!isLoading && !isError && projectsList?.length === 0) {
        content = <div className="col-span-12">No projects found!</div>;
    }
    if (!isLoading && !isError && projectsList?.length > 0) {
        content = projectsList.map((project) => (<div key={project?.id} className="checkbox-container">
                <input type="checkbox" value={project?.id} onChange={handleCheckItems}
                       className={`color-scoreboard ${project?.colorClass}`}
                       checked={checkedProjects?.includes(project?.id)}/>
                <p className="label">{project?.projectName}</p>
            </div>)
        );
    }

    return (<div>
        <h3 className="text-xl font-bold">Projects</h3>
        <div className="mt-3 space-y-4">
            {content}
        </div>
    </div>);
};

export default ProjectsList;