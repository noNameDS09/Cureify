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
}

const Page = () => {
    const id = useId();
    const [fields, setFields] = useState<Fields>({
        email: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const router = useRouter();

    const toggleVisibility = () => setIsVisible((prevState) => !prevState);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/users/login", fields);
            console.log(response.data);
            if (response) {
                router.refresh();
            }
        } catch (err) {
            setError("Login failed");
            setFields({ email: "", password: "" });
            console.error(err);
        }
    };

    useEffect(() => {
        // console.log(fields.email, fields.password);
    }, [fields]);

    return (
        <div className="relative flex flex-row justify-cneter md:justify-around items-center h-screen w-screen md:px-40 px-5">
            <div className="absolute -z-10 md:relative">
                <img
                    src="/svgs/Authentication.svg"
                    alt="authentication"
                    className="size-[35rem]"
                />
            </div>
            <span className="w-[80vh] absolute hidden md:block h-[1px] bg-zinc-400 rotate-90 rounded-full" />
            <div className="w-screen h-[30rem] md:w-[30rem] bg-gray-100/30 shadow-md flex justify-center items-center px-10 backdrop-blur-sm z-10">
                <form onSubmit={onSubmit} className="w-full">
                    <div className="text-center pb-7">
                        <span className="text-3xl font-semibold">Login</span>
                    </div>
                    <div className="space-y-3">
                        <div className="relative">
                            <Label htmlFor="email" className="ml-1">
                                Email{" "}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id={id}
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
                                id={id}
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
                        {error && (
                            <div className="text-red-500 text-sm">{error}</div>
                        )}
                    </div>
                    <div className="flex justify-center items-center">
                        <button
                            className="mt-8 w-fit px-5 py-[0.3rem] text-center text-foreground rounded-lg transition-colors bg-blue-400/90 hover:bg-blue-500/90"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                    <div className="flex flex-col mt-5 justify-center items-center text-center ">
                        <Button
                            className="w-[20rem] cursor-not-allowed"
                            variant="outline"
                            aria-label="Login with Google"
                            size="icon"
                            disabled
                        >
                            <RiGoogleFill
                                className="text-[#db5037] dark:text-primary"
                                size={20}
                                aria-hidden="true"
                            />{" "}
                            &nbsp; Login with Google
                        </Button>
                        <span className="mt-3 text-sm">
                            Don't have account?
                            <a
                                onClick={() => {
                                    router.push("/register");
                                }}
                                className="text-blue-500 text-sm hover:cursor-pointer"
                            >
                                {" "}
                                Register here
                            </a>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;
