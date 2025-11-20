import React from "react";

export default function TopScholarships({scholarships}){

    return (
        <>
        <h1>Top Scholarships</h1>
        <div className="top-scholarships">            
            {
            scholarships.map((sch,idx)=>
                <div key={idx} className="top-scholarship-card">
                    <div>
                        <h2>{sch.name}</h2>
                        <p>{sch.description}</p>
                    </div>
                    <button>Apply Now</button>
                </div>
            )
        }
        </div>
    </>
    )
}