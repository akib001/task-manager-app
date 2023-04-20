import React from 'react';
import ProjectsList from "../projects/ProjectsList";
import TeamMembersList from "../TeamMembers/TeamMembersList";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ProjectsList/>
            <TeamMembersList/>
        </div>
    );
};

export default Sidebar;