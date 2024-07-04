import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { Card } from './ui/card';
import { CardContent } from './ui/card';
import Link from "next/link";
import Img from "./images/Social-Math_2880x1700_Lede.jpg";

const Home = () => {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleGetStarted = () => {
        if (user) {
            router.push('/dashboard');
        } else {
            router.push('/login');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container mx-auto px-4 md:px-6 space-y-8 lg:space-y-12">
                        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:gap-12">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                                    Welcome to MathTeachAI
                                </h1>
                                <p className="mt-4 max-w-[600px] text-muted-foreground md:text-xl lg:text-lg">
                                    This site helps you generate tests to identify your weak areas and get materials for studying them.
                                </p>
                                <div className="mt-6">
                                    <button
                                        onClick={handleGetStarted}
                                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 mb-4"
                                    >
                                        Try it now
                                    </button>
                                </div>
                            </div>
                            <div>
                                <img
                                    src={Img.src}
                                    width="600"
                                    height="400"
                                    alt="Hero"
                                    className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-gray-200 w-full py-12 md:py-24">
                    <div className="container mx-auto px-4 md:px-6 space-y-8 lg:space-y-12">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
                                <p className="max-w-[700px] text-muted-foreground md:text-xl lg:text-lg">
                                    Our test generator offers a range of powerful features to streamline your testing process.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
                            <Card className="bg-white">
                                <CardContent className="flex flex-col items-start gap-4">
                                    <FilePenIcon className="h-8 w-8 text-primary" />
                                    <h3 className="text-lg font-bold">Easy Test Creation</h3>
                                    <p className="text-muted-foreground">
                                        Intuitive interface makes it simple to build tests with multiple question types.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white">
                                <CardContent className="flex flex-col items-start gap-4">
                                    <LayoutTemplateIcon className="h-8 w-8 text-primary" />
                                    <h3 className="text-lg font-bold">Customizable Templates</h3>
                                    <p className="text-muted-foreground">
                                        Personalize the look and feel of your tests with our flexible templates.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white">
                                <CardContent className="flex flex-col items-start gap-4">
                                    <CheckIcon className="h-8 w-8 text-primary" />
                                    <h3 className="text-lg font-bold">Automatic Grading</h3>
                                    <p className="text-muted-foreground">
                                        Save time with our automatic grading feature that scores tests instantly.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-6 border-t">
                <p className="text-xs text-muted-foreground">&copy; 2024 Test Generator. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                        Terms of Service
                    </Link>
                    <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    );
};
// @ts-ignore
function CheckIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 6 9 17l-5-5" />
        </svg>
    );
}
// @ts-ignore
function FilePenIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
        </svg>
    );
}
// @ts-ignore
function LayoutTemplateIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="7" x="3" y="3" rx="1" />
            <rect width="9" height="7" x="3" y="14" rx="1" />
            <rect width="5" height="7" x="16" y="14" rx="1" />
        </svg>
    );
}

export default Home;
