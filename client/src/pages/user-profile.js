import React, { useEffect, useState } from "react";
import Header from "../components/Header_Signed_In/index";
import UserMenu from "../components/UserMenu/index";
import ProjectModal from "../components/ProjectsModal/index";
import BioModal from "../components/BioModal/index";
import axios from "axios";
const id = "603beda1b63b4d81b0f7f795";

function UserProfile() {
  const [projectTitle, setProjectTitle] = useState("");
  const [userdata, setUserdata] = useState({
    username: "Loading Username...",
    bio: "Loading Bio...",
    src: "https://www.placecage.com/300/300",
    projects: ["Loading Projects..."],
  });
  const [showModal, setShowModal] = useState(false);
  const [showBioModal, setShowBioModal] = useState(false);
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };
  const toggleBioModal = () => {
    setShowBioModal((prev) => !prev);
  };

  useEffect(() => {
    axios.get("/api/recruitee/" + id).then((response) => {
      console.log(response.data);
      setUserdata({ ...userdata, ...response.data });
      setProjectTitle("");
    });
  }, []);

  const handleSubmit = () => {
    console.log(projectTitle);
  };

  return (
    <div
      className="userProfile"
      id="background"
      style={{ backgroundColor: "red", minHeight: "100vh" }}
    >
      <Header />
      {/* <UserTitle position="center" title={userdata.username} /> */}
      <UserMenu
        position="center"
        src={userdata.src}
        bioDes={userdata.bio}
        option={userdata.projects}
        id={userdata.id}
        projectTitle={projectTitle}
        title={userdata.username}
        onClick={toggleModal}
        onClickBio={toggleBioModal}
        onClickProjects={toggleModal}
      />
      <div className="column"></div>
      {/* <CRUDMenu /> */}
      <ProjectModal
        showModal={showModal}
        setShowModal={toggleModal}
        setProjectTitle={setProjectTitle}
        handleSubmit={handleSubmit}
        modalTitle={"Add your project"}
      />
      <BioModal
        showModal={showBioModal}
        setShowModal={toggleBioModal}
        modalTitle={"Add your Bio"}
      />
      <div className="container is-widescreen"></div>
    </div>
  );
}

export default UserProfile;
