"use client";
import React,{useState,useEffect, use} from "react";
import Image from "next/image";
import { Edit, Mail, MapPin } from "lucide-react";
import ProgressChart from "@/components/ProgressChart";
import MenuBar from "@/components/MenuBar";
import { useDataContext } from "../context/aiDataContext";
import axios from "axios";
import Loader from "@/components/loader";
import { useQuestionAnswers } from "@/app/context/questionAnswersContext";
import { useAuth } from "../context/authContext";


export default function ProfilePage() {
  const {data,setData} = useDataContext();
  const [user, setUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const { setAnswers } = useQuestionAnswers();
  const { loggedIn, setLoggedIn } = useAuth();
  const [experiences, setExperiences] = useState([]);
  const [showExpModal, setShowExpModal] = useState(false);
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [desc, setDesc] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [editingExp, setEditingExp] = useState(null);

  const handleEmailInput = (e) => {
    setEmailInput(e.target.value)
  }

  const handleEdit = () => {
    setEditOpen(!editOpen)
  }

  const handleAccountDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmed){
      return;
    }

    try{
      const response = await axios.delete('/api/account-delete', {
        data: { email: user.email }
      });
      console.log(response)

      if (response?.status === 200){
        alert(response.data.message)
        await axios.post("/api/logout", {}, { withCredentials: true });
        setLoggedIn(false)
        setData(null)
        setAnswers({})

        setTimeout(() => {
          window.location.href = "/";
        }, 50);

      }


    } catch(err){
      console.log(err.response)
      alert("Internal Error")
    }
  }

  const handleAddExperience = async () => {
    const payload = {
      email: user.email,
      role,
      company,
      description: desc,
      startDate,
      endDate
    };

    await axios.post("/api/experience", payload);

    const expRes = await axios.get(`/api/experience?email=${user.email}`);
    setExperiences(expRes.data.experiences);

    setShowExpModal(false);
  };

  const openEditModal = (exp) => {
    setEditingExp(exp);
    setRole(exp.role);
    setCompany(exp.company);
    setDesc(exp.description);
    setStartDate(exp.startDate.slice(0, 10));
    setEndDate(exp.endDate ? exp.endDate.slice(0, 10) : "");
    setShowExpModal(true);
  };

  const handleUpdateExperience = async () => {
    const payload = {
      email: user.email,
      expId: editingExp.id,
      role,
      company,
      description: desc,
      startDate,
      endDate
    };

    await axios.patch("/api/experience", payload);

    const expRes = await axios.get(`/api/experience?email=${user.email}`);
    setExperiences(expRes.data.experiences);

    setEditingExp(null);
    setShowExpModal(false);
  };

  const handleDeleteExperience = async (expId) => {
    const confirmed = window.confirm("Delete this experience?");
    if (!confirmed) return;

    await axios.delete("/api/experience", {
      data: { email: user.email, expId }
    });

    const expRes = await axios.get(`/api/experience?email=${user.email}`);
    setExperiences(expRes.data.experiences);


    setEditingExp(null);
    setRole("");
    setCompany("");
    setDesc("");
    setStartDate("");
    setEndDate("");
    setShowExpModal(false);
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
      setLoggedIn(false)
      setData(null)
      setAnswers({})

      setTimeout(() => {
        window.location.href = "/";
      }, 50);

    } catch(err){
      console.error(err)
    }
  };

const handleEmailChnage = async () => {
  if (emailInput === "") {
    setEditOpen(false);
    return;
  }

  if (emailInput === user.email) {
    alert("New email cannot be the same as the old email.");
    return;
  }

  const data = {
    existingEmail: user.email,
    updatedEmail: emailInput
  };

  try {
    const response = await axios.patch("/api/profile-update", data);

      if (response.status === 200) {
        alert("Email updated successfully!");
        setUser(response.data.data)
        setEditOpen(false);
      } 
      else if (response.status === 409) {
        alert(response.data);
      }

  } catch (err) {
      alert(err.response?.data?.message || "Server Error");
    }
  };

  useEffect(() => {
    async function loadUser() {
      const res = await fetch("/api/profile");
      const data = await res.json();

      if (data.user) {
          setUser(data.user);

          const expRes = await axios.get(`/api/experience?email=${data.user.email}`);
          setExperiences(expRes.data.experiences);
      }
    }

    loadUser();
  }, []);

  if (!user || !data){
    return <Loader/>
  }

  return (
    <div className="profile-page-main">
      <MenuBar />
      <div className="profile-page">    

        <div className="profile-header">
          <div className="profile-avatar">
            <Image
              src="/profilePic.webp"
              alt="User Avatar"
              width={220}
              height={220}
            />
            <button className="edit-btn" onClick={handleEdit}>
              <Edit size={18} /> Edit
            </button>
          </div>
          <div className="profile-info">
            <h1>{user.name}</h1>
            <div className="profile-meta">
              <p><Mail size={16}/> 
              {
                editOpen ? 
                <>
                  <input placeholder="Enter New Email..." onChange={handleEmailInput}/>
                  <button onClick={handleEmailChnage}>DONE</button>
                </>
                : 
                user.email
              }
              </p>
              <p><MapPin size={16}/> {user.location}</p>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Skill Progress</h2>
          <ProgressChart progress={data.progressInsights}/>
          
        </div>

        <div className="profile-section">
          <h2>Core Skills</h2>
          <div className="skills-container">
            {data.progressInsights.skills.map((skill, i) => (
              <span key={i} className="skill-tag">{skill.name}</span>
            ))}
          </div>
        </div>

        {showExpModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h3>{editingExp ? "Edit Experience" : "Add Experience"}</h3>

              <input value={role} placeholder="Role" onChange={(e) => setRole(e.target.value)} />
              <input value={company} placeholder="Company" onChange={(e) => setCompany(e.target.value)} />
              <textarea value={desc} placeholder="Description" onChange={(e) => setDesc(e.target.value)} />

              <label>Start Date</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

              <label>End Date</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

              <div className="modal-buttons">
                {editingExp ? (
                  <button onClick={handleUpdateExperience}>Update</button>
                ) : (
                  <button onClick={handleAddExperience}>Save</button>
                )}

                <button
                  onClick={() => {
                    setShowExpModal(false);
                    setEditingExp(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}


        <div className="profile-section">
          <h2>Experience</h2>
          <button className="add-exp-btn" onClick={() => setShowExpModal(true)}>
            + Add Experience
          </button>

          <div className="experience-list">
            {experiences.map(exp => (
              <div key={exp.id} className="experience-card">
                <h3>{exp.role} @ {exp.company}</h3>
                <p>{exp.description}</p>
                <p>
                  {exp.startDate.slice(0, 10)} →{" "}
                  {exp.endDate ? exp.endDate.slice(0, 10) : "Present"}
                </p>

                <div className="exp-actions">
                  <button onClick={() => openEditModal(exp)}>Edit</button>
                  <button onClick={() => handleDeleteExperience(exp.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>


        <div className="profile-section achievements">
          <h2>Recent Achievements</h2>
          <ul>
            <li>🏆 Completed Advanced React Course</li>
            <li>💼 Secured Internship at TechNova</li>
            <li>📈 Improved problem-solving skills by 40%</li>
          </ul>
        </div>

        <div className="profile-ctas">
          <button onClick={handleLogout} className="signout-cta">Sign Out</button>
          <button className="signout-cta" onClick={handleAccountDelete}>Delete Your Account</button>
        </div>
      </div>
    </div>
  );
}
