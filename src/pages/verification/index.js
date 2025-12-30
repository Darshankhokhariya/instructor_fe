"use client";
import { FiBell } from "react-icons/fi";
import { HiOutlineHourglass } from "react-icons/hi2";
import { MdOutlinePendingActions } from "react-icons/md";

export default function VerificationPage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col justify-center overflow-x-hidden">

            {/* Main Content */}
            <main className="flex  flex-col items-center justify-center w-full max-w-md mx-auto px-6 py-8">
                <div className="w-full mb-8">
                    <div
                        className="w-[300px] h-[300px] aspect-square  mx-auto rounded-full shadow-lg border-4 border-primary bg-center bg-cover"
                        style={{
                            backgroundImage:
                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDQgqjp31WiOfXfcSWCQ2IWZyDDBNg-j1L0xwHw1OwchJsvuIxR1_W3I8vjHAqUxe935KOcbz4qzl6vkEMu0W6WJvHmsfbG77rhacpS8SskAeCuzUmtIPpW1ybMUHX3zRWEcdgr4q2ZqT78IAMa5jMEIsxOf0u9WLpc8Gt-hhWcPYMSuoznBVQ3pX4rrC78199lomHlX5EjURxmGCpdwNk5vuHm7NUCQsdHymkovrevC45wwOQte_K_uHdkRss0GQK0sCkxL7l1BHLX")',
                        }}
                    />
                </div>
                <div className="mb-6">
                    <div className="flex items-center gap-2 h-8 px-4 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20">
                        <MdOutlinePendingActions className="text-primary text-sm" />
                        <p className="text-sm font-medium">Status: Pending Review</p>
                    </div>
                </div>
                <h1 className="text-[28px] font-bold text-center mb-4">
                    Your profile is under review
                </h1>
                <p className="text-gray-600  text-center mb-2">
                    Thanks for joining YOGALINK! We are verifying your instructor
                    credentials to ensure the highest quality for our community.
                    This usually takes 24–48 hours.
                </p>
            </main>
            {/* Footer */}
            <footer className="w-full max-w-md mx-auto px-6 pb-8 pt-2">
                <div className="flex flex-col gap-4">
                    <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 transition-all active:scale-[0.98] text-white font-semibold py-4 rounded-xl shadow-md shadow-primary/20">
                        <FiBell />
                        Notify me when ready
                    </button>

                    <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-text-main  transition-colors">
                        Questions?{" "}
                        <span className="underline underline-offset-2">
                            Contact Support
                        </span>
                    </button>
                </div>
            </footer>
        </div>
    );
}
