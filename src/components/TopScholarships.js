import React from "react";

export default function TopScholarships({scholarships}){

    return (
        <>
        <h1>Top Scholarships</h1>
        <div className="top-scholarships">            
            {
            scholarships.map((sch,idx)=>
                <div className="top-scholarship-card" key={idx}>
                    <h2>{sch.name}</h2>
                    <p>{sch.description}</p>
                    <button>Apply Now</button>
                </div>
                
            )
        }
        </div>
    </>
    )
}