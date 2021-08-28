import { useStyle } from 'hooks/useStyle';

function SvgLogo( props ) {
    const { logoAccentC1, logoAccentC2 } = useStyle( [ 'logoAccentC1', 'logoAccentC2' ] )

    const colors = {
        //c1: '#e8edfc',
        //c2: '#cad9fc',
        //c3: '#a4c2f7',
        //c4: '#7facfa',
        //c5: '#fff',
        //c6: '#428dff',
        //c7: '#e8edfc',
        c1: 'transparent',
        c2: logoAccentC2,
        c3: 'transparent',
        c4: logoAccentC2,
        c5: 'transparent',
        c6: logoAccentC1,
        c7: 'transparent'
    }
    return (
        <svg
            height="1em"
            viewBox="0 0 60 60"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            { ...props }
        >
            <g
                fillRule="nonzero"
                fill="none"
            >
                <path
                    d="M11 30c-.001 10.119 7.923 18.466 18.028 18.99.54.018.97.46.972 1V58a1.007 1.007 0 01-1.056 1 23.93 23.93 0 01-1.664-.128 1.782 1.782 0 01-1.54-1.5l-.63-3.853a23.667 23.667 0 01-8.26-3.432l-3.18 2.281a1.8 1.8 0 01-2.16-.02 31.04 31.04 0 01-2.01-1.831A26.376 26.376 0 017.67 48.5a1.8 1.8 0 01-.02-2.162l2.28-3.178a23.712 23.712 0 01-3.43-8.266l-3.85-.631a1.808 1.808 0 01-1.5-1.588 24.76 24.76 0 010-5.4c.1-.791.712-1.42 1.5-1.541l3.85-.63a23.712 23.712 0 013.43-8.266l-2.28-3.18a1.8 1.8 0 01.02-2.158c.57-.707 1.18-1.38 1.83-2.014a26.4 26.4 0 012.01-1.832 1.8 1.8 0 012.16-.02l3.18 2.282a23.688 23.688 0 018.26-3.433l.63-3.852a1.805 1.805 0 011.54-1.512A29.84 29.84 0 0128.947 1 1.006 1.006 0 0130 2v8.012c-.003.54-.432.982-.972 1C18.924 11.536 11 19.882 11 30z"
                    fill={ colors.c1 }
                />
                <path
                    d="M29.028 11.011c.54-.018.97-.46.972-1V2a1.006 1.006 0 00-1.053-1c-.562.023-1.118.063-1.667.118a1.717 1.717 0 00-.58.182c.19.184.298.436.3.7v8.012c-.003.54-.432.982-.972 1-10.106.524-18.03 8.87-18.03 18.99s7.924 18.465 18.03 18.989c.54.018.97.46.972 1V58a.989.989 0 01-.3.7c.18.091.375.15.575.173.548.062 1.1.1 1.664.128A1.007 1.007 0 0030 58v-8.014a1.006 1.006 0 00-.972-1c-10.106-.524-18.03-8.87-18.03-18.99s7.924-18.465 18.03-18.989z"
                    fill={ colors.c2 }
                />
                <path
                    d="M30 44.044a.918.918 0 01-.956.926c-7.9-.5-14.052-7.054-14.052-14.97s6.152-14.47 14.052-14.97a.918.918 0 01.956.926z"
                    fill={ colors.c3 }
                />
                <path
                    d="M29.044 15.03a15.01 15.01 0 00-2.271.335.932.932 0 01.227.591v28.088a.932.932 0 01-.227.591c.747.17 1.507.281 2.271.335a.918.918 0 00.956-.926V15.956a.918.918 0 00-.956-.926z"
                    fill={ colors.c4 }
                />
                <g
                    fill={ colors.c7 }
                    transform="translate(1)"
                >
                    <circle
                        cx={ 38 }
                        cy={ 5 }
                        r={ 2 }
                    />
                    <circle
                        cx={ 38 }
                        cy={ 55 }
                        r={ 2 }
                    />
                    <circle
                        cx={ 48 }
                        cy={ 45 }
                        r={ 2 }
                    />
                    <circle
                        cx={ 56 }
                        cy={ 30 }
                        r={ 2 }
                    />
                    <circle
                        cx={ 48 }
                        cy={ 15 }
                        r={ 2 }
                    />
                </g>
                <g fill={ colors.c5 }>
                    <path d="M25.11 53.517l.63 3.853c.092.571.45 1.064.965 1.328.018.009.038.014.057.022.163.078.338.13.518.151.548.062 1.1.1 1.664.128a.982.982 0 00.761-.3 1.818 1.818 0 01-.965-1.328l-.63-3.853a23.667 23.667 0 01-8.26-3.432l-1.36.976a23.648 23.648 0 006.62 2.455zM19.85 9.916a23.688 23.688 0 018.26-3.433l.63-3.853a1.83 1.83 0 01.96-1.33 1.009 1.009 0 00-.757-.3c-.562.023-1.118.063-1.667.118a1.712 1.712 0 00-.515.156c-.02.009-.042.015-.061.025a1.83 1.83 0 00-.964 1.33l-.63 3.853A23.65 23.65 0 0018.49 8.94zM2.65 34.263l3.85.631a23.712 23.712 0 003.43 8.266l-2.28 3.182a1.8 1.8 0 00.02 2.158 26.376 26.376 0 001.83 2.015 31.04 31.04 0 002.01 1.831 1.8 1.8 0 002.16.02l.473-.339c-.56-.483-1.11-.978-1.643-1.512a26.376 26.376 0 01-1.83-2.015 1.8 1.8 0 01-.02-2.162l2.28-3.182a23.712 23.712 0 01-3.43-8.262l-3.85-.631a1.808 1.808 0 01-1.505-1.588 24.76 24.76 0 01.005-5.4c.1-.791.712-1.42 1.5-1.541l3.85-.63a23.712 23.712 0 013.43-8.266l-2.28-3.182a1.8 1.8 0 01.02-2.162 23.074 23.074 0 011.83-2.009 26.744 26.744 0 011.642-1.512l-.472-.339a1.8 1.8 0 00-2.16.02c-.7.576-1.372 1.187-2.01 1.831-.65.635-1.26 1.308-1.83 2.015a1.8 1.8 0 00-.02 2.162l2.28 3.182a23.712 23.712 0 00-3.43 8.263l-3.85.63c-.788.12-1.4.75-1.5 1.541a24.76 24.76 0 000 5.4 1.808 1.808 0 001.5 1.585z" />
                </g>
                <g fill={ colors.c6 }>
                    <path d="M2.486 24.751a2.8 2.8 0 00-2.33 2.415 25.874 25.874 0 00-.006 5.619 2.818 2.818 0 002.338 2.465l3.182.521a24.579 24.579 0 003.053 7.357L6.85 45.744a2.806 2.806 0 00.044 3.389c.596.73 1.23 1.427 1.9 2.089a32.356 32.356 0 002.108 1.918c.984.757 2.35.773 3.352.039l2.629-1.886a24.574 24.574 0 007.35 3.054l.522 3.187a2.8 2.8 0 002.415 2.331c.57.064 1.149.109 1.732.133h.085c.521 0 1.022-.2 1.4-.56.393-.375.614-.895.613-1.438v-8.014a2.008 2.008 0 00-1.921-1.995c-9.571-.5-17.076-8.406-17.076-17.99S19.508 12.51 29.08 12.01a2.009 2.009 0 001.921-2V2a1.98 1.98 0 00-.614-1.439A1.969 1.969 0 0028.907 0c-.582.023-1.159.065-1.751.125a2.789 2.789 0 00-2.4 2.342l-.521 3.184a24.581 24.581 0 00-7.35 3.055l-2.629-1.882a2.8 2.8 0 00-3.377.054A27.225 27.225 0 008.8 8.767c-.68.665-1.32 1.37-1.918 2.11a2.8 2.8 0 00-.048 3.364l1.885 2.632a24.563 24.563 0 00-3.049 7.356zm4.993.558a22.654 22.654 0 013.286-7.918 1 1 0 00-.023-1.133l-2.281-3.185a.8.8 0 01-.015-.946 22.024 22.024 0 011.761-1.935 25.634 25.634 0 011.91-1.744.8.8 0 01.97 0l3.18 2.282a1 1 0 001.133.021 22.613 22.613 0 017.913-3.287 1 1 0 00.785-.818l.629-3.851a.793.793 0 01.654-.679A25.31 25.31 0 0129 2l-.022 8.011c-10.646.544-18.998 9.338-18.992 19.998.006 10.66 8.367 19.445 19.014 19.977L28.986 58a22.538 22.538 0 01-1.594-.123.785.785 0 01-.664-.668l-.63-3.853a1 1 0 00-.785-.818A22.62 22.62 0 0117.4 49.25a1 1 0 00-1.133.022l-3.183 2.284a.786.786 0 01-.931.025 30.996 30.996 0 01-1.946-1.773A25.238 25.238 0 018.464 47.9a.811.811 0 010-.972l2.279-3.182a1 1 0 00.022-1.133 22.641 22.641 0 01-3.286-7.917 1 1 0 00-.817-.785l-3.85-.631a.81.81 0 01-.673-.711 23.648 23.648 0 01.006-5.175.786.786 0 01.667-.666l3.849-.63a1 1 0 00.818-.789z" />
                    <path d="M57 27a3 3 0 00-2.816 2H31v-3h16a3 3 0 003-3v-5.184a3 3 0 10-2 0V23a1 1 0 01-1 1H31v-3h11a1 1 0 000-2H31v-2h6a3 3 0 003-3V7.816a3 3 0 10-2 0V14a1 1 0 01-1 1h-6.264a1.848 1.848 0 00-1.755-.968c-8.427.534-14.989 7.524-14.989 15.968s6.562 15.434 14.989 15.968h.117A1.844 1.844 0 0030.736 45H37a1 1 0 011 1v6.184a3 3 0 102 0V46a3 3 0 00-3-3h-6v-2h11a1 1 0 000-2H31v-3h16a1 1 0 011 1v5.184a3 3 0 102 0V37a3 3 0 00-3-3H31v-3h23.184A2.995 2.995 0 1057 27zm-8-13a1 1 0 110 2 1 1 0 010-2zM39 4a1 1 0 110 2 1 1 0 010-2zm0 52a1 1 0 110-2 1 1 0 010 2zm10-10a1 1 0 110-2 1 1 0 010 2zM16 30c.008-7.34 5.679-13.431 13-13.964v27.928C21.679 43.431 16.008 37.341 16 30zm41 1a1 1 0 110-2 1 1 0 010 2z" />
                </g>
            </g>
        </svg>
    );
}

export default SvgLogo;
