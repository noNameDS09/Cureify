"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { doLogout } from "../actions";

interface UserProfile {
    fullName: string;
    contact: string;
    email: string;
    age: number;
    gender: string;
    birthdate: string;
    previousMedicalHistory: string | null;
    familyHistory: string | null;
    addiction: string | null;
    address: string | null;
}

const ProfilePage = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<boolean | null>(false);
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get("/api/users/profile");

                console.log(response)
                setProfile(response.data);
                console.log(profile);
            } catch (err) {
                console.log("Error fetching profile:", err);
                setError(true)
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col gap-y-3 justify-center items-center h-screen text-center">
                <p className="text-red-500">Failed to fetch error. <br /> Make sure you are logged in.</p>
                
                <button onClick={() => {router.push("/login")}} className="text-blue-500 underline">
                    Login 
                </button>
                <div className="bg-white">
                <form action={doLogout}>
                <button 
                type="submit"
                >
                    Logout
                </button>

                </form>
            </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>No profile data found.</p>
            </div>
        );
    }



    return (
        <div className="w-[70vw] flex flex-col justify-center items-center  bg-white py-8 mx-auto -z-20">
            {/* <section className="absolute left-0">
                <img src="/svgs/personalData.svg" alt="profileImage" className="hidden  md:block md:size-[35rem] lg:size-[45rem]"/>
            </section> */}
            <div className="bg-black">
                <form action={doLogout}>
                <button 
                type="submit"
                >
                    Logout
                </button>

                </form>
            </div>
            <section className="flex flex-col justify-center items-center p-6 w-full bg-gray-100/60 shadow-md rounded-lg backdrop-blur-sm z-10">
                <header className="w-full text-center pb-6">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Your Profile
                    </h1>
                    <p className="text-gray-600">
                        View and manage your personal information
                    </p>
                </header>

                <article className="w-full space-y-6">
                    <div className="flex flex-col md:flex-col gap-6">
                        <section className="flex-1 flex flex-col gap-4">
                            <h2 className="font-semibold text-gray-700">
                                Personal Information
                            </h2>
                            <dl className="space-y-3">
                                <div className="space-y-0 flex flex-col md:flex-row justify-between w-full gap-x-2">
                                    <div className="w-full md:w-[47%]">
                                        <dt className="font-medium text-gray-600">
                                            Full Name
                                        </dt>
                                        <dd className="text-gray-800 bg-white mb-1  py-2 rounded">
                                            &nbsp;
                                            {profile.fullName ||
                                                "xxxx xxxx xxxx"}
                                        </dd>
                                    </div>
                                    <div className="md:w-[50%] w-full ">
                                        <dt className="font-medium text-gray-600">
                                            Contact
                                        </dt>
                                        <dd className="text-gray-800 bg-white mb-1 py-2 rounded">
                                            &nbsp;
                                            {profile.contact || "xxxxxxxxxx"}
                                        </dd>
                                    </div>
                                </div>
                                <div className="space-y-0 flex flex-col md:flex-row justify-between w-full gap-x-2">
                                    <div className="w-[full] md:w-[47%]">
                                        <dt className="font-medium text-gray-600">
                                            Email
                                        </dt>
                                        <dd className="text-gray-800 bg-white py-2 rounded">
                                            &nbsp;
                                            {profile.email}
                                        </dd>
                                    </div>
                                    <div className="md:w-[50%] w-full ">
                                        <dt className="font-medium text-gray-600">
                                            Age
                                        </dt>
                                        <dd className="text-gray-800 bg-white mb-1  py-2 rounded">
                                            &nbsp;
                                            {profile.age || "xx"}
                                        </dd>
                                    </div>
                                </div>
                                <div className="space-y-0 flex flex-col md:flex-row justify-between w-full gap-x-2">
                                    <div className="w-[full] md:w-[47%]">
                                        <dt className="font-medium text-gray-600">
                                            Gender
                                        </dt>
                                        <dd className="text-gray-800 bg-white mb-1  py-2 rounded">
                                            &nbsp;
                                            {profile.gender || "NA"}
                                        </dd>
                                    </div>
                                    <div className="md:w-[50%] w-full ">
                                        <dt className="font-medium text-gray-600">
                                            Birthdate
                                        </dt>
                                        <dd className="text-gray-800 bg-white mb-1  py-2 rounded">
                                            &nbsp;
                                            {new Date(
                                                profile.birthdate
                                            ).toLocaleDateString()}
                                        </dd>
                                    </div>
                                </div>
                                <div>
                                    <dt className="font-medium text-gray-600">
                                        Address
                                    </dt>
                                    <dd className="text-gray-800 bg-white mb-1  py-2 rounded">
                                        &nbsp;
                                        {profile.address || "N/A"}
                                    </dd>
                                </div>
                            </dl>
                        </section>

                        <section className="flex-1 flex flex-col gap-4">
                            <h2 className="font-semibold text-gray-700">
                                Medical History
                            </h2>
                            <dl className="space-y-3">
                                <div>
                                    <dt className="font-medium text-gray-600">
                                        Previous Medical History
                                    </dt>
                                    <dd className="text-gray-800 bg-white mb-1  py-2 rounded">
                                        &nbsp;
                                        {profile.previousMedicalHistory ||
                                            "N/A"}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="font-medium text-gray-600">
                                        Family History
                                    </dt>
                                    <dd className="text-gray-800 bg-white mb-1  py-2 rounded">
                                        &nbsp;
                                        {profile.familyHistory || "N/A"}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="font-medium text-gray-600">
                                        Addiction
                                    </dt>
                                    <dd className="text-gray-800 bg-white mb-1  py-2 rounded">
                                        &nbsp;
                                        {profile.addiction || "N/A"}
                                    </dd>
                                </div>
                            </dl>
                        </section>
                    </div>
                </article>

                <footer className="w-full text-center pt-6">
                    <button
                        className="text-sm text-blue-600 hover:text-blue-800"
                        onClick={() => router.push("/updateprofile")}
                    >
                        Edit Profile
                    </button>
                </footer>
            </section>
        </div>
    );
};

export default ProfilePage;
