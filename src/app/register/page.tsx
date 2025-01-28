"use client";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { useRouter } from "next/navigation";
import { RiGoogleFill } from "@remixicon/react";
import { Button } from "@/components/ui/button";

interface Fields {
    email: string;
    password: string;
    confirmPassword: string;
}

const Page = () => {
    const id = useId();
    const [fields, setFields] = useState<Fields>({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isVisible2, setIsVisible2] = useState<boolean>(false);
    const router = useRouter();

    const toggleVisibility = () => setIsVisible((prevState) => !prevState);
    const toggleVisibility2 = () => setIsVisible2((prevState) => !prevState);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // console.log(fields);
        try {
            const response = await axios.post("/api/users/register", fields);
            
            console.log(response);
            if (response) {
                router.push("/login");
            }
        } catch (err) {
            setError(`Registration failed ${err}`);
            setFields({ email: "", password: "", confirmPassword: "" });
            console.error(err);
        }
    };

    useEffect(() => {
        // console.log(fields.email, fields.password, fields.confirmPassword);
    }, [fields]);

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="w-[25rem] h-[30rem] md:w-[30rem] bg-gray-100/20 shadow-md flex justify-center items-center px-10">
                <form  className="w-full">
                    <div className="text-center pb-7">
                        <span className="text-3xl font-semibold">Register</span>
                    </div>
                    <div className="space-y-3">
                        <div className="relative">
                            <Label htmlFor="email" className="ml-1">
                                Email{" "}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="email"
                                placeholder="Email"
                                type="email"
                                value={fields.email}
                                onChange={(e) =>
                                    setFields({
                                        ...fields,
                                        email: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="relative">
                            <Label htmlFor="password" className="ml-1">
                                Password{" "}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="password"
                                className="pe-9"
                                placeholder="Password"
                                type={isVisible ? "text" : "password"}
                                value={fields.password}
                                onChange={(e) =>
                                    setFields({
                                        ...fields,
                                        password: e.target.value,
                                    })
                                }
                                required
                            />
                            <button
                                className="absolute inset-y-3 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80"
                                type="button"
                                onClick={toggleVisibility}
                                aria-label={
                                    isVisible
                                        ? "Hide password"
                                        : "Show password"
                                }
                                aria-pressed={isVisible}
                            >
                                {isVisible ? (
                                    <EyeOff size={16} />
                                ) : (
                                    <Eye size={16} />
                                )}
                            </button>
                        </div>
                        <div className="relative">
                            <Label htmlFor="confirmPassword" className="ml-1">
                                Confirm Password{" "}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="confirmpassword"
                                className="pe-9"
                                placeholder="Confirm password"
                                type={isVisible2 ? "text" : "password"}
                                value={fields.confirmPassword}
                                onChange={(e) =>
                                    setFields({
                                        ...fields,
                                        confirmPassword: e.target.value,
                                    })
                                }
                                required
                            />
                            <button
                                className="absolute inset-y-3 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80"
                                type="button"
                                onClick={toggleVisibility2}
                                aria-label={
                                    isVisible2
                                        ? "Hide password"
                                        : "Show password"
                                }
                                aria-pressed={isVisible2}
                            >
                                {isVisible2 ? (
                                    <EyeOff size={16} />
                                ) : (
                                    <Eye size={16} />
                                )}
                            </button>
                        </div>
                        {error && (
                            <div className="text-red-500 text-sm">{error}</div>
                        )}
                    </div>
                    <div className="flex justify-center items-center">
                        <button
                            className="mt-5 w-fit px-5 py-[0.3rem] text-center text-foreground rounded-lg transition-colors bg-blue-500/90 hover:bg-blue-600/90"
                            // type="submit"
                            onClick={onSubmit}
                        >
                            Submit
                        </button>
                    </div>
                    <div className="flex mt-5 justify-center items-center text-center">
                        <Button
                            className="w-[20rem]"
                            variant="outline"
                            aria-label="Login with Google"
                            size="icon"
                        >
                            <RiGoogleFill
                                className="text-[#db5037] dark:text-primary"
                                size={20}
                                aria-hidden="true"
                            />{" "}
                            &nbsp; Login with Google
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;
