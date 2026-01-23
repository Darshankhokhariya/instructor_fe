const Loader = ({ size = 48, show = true }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Blur Backdrop */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

            {/* Loader */}
            <div className="relative z-10 flex items-center justify-center">
                {/* Outer Loader */}
                <div
                    className="relative animate-spin rounded-full border-4 border-primary/30 border-t-primary"
                    style={{ width: size, height: size }}
                >
                    {/* Inner Loader */}
                    <div className="absolute inset-1/4 animate-spin-reverse rounded-full border-2 border-white/30 border-t-white" />
                </div>
            </div>
        </div>
    );
};

export default Loader;
