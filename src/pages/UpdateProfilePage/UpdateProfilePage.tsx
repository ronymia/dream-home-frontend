import { useState } from "react";
import "./UpdateProfilePage.scss";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { useUpdateProfileMutation } from "../../app/apis/userApi";
import ImageUpload from "../../components/uplaoder/ImageUploader";

function ProfileUpdatePage() {
  const { user } = useAppSelector((state) => state.auth);
  const [updateProfile, updateResult] = useUpdateProfileMutation();
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData);

    console.log(data);

    try {
      const result = await updateProfile({ ...data, id: user?.id }).unwrap();
      console.log(result);
      // navigate("/profile");
    } catch (err) {
      console.log(err);
      // setError(err);
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        {/* <h1>Update Profile</h1> */}
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              defaultValue={user?.firstName}
            />
          </div>
          <div className="item">
            <label htmlFor="middleName">Middle Name</label>
            <input
              id="middleName"
              name="middleName"
              type="text"
              defaultValue={user?.middleName}
            />
          </div>
          <div className="item">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              defaultValue={user?.lastName}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={user?.email}
            />
          </div>
          <div className="item">
            <label htmlFor="age">Age</label>
            <input id="age" name="age" type="number" defaultValue={user?.age} />
          </div>
          <div className="item gender">
            <span>Gender</span>
            <label htmlFor="gender">
              <input
                id="gender"
                name="gender"
                value={"male"}
                type="radio"
                defaultChecked={user?.gender}
              />
              <span>Male</span>
            </label>
            <label htmlFor="gender">
              <input
                id="gender"
                name="gender"
                value={"male"}
                type="radio"
                defaultChecked={user?.gender}
              />
              <span>Female</span>
            </label>
          </div>
          <div className="item">
            <label htmlFor="contactNo">Contact No</label>
            <input
              id="contactNo"
              name="contactNo"
              type="number"
              defaultValue={user?.contactNo}
            />
          </div>
          <div className="item">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              defaultValue={user?.address}
            />
          </div>
          {/* <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div> */}
          <button type="submit">Update</button>
          {error && <span>error</span>}
        </form>
      </div>
      <div className="sideContainer">
        <ImageUpload
          imageUrl={user?.image}
          onImageChange={(imageUrl) => setAvatar(imageUrl)}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
