import React from 'react';
import TeamMember from "./TeamMember";
import {useGetTeamsQuery} from "../../features/teams/teamsApi";
import Loading from "../ui/Loading";

const TeamMembersList = () => {
    const {
        data: teamMembersList, isLoading, isError, error,
    } = useGetTeamsQuery();

    // decide what to render
    let content = null;

    if (isLoading) content = <Loading/>;
    if (!isLoading && isError) {
        content = <div className="col-span-12">{error}</div>;
    }
    if (!isLoading && !isError && teamMembersList?.length === 0) {
        content = <div className="col-span-12">No team member found!</div>;
    }
    if (!isLoading && !isError && teamMembersList?.length > 0) {
        content = teamMembersList.map((teamMember, index) => (
            <TeamMember key={index} teamMember={teamMember}/>
        ));
    }

    return (
        <div className="mt-8">
            <h3 className="text-xl font-bold">Team Members</h3>
            <div className="mt-3 space-y-4">
                {content}
            </div>
        </div>
    );
};

export default TeamMembersList;