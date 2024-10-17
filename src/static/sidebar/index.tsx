export interface SideMenuType {
    id: number;
    name: string;
    icon: React.ReactNode;
    link: string;
}

export const sideMenu: SideMenuType[] = [
    {
        id: 1,
        name: 'dashboard',
        icon: (
            <svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* <rect width="" height="" rx="10" fill="#EBE6FA" /> */}
                <path d="M12.7222 3.99912C12.3551 4.00992 11.9773 4.0504 11.5994 4.10708H11.5778C7.89906 4.70892 4.91935 7.60749 4.17172 11.2752C3.9477 12.3197 3.9612 13.294 4.10694 14.2548C4.11234 14.2575 4.10694 14.271 4.10694 14.2764C4.33366 15.8984 6.43889 16.6082 7.62646 15.4207C8.47664 14.5705 9.73438 14.5705 10.5846 15.4207C11.4348 16.2708 11.4348 17.5285 10.5846 18.3786C9.39701 19.5661 10.1068 21.6712 11.729 21.8979C11.7344 21.8979 11.7478 21.8925 11.7505 21.8979C12.7033 22.0437 13.6722 22.0518 14.7087 21.8332C14.7168 21.8332 14.7222 21.8332 14.7303 21.8332C18.409 21.1476 21.2997 18.0979 21.8988 14.4275V14.4059C22.6815 9.12695 18.822 4.5173 13.8018 4.04231C13.4428 4.00722 13.0893 3.98833 12.7222 3.99912ZM12.7438 5.38094C13.0569 5.37014 13.3673 5.37554 13.6722 5.40253C17.9529 5.79386 21.2079 9.69641 20.5385 14.2116C20.0338 17.3045 17.5534 19.9062 14.4712 20.4729H14.4496C13.567 20.6619 12.7519 20.6646 11.9233 20.5377C11.3565 20.4675 11.0947 19.8333 11.5562 19.3718C12.9165 18.0116 12.9165 15.8093 11.5562 14.4491C10.1959 13.0889 7.99352 13.0889 6.63322 14.4491C6.17169 14.9106 5.53742 14.6488 5.46725 14.082C5.34039 13.2535 5.34309 12.4384 5.53202 11.5559C6.16629 8.45493 8.70066 5.97199 11.7937 5.4673C12.1176 5.41872 12.4307 5.39173 12.7438 5.38094ZM11.621 6.78434C10.8572 6.78434 10.2391 7.40238 10.2391 8.16616C10.2391 8.92993 10.8572 9.54797 11.621 9.54797C12.3848 9.54797 13.0029 8.92993 13.0029 8.16616C13.0029 7.40238 12.3848 6.78434 11.621 6.78434ZM16.4576 8.16616C15.6938 8.16616 15.0757 8.78419 15.0757 9.54797C15.0757 10.3117 15.6938 10.9298 16.4576 10.9298C17.2214 10.9298 17.8395 10.3117 17.8395 9.54797C17.8395 8.78419 17.2214 8.16616 16.4576 8.16616ZM8.16626 9.54797C7.40244 9.54797 6.78436 10.166 6.78436 10.9298C6.78436 11.6936 7.40244 12.3116 8.16626 12.3116C8.93008 12.3116 9.54815 11.6936 9.54815 10.9298C9.54815 10.166 8.93008 9.54797 8.16626 9.54797ZM17.8395 13.0025C17.0757 13.0025 16.4576 13.6205 16.4576 14.3843C16.4576 15.1481 17.0757 15.7661 17.8395 15.7661C18.6033 15.7661 19.2214 15.1481 19.2214 14.3843C19.2214 13.6205 18.6033 13.0025 17.8395 13.0025ZM15.0757 16.457C14.3119 16.457 13.6938 17.0751 13.6938 17.8389C13.6938 18.6026 14.3119 19.2207 15.0757 19.2207C15.8395 19.2207 16.4576 18.6026 16.4576 17.8389C16.4576 17.0751 15.8395 16.457 15.0757 16.457Z" fill="#723EEB" />
            </svg>
        ),
        link: 'user/dashboard'
    },
    {
        id: 2,
        name: 'wallet',
        icon: (
            <svg width="14" height="12" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.92857 0.572266C0.871373 0.572266 0 1.44364 0 2.50084V11.5008C0 12.558 0.871373 13.4294 1.92857 13.4294H16.0714C17.1286 13.4294 18 12.558 18 11.5008V2.50084C18 1.44364 17.1286 0.572266 16.0714 0.572266H1.92857ZM1.92857 1.85798H16.0714C16.4355 1.85798 16.7143 2.13672 16.7143 2.50084V3.78655H1.92857V5.07227H16.7143V11.5008C16.7143 11.865 16.4355 12.1437 16.0714 12.1437H1.92857C1.56445 12.1437 1.28571 11.865 1.28571 11.5008V2.50084C1.28571 2.13672 1.56445 1.85798 1.92857 1.85798Z" fill="#723EEB" />
            </svg>
        ),
        link: 'user/wallet'
    },
    {
        id: 3,
        name: 'send money',
        icon: (
            <svg width="15" height="15" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 0.625V4.375H4.5V2.875H0V16.375H1.5V17.125C1.5 18.3584 2.5166 19.375 3.75 19.375C4.9834 19.375 6 18.3584 6 17.125V16.375H18V4.375H15V0.625H6ZM7.5 2.125H13.5V5.875H7.5V2.125ZM1.5 4.375H3V14.875H1.5V4.375ZM4.5 5.875H6V7.375H15V5.875H16.5V14.875H4.5V5.875ZM6.75 8.875V10.375H8.25V8.875H6.75ZM9.75 8.875V10.375H11.25V8.875H9.75ZM12.75 8.875V10.375H14.25V8.875H12.75ZM6.75 11.875V13.375H8.25V11.875H6.75ZM9.75 11.875V13.375H11.25V11.875H9.75ZM12.75 11.875V13.375H14.25V11.875H12.75ZM3 16.375H4.5V17.125C4.5 17.541 4.16602 17.875 3.75 17.875C3.33398 17.875 3 17.541 3 17.125V16.375Z" fill="#723EEB" />
            </svg>
        ),
        link: 'user/send-money'
    },
    {
        id: 4,
        name: 'transactions',
        icon: (
            <svg width="15" height="15" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.2266 0.000151859C14.1123 0.00308133 13.9922 0.0177302 13.875 0.0470265L1.6875 3.25794C0.703125 3.51575 0 4.41808 0 5.43761V15.75C0 16.9834 1.0166 18 2.25 18H15.75C16.9834 18 18 16.9834 18 15.75V6.0001C18 4.76671 16.9834 3.75012 15.75 3.75012H5.71875L14.25 1.50014V3.00013H15.75V1.50014C15.75 0.656396 15.0322 -0.0115668 14.2266 0.000151859ZM2.25 5.25011H15.75C16.1748 5.25011 16.5 5.5753 16.5 6.0001V15.75C16.5 16.1748 16.1748 16.5 15.75 16.5H2.25C1.8252 16.5 1.5 16.1748 1.5 15.75V6.0001C1.5 5.5753 1.8252 5.25011 2.25 5.25011ZM13.875 9.75007C13.2539 9.75007 12.75 10.254 12.75 10.8751C12.75 11.4961 13.2539 12.0001 13.875 12.0001C14.4961 12.0001 15 11.4961 15 10.8751C15 10.254 14.4961 9.75007 13.875 9.75007Z" fill="#723EEB" />
            </svg>
        ),
        link: 'user/transactions'
    },
    {
        id: 5,
        name: 'recipients',
        icon: (
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.8 0.599609C2.81953 0.599609 1.2 2.21914 1.2 4.19961C1.2 5.39023 1.78594 6.44961 2.68125 7.10586C1.09922 7.89102 0 9.51758 0 11.3996H1.2C1.2 9.40508 2.80547 7.79961 4.8 7.79961C6.79453 7.79961 8.4 9.40508 8.4 11.3996H9.6C9.6 9.40508 11.2055 7.79961 13.2 7.79961C15.1945 7.79961 16.8 9.40508 16.8 11.3996H18C18 9.51758 16.9008 7.89102 15.3188 7.10586C16.2141 6.44961 16.8 5.39023 16.8 4.19961C16.8 2.21914 15.1805 0.599609 13.2 0.599609C11.2195 0.599609 9.6 2.21914 9.6 4.19961C9.6 5.39023 10.1859 6.44961 11.0813 7.10586C10.207 7.53945 9.47344 8.22383 9 9.07461C8.52656 8.22383 7.79297 7.53945 6.91875 7.10586C7.81406 6.44961 8.4 5.39023 8.4 4.19961C8.4 2.21914 6.78047 0.599609 4.8 0.599609ZM4.8 1.79961C6.13359 1.79961 7.2 2.86602 7.2 4.19961C7.2 5.5332 6.13359 6.59961 4.8 6.59961C3.46641 6.59961 2.4 5.5332 2.4 4.19961C2.4 2.86602 3.46641 1.79961 4.8 1.79961ZM13.2 1.79961C14.5336 1.79961 15.6 2.86602 15.6 4.19961C15.6 5.5332 14.5336 6.59961 13.2 6.59961C11.8664 6.59961 10.8 5.5332 10.8 4.19961C10.8 2.86602 11.8664 1.79961 13.2 1.79961Z" fill="#723EEB" />
            </svg>
        ),
        link: 'user/recipients'
    },
    {
        id: 6,
        name: 'KYC',
        icon: (
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 0C3.57227 0 2 1.57227 2 3.5C2 4.70508 2.61523 5.77539 3.54688 6.40625C1.76367 7.17188 0.5 8.94141 0.5 11H1.5C1.5 8.78516 3.28516 7 5.5 7C7.71484 7 9.5 8.78516 9.5 11H10.5C10.5 8.94141 9.23633 7.17188 7.45312 6.40625C8.38477 5.77539 9 4.70508 9 3.5C9 1.57227 7.42773 0 5.5 0ZM5.5 1C6.88672 1 8 2.11328 8 3.5C8 4.88672 6.88672 6 5.5 6C4.11328 6 3 4.88672 3 3.5C3 2.11328 4.11328 1 5.5 1Z" fill="#723EEB" />
            </svg>
        ),
        link: 'user/kyc'
    },
    {
        id: 7,
        name: '2FA security',
        icon: (
            <svg width="12" height="12" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0V6.54545H1.63636V8.18182H3.27273V6.54545H6.54545V0H0ZM6.54545 6.54545V8.18182H8.18182V9.81818H4.90909V11.4545H0V18H6.54545V11.4545H11.4545V9.81818H9.81818V8.18182H13.0909V6.54545H14.7273V8.18182H16.3636V6.54545H18V0H11.4545V6.54545H6.54545ZM16.3636 8.18182V9.81818H18V8.18182H16.3636ZM16.3636 9.81818H14.7273V11.4545H16.3636V9.81818ZM16.3636 11.4545V13.0909H18V11.4545H16.3636ZM16.3636 13.0909H14.7273V11.4545H13.0909V13.0909H9V18H10.6364V14.7273H13.9091V16.3636H15.5455V14.7273H16.3636V13.0909ZM13.9091 16.3636H12.2727V18H13.9091V16.3636ZM14.7273 9.81818V8.18182H13.0909V9.81818H14.7273ZM4.90909 9.81818V8.18182H3.27273V9.81818H4.90909ZM1.63636 8.18182H0V9.81818H1.63636V8.18182ZM8.18182 0V3.27273H7.36364V4.90909H8.18182V5.72727H9.81818V3.27273H10.6364V1.63636H9.81818V0H8.18182ZM1.63636 1.63636H4.90909V4.90909H1.63636V1.63636ZM13.0909 1.63636H16.3636V4.90909H13.0909V1.63636ZM2.45455 2.45455V4.09091H4.09091V2.45455H2.45455ZM13.9091 2.45455V4.09091H15.5455V2.45455H13.9091ZM1.63636 13.0909H4.90909V16.3636H1.63636V13.0909ZM2.45455 13.9091V15.5455H4.09091V13.9091H2.45455ZM16.3636 16.3636V18H18V16.3636H16.3636Z" fill="#723EEB" />
            </svg>
        ),
        link: 'user/2fa-security'
    },
    // {
    //     id: 8,
    //     name: 'logout',
    //     icon: (
    //         <svg width="15" height="15" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    //             <path d="M8.9883 0.0117188C4.03186 0.0117188 0 4.04379 0 9.00048C0 13.9572 4.03186 17.9892 8.9883 17.9892C12.0224 17.9892 14.7113 16.4823 16.3381 14.1737L15.1209 13.3076C13.7663 15.2329 11.528 16.4911 8.9883 16.4911C4.84233 16.4911 1.49805 13.1467 1.49805 9.00048C1.49805 4.8543 4.84233 1.50985 8.9883 1.50985C11.528 1.50985 13.7633 2.76804 15.1209 4.69337L16.3381 3.82726C14.7113 1.51862 12.0224 0.0117188 8.9883 0.0117188ZM14.4889 5.46584L13.4122 6.54262L15.1209 8.25142H5.9922V9.74955H15.1209L13.4122 11.4583L14.4889 12.5351L17.485 9.53887L18 9.00048L17.485 8.46209L14.4889 5.46584Z" fill="#723EEB" />
    //         </svg>
    //     ),
    //     link: 'user/logout'
    // },
]