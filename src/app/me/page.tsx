'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label"; // Import Label component
import axios from "axios"; // Import Axios

interface UserProfile {
    fullName: string;
    contact: string;
    age: number;
    gender: string;
    birthdate: string;
    previousMedicalHistory: any | null;
    familyHistory: any | null;
    addiction: any | null;
    address: any | null;
}

const ProfileUpdatePage = () => {
    const [updatedProfile, setUpdatedProfile] = useState<UserProfile>({
        fullName: "",
        contact: "",
        age: 0,
        gender: "",
        birthdate: "",
        previousMedicalHistory: null,
        familyHistory: null,
        addiction: "none",
        address: null,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setUpdatedProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            console.log(updatedProfile)
            const response = await axios.put("/api/users/updateprofile",updatedProfile)
            console.log(response.data);

            if (response.status === 200) {
                alert("Profile updated successfully!");
                router.push("/profile"); // Redirect to profile page after successful update
            } else {
                alert(`Error: ${response.data.error}`);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("An error occurred while updating your profile.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="w-[70vw] flex flex-col justify-center items-center min-h-screen bg-white py-8 mx-auto">
            <section className="flex flex-col justify-center items-center p-6 w-full bg-gray-50 shadow-md rounded-lg">
                <header className="w-full text-center pb-6">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Update Your Profile
                    </h1>
                    <p className="text-gray-600">
                        Edit your personal and medical information
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="w-full space-y-6">
                    <div className="flex flex-col gap-6">
                        <section className="flex-1 flex flex-col gap-4">
                            <h2 className="font-semibold text-gray-700">
                                Personal Information
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <Label
                                        htmlFor="fullName"
                                        className="font-medium text-gray-600"
                                    >
                                        Full Name
                                    </Label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={updatedProfile.fullName}
                                        onChange={handleChange}
                                        className="w-full py-2 px-4 border rounded bg-gray-50"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor="contact"
                                        className="font-medium text-gray-600"
                                    >
                                        Contact
                                    </Label>
                                    <input
                                        type="text"
                                        id="contact"
                                        name="contact"
                                        value={updatedProfile.contact}
                                        onChange={handleChange}
                                        className="w-full py-2 px-4 border rounded bg-gray-50"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor="age"
                                        className="font-medium text-gray-600"
                                    >
                                        Age
                                    </Label>
                                    <input
                                        type="number"
                                        id="age"
                                        name="age"
                                        value={updatedProfile.age}
                                        onChange={handleChange}
                                        className="w-full py-2 px-4 border rounded bg-gray-50"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor="gender"
                                        className="font-medium text-gray-600"
                                    >
                                        Gender
                                    </Label>
                                    <input
                                        type="text"
                                        id="gender"
                                        name="gender"
                                        value={updatedProfile.gender}
                                        onChange={handleChange}
                                        className="w-full py-2 px-4 border rounded bg-gray-50"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="birthdate"
                                        className="font-medium text-gray-600"
                                    >
                                        Birthdate
                                    </label>
                                    <input
                                        type="date"
                                        id="birthdate"
                                        name="birthdate"
                                        value={updatedProfile.birthdate}
                                        onChange={handleChange}
                                        className="w-full py-2 px-4 border rounded bg-gray-50"
                                        required
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="flex-1 flex flex-col gap-4">
                            <h2 className="font-semibold text-gray-700">
                                Medical Information
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <Label
                                        htmlFor="previousMedicalHistory"
                                        className="font-medium text-gray-600"
                                    >
                                        Previous Medical History
                                    </Label>
                                    <textarea
                                        id="previousMedicalHistory"
                                        name="previousMedicalHistory"
                                        value={updatedProfile.previousMedicalHistory || ""}
                                        onChange={handleChange}
                                        className="w-full py-2 px-4 border rounded bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor="familyHistory"
                                        className="font-medium text-gray-600"
                                    >
                                        Family History
                                    </Label>
                                    <textarea
                                        id="familyHistory"
                                        name="familyHistory"
                                        value={updatedProfile.familyHistory || ""}
                                        onChange={handleChange}
                                        className="w-full py-2 px-4 border rounded bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor="addiction"
                                        className="font-medium text-gray-600"
                                    >
                                        Addiction
                                    </Label>
                                    <select
                                        id="addiction"
                                        name="addiction"
                                        value={updatedProfile.addiction}
                                        onChange={handleChange}
                                        className="w-full py-2 px-4 border rounded bg-gray-50"
                                    >
                                        <option value="none">None</option>
                                        <option value="smoking">Smoking</option>
                                        <option value="alcohol">Alcohol</option>
                                        <option value="smoking and alcohol">
                                            Smoking and Alcohol
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <Label
                                        htmlFor="address"
                                        className="font-medium text-gray-600"
                                    >
                                        Address
                                    </Label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        value={updatedProfile.address || ""}
                                        onChange={handleChange}
                                        className="w-full py-2 px-4 border rounded bg-gray-50"
                                    />
                                </div>
                            </div>
                        </section>
                    </div>

                    <footer className="w-full text-center pt-6">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Update Profile
                        </button>
                    </footer>
                </form>
            </section>
        </div>
    );
};

export default ProfileUpdatePage;
