"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import "@/app/styles.css";
import { Button } from "react-aria-components";

interface ProfileData {
    fullName: string;
    contact: string;
    age: number;
    gender: string;
    birthdate: string;
    previousMedicalHistory?: string;
    familyHistory?: string;
    addiction?: string;
    address?: string;
}

const ProfileUpdatePage = () => {
    const [formData, setFormData] = useState<ProfileData>({
        fullName: "",
        contact: "",
        age: 0,
        gender: "",
        birthdate: "",
        previousMedicalHistory: "",
        familyHistory: "",
        addiction: "",
        address: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState<boolean | false>(false);
    const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");
        setSuccessMessage("");

        const dataToSubmit = {
            ...formData,
            age: parseInt(formData.age.toString(), 10),
        };

        try {
            setLoading(true);
            const response = await axios.put(
                "/api/users/updateprofile",
                dataToSubmit,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                setSuccessMessage("Profile updated successfully!");
                router.push("/profile");
            }
        } catch (err) {
            setLoading(false);
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.error || "An error occurred");
            } else {
                setError("An error occurred");
            }
            setFormData({
                fullName: "",
                contact: "",
                age: 0,
                gender: "",
                birthdate: "",
                previousMedicalHistory: "",
                familyHistory: "",
                addiction: "",
                address: "",
            });
        }
    };

    return (
        <div className="w-screen overflow-x-hidden flex justify-around items-center px-4 md:px-20 pt-10">
            <div className="w-screen absolute md:w-[60vw] ml-56 md:absolute">
                <img src="/svgs/profiling.svg" alt="image" className="size-[40rem]" />
            </div>
            <div className="w-screen bg-gray-100/50 md:px-10 md:w-[70vw] my-10 py-5 backdrop-blur-sm">
                <h1 className="text-3xl font-semibold text-center text-gray-900 mb-8 mt-4">
                    Update Your Profile
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div className="flex flex-col">
                        <Label
                            htmlFor="fullName"
                            className="text-sm font-medium text-gray-700"
                        >
                            Full Name
                        </Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                            className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Full Name"
                            style={
                                {
                                    "--ring": "234 89% 74%",
                                } as React.CSSProperties
                            }
                        />
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col">
                        <Label
                            htmlFor="contact"
                            className="text-sm font-medium text-gray-700"
                        >
                            Contact
                        </Label>
                        <Input
                            id="contact"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            required
                            placeholder="Enter your contact number"
                            className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Contact"
                            style={
                                {
                                    "--ring": "234 89% 74%",
                                } as React.CSSProperties
                            }
                        />
                    </div>

                    {/* Age */}
                    <div className="flex flex-col">
                        <Label
                            htmlFor="age"
                            className="text-sm font-medium text-gray-700"
                        >
                            Age
                        </Label>
                        <Input
                            type="number"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                            placeholder="Enter your age"
                            className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Age"
                            style={
                                {
                                    "--ring": "234 89% 74%",
                                } as React.CSSProperties
                            }
                        />
                    </div>

                    {/* Gender */}
                    <div className="flex flex-col">
                        <Label
                            htmlFor="gender"
                            className="text-sm font-medium text-gray-700"
                        >
                            Gender
                        </Label>
                        <Input
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            placeholder="Enter your gender (e.g., Male, Female)"
                            className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Gender"
                            style={
                                {
                                    "--ring": "234 89% 74%",
                                } as React.CSSProperties
                            }
                        />
                    </div>

                    {/* Birthdate */}
                    <div className="flex flex-col">
                        <Label
                            htmlFor="birthdate"
                            className="text-sm font-medium text-gray-700"
                        >
                            Birthdate
                        </Label>
                        <Input
                            type="date"
                            id="birthdate"
                            name="birthdate"
                            value={formData.birthdate}
                            onChange={handleChange}
                            required
                            className="mt-2 p-3 border  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Birthdate"
                            style={
                                {
                                    "--ring": "234 89% 74%",
                                } as React.CSSProperties
                            }
                        />
                    </div>

                    {/* Previous Medical History */}
                    <div className="flex flex-col">
                        <Label
                            htmlFor="previousMedicalHistory"
                            className="text-sm font-medium text-gray-700"
                        >
                            Previous Medical History
                        </Label>
                        <Textarea
                            id="previousMedicalHistory"
                            name="previousMedicalHistory"
                            value={formData.previousMedicalHistory || ""}
                            onChange={handleChange}
                            placeholder="Any previous medical history? (Optional)"
                            className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Previous Medical History"
                            style={
                                {
                                    "--ring": "234 89% 74%",
                                } as React.CSSProperties
                            }
                        />
                    </div>

                    {/* Family History */}
                    <div className="flex flex-col">
                        <Label
                            htmlFor="familyHistory"
                            className="text-sm font-medium text-gray-700"
                        >
                            Family History
                        </Label>
                        <Textarea
                            id="familyHistory"
                            name="familyHistory"
                            value={formData.familyHistory || ""}
                            onChange={handleChange}
                            placeholder="Any family medical history? (Optional)"
                            className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Family History"
                            style={
                                {
                                    "--ring": "234 89% 74%",
                                } as React.CSSProperties
                            }
                        />
                    </div>

                    {/* Addiction */}
                    <div className="flex flex-col">
                        <Label
                            htmlFor="addiction"
                            className="text-sm font-medium text-gray-700"
                        >
                            Addiction
                        </Label>
                        <Textarea
                            id="addiction"
                            name="addiction"
                            value={formData.addiction || ""}
                            onChange={handleChange}
                            placeholder="Alcohol, Smoking, or None"
                            className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Addiction"
                            style={
                                {
                                    "--ring": "234 89% 74%",
                                } as React.CSSProperties
                            }
                        />
                    </div>

                    {/* Address */}
                    <div className="flex flex-col">
                        <Label
                            htmlFor="address"
                            className="text-sm font-medium text-gray-700"
                        >
                            Address
                        </Label>
                        <Textarea
                            id="address"
                            name="address"
                            value={formData.address || ""}
                            onChange={handleChange}
                            placeholder="Enter your address"
                            className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Address"
                            style={
                                {
                                    "--ring": "234 89% 74%",
                                } as React.CSSProperties
                            }
                        />
                    </div>

                    {error && (
                        <div className="text-red-600 text-sm mb-4">{error}</div>
                    )}
                    {successMessage && (
                        <div className="text-green-600 text-sm mb-4">
                            {successMessage}
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex flex-col">
                        <Button
                            type="submit"
                            className="w-[15rem] py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 mx-auto mt-5 mb-5"
                        >
                            {loading ? (
                                <div className="loader mx-auto"></div>
                            ) : (
                                <div className="mx-auto">Update Profile</div>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileUpdatePage;
