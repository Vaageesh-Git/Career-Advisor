import React from "react";
import { Briefcase } from "lucide-react";

export default function JobCard({job}){
    return (
        <div className="jobcard-main">
            <div className="jobcard-header">
                <Briefcase size={28}/>
                <div className="jobtag-container">
                    <label className="jobtag">Full Time</label>
                </div>
            </div>
            <div className="jobcard-body">
                <div className="jobcard-content">
                    <h2>{job.role}</h2>
                    <h4>{job.company}</h4>
                    <p>{job.description}</p>

                    <button>Apply Now</button>
                </div>
                <div className="jobcard-image">
                    {/* image  */}
                </div>
            </div>
        </div>
    )
}