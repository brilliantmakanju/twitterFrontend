"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import ImageUpload from "../../../components/ImageUpload";

const EditProfile = () => {
  const { data: session } = useSession([]);
  const [disabled, setDisabled] = useState(false);
  const [bio, setBio] = useState(session?.user.profiledata.bio);
  const [image, setImage] = useState(
    `https://res.cloudinary.com/animecastle/${session?.user.profiledata.image}`
  );
  const [fname, setFname] = useState(session?.user.profiledata.userfname);
  const [lname, setLname] = useState(session?.user.profiledata.userlname);
  const [username, setUsername] = useState(session?.user.profiledata.user);
  const [bgimage, setBgImage] = useState(
    `https://res.cloudinary.com/animecastle/${session?.user.profiledata.bgimage}`
  );

  if (!session) {
    redirect("/");
  }

  async function updateProfile(e) {
    e.preventDefault();
    setDisabled(true);

    const res = await fetch(
      "https://twitterapi-production-91d6.up.railway.app/auth/updateprofile",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Pwitter ${session?.user.tokenAccess}`,
        },
        body: JSON.stringify({
          bio: bio,
          fname: fname,
          lname: lname,
          image: image,
          bgimage: bgimage,
          username: username,
        }),
      }
    );
    const data = await res.json();

    if (data.code === "success") {
      toast.success("Profile Updated", {
        position: toast.POSITION.TOP_CENTER,
      });
      toast.success("User Logged out for changes to take effect", {
        position: toast.POSITION.TOP_CENTER,
      });

      // setInterval(signOut, 3000);
      setDisabled(false);
    } else {
      setDisabled(false);
      toast.error(data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  function imageUploads(e) {
    let file = e.target.files;
    let files = file[0];

    let reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = () => {
      setImage(reader.result);
    };
  }

  function imageBgUploads(e) {
    let file = e.target.files;
    let files = file[0];

    let reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = () => {
      setBgImage(reader.result);
    };
  }

  return (
    <>
      <main className="px-7 flex flex-col gap-4 py-7 justify-start items-start w-full overflow-y-scroll h-screen ">
        <h3 className="text-[43px] leading-[3rem] font-mono font-bold md:w-[80%] md:leading-[3.5rem] ">
          Edit your Profile
        </h3>
        {/* <img src={session?.user.profiledata.bgimage} alt="" /> */}
        <form
          onSubmit={(e) => updateProfile(e)}
          // encType={"multipart/form-data"}
          className="flex flex-col gap-5 w-full mb-[200px] "
        >
          <input
            // placeholder={placeholder}
            disabled={disabled}
            onChange={(e) => setFname(e.target.value)}
            type={"text"}
            required
            value={fname}
            placeholder="First Name"
            className="
                w-full
                p-4
                text-lg
                bg-[#F5F8FA] backdrop-blur-3xl  outline-none border-none rounded-md
                focus:border-sky-500
                focus:border-2
                transition
                disabled:bg-neutral-400
                disabled:opacity-70
                disabled:cursor-not-allowed
            "
          />
          <input
            disabled={disabled}
            onChange={(e) => setLname(e.target.value)}
            type={"text"}
            required
            value={lname}
            placeholder="Last Name"
            className="
          w-full
          p-4
          text-lg
          bg-[#F5F8FA] backdrop-blur-3xl  outline-none border-none rounded-md
          focus:border-sky-500
          focus:border-2
          transition
          disabled:bg-neutral-400
          disabled:opacity-70
          disabled:cursor-not-allowed
            "
          />
          <input
            disabled={disabled}
            onChange={(e) => setUsername(e.target.value)}
            type={"text"}
            required
            value={username}
            placeholder="Username"
            className="
          w-full
          placeholder:capitalize
          p-4
          text-lg
          bg-[#F5F8FA] backdrop-blur-3xl  outline-none border-none rounded-md
          focus:border-sky-500
          focus:border-2
          transition
          disabled:bg-neutral-400
          disabled:opacity-70
          disabled:cursor-not-allowed
          lowercase
            "
          />
          <textarea
            disabled={disabled}
            onChange={(e) => setBio(e.target.value)}
            type={"text"}
            required
            value={bio}
            className=" resize-none h-[140px] scroll-none px-3 py-2   break-words   flex items-start justify-start  w-full
          text-lg
          bg-[#F5F8FA] backdrop-blur-3xl  outline-none border-none rounded-md
          focus:border-sky-500
          focus:border-2
          transition
          disabled:bg-neutral-400
          disabled:opacity-70
          disabled:cursor-not-allowed  "
            placeholder="Bio"
            maxLength={280}
          />
          {/* <ImageUpload
            value={image}
            // type={"file"}
            disabled={disabled}
            onChange={(image) => setImage(image)}
            label="Upload profile image"
          />
          <ImageUpload
            value={bgimage}
            // type={"file"}
            disabled={disabled}
            onChange={(bgimage) => setBgImage(bgimage)}
            label="Upload cover image"
          /> */}
          {/* {image} */}
          {image ? (
            <>
              <div className="flex items-center justify-center">
                <Image
                  src={image}
                  height="100"
                  width="100"
                  alt="Uploaded image"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center"></div>
            </>
          )}
          <input
            type={"file"}
            accept="image/*"
            disabled={disabled}
            onChange={(e) => imageUploads(e)}
            className="w-full p-4  text-center border-2 border-dotted rounded-md border-neutral-700"
          />
          {bgimage ? (
            <>
              <div className="flex items-center justify-center">
                <Image
                  src={bgimage}
                  height="100"
                  width="100"
                  alt="Uploaded image"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center"></div>
            </>
          )}
          <input
            type={"file"}
            accept="image/*"
            disabled={disabled}
            onChange={(e) => imageBgUploads(e)}
            className="w-full p-4 text-center border-2 border-dotted rounded-md border-neutral-700"
          />
          <button
            disabled={disabled}
            className="w-[100%] flex justify-center items-center text-[white] font-bold transition duration-300 ease-in-out hover:bg-opacity-90  rounded-full bg-[#1DA1F2]  mt-3 h-[3rem] "
            type="submit"
          >
            Update
          </button>
        </form>
      </main>
    </>
  );
};

export default EditProfile;
