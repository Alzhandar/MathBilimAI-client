import React from 'react';
import Link from 'next/link';

const Dashboard = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-200">
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container mx-auto px-4 md:px-6 space-y-8 lg:space-y-12">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold mb-8">Главное меню</h1>
                            <p className="text-lg mb-8">
                                Welcome to your dashboard. Here you can access your tests, chat with the AI tutor, and review materials.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Link href="/tests" passHref>
                                <div className="bg-white text-black p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                                    <h2 className="text-2xl font-bold mb-4">Tests</h2>
                                    <p>Take tests to identify your weak areas and improve your skills.</p>
                                </div>
                            </Link>
                            <Link href="/chat" passHref>
                                <div className="bg-white text-black p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                                    <h2 className="text-2xl font-bold mb-4">Chat</h2>
                                    <p>Chat with the AI tutor to get help and clarify your doubts.</p>
                                </div>
                            </Link>
                            <Link href="/materials" passHref>
                                <div className="bg-white text-black p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                                    <h2 className="text-2xl font-bold mb-4">Materials</h2>
                                    <p>Review materials related to your test results and improve your knowledge.</p>
                                </div>
                            </Link>
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

export default Dashboard;
