import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ThankYou = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Add fade-in animation observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        // Observe all elements with fade-in class
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-[#eeeeee]">
            <Header />
            <main className="flex-grow flex items-center justify-center py-20 px-4">
                <div className="max-w-2xl w-full text-center fade-in">
                    <div className="card-professional flex flex-col items-center py-16 px-8">
                        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mb-8">
                            <CheckCircle className="h-10 w-10 text-success" />
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                            Thank You!
                        </h1>

                        <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-lg">
                            Your message has been received successfully. We appreciate you reaching out
                            to EW CPA Tax & Bookkeeping LLC. One of our experts will get back to you shortly.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Button
                                onClick={() => navigate("/")}
                                className="btn-professional h-12 px-8 flex items-center justify-center gap-2"
                            >
                                <Home className="h-4 w-4" />
                                Go Back Home
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() => navigate("/")}
                                className="h-12 px-8 border-accent text-accent hover:bg-accent/5"
                            >
                                Explore Services
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ThankYou;
