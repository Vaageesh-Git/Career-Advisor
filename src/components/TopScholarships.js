import React from "react";

export default function TopScholarships(){
    const arr = ["Scholarship....","Scholarship....","Scholarship....","Scholarship....","Scholarship....","Scholarship....","Scholarship....","Scholarship....","Scholarship...."]
    return (
        <>
        <h1>Top Scholarships</h1>
        <div className="top-scholarships">            
            {
            arr.map((sch,idx)=>
                <div className="top-scholarship-card" key={idx}>
                    <h2>{sch}</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, sapien nec.</p>
                    <button>Apply Now</button>
                </div>
            )
        }
        </div>
    </>
    )
}