import React from "react";
import { Briefcase } from "lucide-react";

export default function JobCard(){
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
                    <h1>Marketting Specialist</h1>
                    <h4>Tech Innovation Ltd.</h4>
                    <p>ferfkekfjkjekfjekwjklf</p>
                    <button>Apply Now</button>
                </div>
                <div className="jobcard-image">

                </div>
            </div>
        </div>
    )
}