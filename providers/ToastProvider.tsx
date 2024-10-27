'use client'



import {ToastContainer} from "react-toastify";
import {useTheme} from "next-themes";
import 'react-toastify/dist/ReactToastify.css';
export default function ToastProvider({children}:{children:React.ReactNode}) {
    const {theme} = useTheme()
    return (
        <>
            <ToastContainer
                className={'z-[999]'}
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={theme}
                toastClassName={'z-[999]'}

            />
            {children}
        </>
    );
};