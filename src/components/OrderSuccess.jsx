const OrderSuccess = () => {

    return (
        <main className="min-h-screen w-full bg-[#EDE9E1] text-[#181818] flex items-center justify-center px-8">

            <div className="w-full max-w-2xl text-center">

                {/* LABEL */}

                <span className="font-body text-xs tracking-[0.3em] text-[#77736C] uppercase">
                    Order confirmed
                </span>


                {/* TITLE */}

                <h1 className="font-heading text-7xl leading-none mt-8">
                    Thank you
                    <span className="text-[#A88B5A]">.</span>
                </h1>


                {/* DESCRIPTION */}

                <p className="font-body text-sm text-[#77736C] leading-7 max-w-md mx-auto mt-8">
                    Your Noir takeaway order has been successfully
                    received. We are preparing your dishes with care.
                </p>


                {/* DIVIDER */}

                <div className="w-full h-px bg-[#181818]/20 my-12" />


                {/* ORDER INFO */}

                <div className="flex flex-col items-center">

                    <span className="font-body text-[10px] tracking-[0.25em] text-[#77736C] uppercase">
                        Payment
                    </span>

                    <span className="font-body text-sm mt-3">
                        Successfully completed
                    </span>

                </div>


                {/* BACK BUTTON */}

                <a
                    href="/"
                    className="inline-flex items-center gap-4 mt-12 border border-[#181818]/30 px-8 py-4 font-body text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:bg-[#181818] hover:text-[#EDE9E1]"
                >
                    <span>
                        Back to Noir
                    </span>

                    <span className="transition-transform duration-500 group-hover:translate-x-2">
                        →
                    </span>
                </a>

            </div>

        </main>
    );
};

export default OrderSuccess;