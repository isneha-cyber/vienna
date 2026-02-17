// import InputError from '@/Components/InputError';
// import InputLabel from '@/Components/InputLabel';
// import PrimaryButton from '@/Components/PrimaryButton';
// import TextInput from '@/Components/TextInput';
// import GuestLayout from '@/Layouts/GuestLayout';
// import { Head, Link, useForm } from '@inertiajs/react';

// export default function Register() {
//     const { data, setData, post, processing, errors, reset } = useForm({
//         name: '',
//         email: '',
//         password: '',
//         password_confirmation: '',
//     });

//     const submit = (e) => {
//         e.preventDefault();

//         post(route('register'), {
//             onFinish: () => reset('password', 'password_confirmation'),
//         });
//     };

//     return (
//         <GuestLayout>
//             <Head title="Register" />

//             <form onSubmit={submit}>
//                 <div>
//                     <InputLabel htmlFor="name" value="Name" />

//                     <TextInput
//                         id="name"
//                         name="name"
//                         value={data.name}
//                         className="mt-1 block w-full"
//                         autoComplete="name"
//                         isFocused={true}
//                         onChange={(e) => setData('name', e.target.value)}
//                         required
//                     />

//                     <InputError message={errors.name} className="mt-2" />
//                 </div>

//                 <div className="mt-4">
//                     <InputLabel htmlFor="email" value="Email" />

//                     <TextInput
//                         id="email"
//                         type="email"
//                         name="email"
//                         value={data.email}
//                         className="mt-1 block w-full"
//                         autoComplete="username"
//                         onChange={(e) => setData('email', e.target.value)}
//                         required
//                     />

//                     <InputError message={errors.email} className="mt-2" />
//                 </div>

//                 <div className="mt-4">
//                     <InputLabel htmlFor="password" value="Password" />

//                     <TextInput
//                         id="password"
//                         type="password"
//                         name="password"
//                         value={data.password}
//                         className="mt-1 block w-full"
//                         autoComplete="new-password"
//                         onChange={(e) => setData('password', e.target.value)}
//                         required
//                     />

//                     <InputError message={errors.password} className="mt-2" />
//                 </div>

//                 <div className="mt-4">
//                     <InputLabel
//                         htmlFor="password_confirmation"
//                         value="Confirm Password"
//                     />

//                     <TextInput
//                         id="password_confirmation"
//                         type="password"
//                         name="password_confirmation"
//                         value={data.password_confirmation}
//                         className="mt-1 block w-full"
//                         autoComplete="new-password"
//                         onChange={(e) =>
//                             setData('password_confirmation', e.target.value)
//                         }
//                         required
//                     />

//                     <InputError
//                         message={errors.password_confirmation}
//                         className="mt-2"
//                     />
//                 </div>

//                 <div className="mt-4 flex items-center justify-end">
//                     <Link
//                         href={route('login')}
//                         className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                     >
//                         Already registered?
//                     </Link>

//                     <PrimaryButton className="ms-4" disabled={processing}>
//                         Register
//                     </PrimaryButton>
//                 </div>
//             </form>
//         </GuestLayout>
//     );
// }


import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            {/* Full-screen centered wrapper */}
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

                {/* Card container — wider for register to fit more fields comfortably */}
                <div className="flex w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl">

                    {/* ── LEFT PANEL: Illustrated Welcome ── */}
                    <div
                        className="hidden md:flex flex-col justify-end w-5/12 relative bg-[#0d1f3c]"
                        style={{ minHeight: '540px' }}
                    >
                        {/* Background atmosphere */}
                        <div className="absolute inset-0 overflow-hidden">
                            {/* Sky gradient */}
                            <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d2240] to-[#102a4c]" />

                            {/* Stars */}
                            {[...Array(30)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute rounded-full bg-white opacity-70"
                                    style={{
                                        width: `${Math.random() * 2 + 1}px`,
                                        height: `${Math.random() * 2 + 1}px`,
                                        top: `${Math.random() * 50}%`,
                                        left: `${Math.random() * 100}%`,
                                    }}
                                />
                            ))}

                            {/* Illustrated landscape */}
                            <svg
                                className="absolute bottom-0 left-0 w-full"
                                viewBox="0 0 260 320"
                                preserveAspectRatio="xMidYMax slice"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Far mountains */}
                                <path
                                    d="M0 190 Q30 110 70 140 Q100 90 130 120 Q160 70 190 108 Q220 78 260 128 L260 320 L0 320Z"
                                    fill="#0b2040"
                                />
                                {/* Mid hills */}
                                <path
                                    d="M0 230 Q40 170 80 200 Q110 160 150 185 Q185 155 220 180 Q240 165 260 175 L260 320 L0 320Z"
                                    fill="#0e2a50"
                                />
                                {/* Foreground */}
                                <path
                                    d="M0 270 Q50 240 100 255 Q150 230 200 250 Q230 238 260 245 L260 320 L0 320Z"
                                    fill="#122f5a"
                                />

                                {/* Pagoda / temple */}
                                <g transform="translate(140,122)">
                                    <polygon points="-18,0 0,-14 18,0" fill="#c9a227" opacity="0.95"/>
                                    <polygon points="-14,4 0,-8 14,4" fill="#e2b84b" opacity="0.9"/>
                                    <rect x="-10" y="4" width="20" height="14" fill="#c9a227" opacity="0.85"/>
                                    <rect x="-3" y="11" width="6" height="7" fill="#0e2a50"/>
                                    <line x1="0" y1="-14" x2="0" y2="-20" stroke="#e2b84b" strokeWidth="1.5"/>
                                </g>

                                {/* Trees */}
                                {[20, 45, 60, 175, 195, 215, 235].map((x, i) => (
                                    <g key={i} transform={`translate(${x}, ${208 + (i % 3) * 10})`}>
                                        <polygon
                                            points={`0,-${28 + (i % 2) * 8} ${-(10 + i % 4)},0 ${10 + i % 4},0`}
                                            fill={i % 2 === 0 ? '#0a2548' : '#0c2e56'}
                                        />
                                    </g>
                                ))}

                                {/* Flower bushes */}
                                {[
                                    { cx: 30, cy: 270, r: 6, color: '#f5a623' },
                                    { cx: 50, cy: 275, r: 5, color: '#f7c948' },
                                    { cx: 70, cy: 268, r: 7, color: '#f5a623' },
                                    { cx: 175, cy: 265, r: 5, color: '#4fc3a1' },
                                    { cx: 190, cy: 260, r: 6, color: '#5dd4b4' },
                                    { cx: 205, cy: 268, r: 4, color: '#4fc3a1' },
                                ].map((dot, i) => (
                                    <circle key={i} cx={dot.cx} cy={dot.cy} r={dot.r} fill={dot.color} opacity="0.85" />
                                ))}

                                {/* Moon glow reflection */}
                                <ellipse cx="130" cy="278" rx="18" ry="4" fill="#c9a227" opacity="0.18" />

                                {/* Ground foliage */}
                                <path
                                    d="M0 290 Q65 275 130 285 Q195 270 260 282 L260 320 L0 320Z"
                                    fill="#0a2440"
                                />
                            </svg>
                        </div>

                        {/* Panel text */}
                        <div className="relative z-10 p-8 pb-10">
                            <p
                                className="text-white tracking-[0.35em] text-sm font-light uppercase"
                                style={{ fontFamily: "'Georgia', serif", letterSpacing: '0.35em' }}
                            >
                                Join Us
                            </p>
                            <p className="text-blue-200 text-xs mt-1 opacity-70 tracking-wide">
                                Create your account today
                            </p>
                        </div>
                    </div>

                    {/* ── RIGHT PANEL: Registration Form ── */}
                    <div className="flex-1 bg-white flex flex-col justify-center px-8 py-10 md:px-12">

                        <h1
                            className="text-2xl font-semibold text-gray-800 mb-7"
                            style={{ fontFamily: "'Georgia', serif" }}
                        >
                            Create Account
                        </h1>

                        <form onSubmit={submit} className="space-y-5">

                            {/* Name */}
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="Full Name"
                                    className="text-gray-500 text-sm mb-1"
                                />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="w-full border-0 border-b border-gray-300 rounded-none px-0 py-1 text-sm text-gray-800 focus:ring-0 focus:border-[#1a2f5a] bg-transparent"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-1 text-xs" />
                            </div>

                            {/* Email */}
                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    value="Email"
                                    className="text-gray-500 text-sm mb-1"
                                />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="w-full border-0 border-b border-gray-300 rounded-none px-0 py-1 text-sm text-gray-800 focus:ring-0 focus:border-[#1a2f5a] bg-transparent"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-1 text-xs" />
                            </div>

                            {/* Password */}
                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                    className="text-gray-500 text-sm mb-1"
                                />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="w-full border-0 border-b border-gray-300 rounded-none px-0 py-1 text-sm text-gray-800 focus:ring-0 focus:border-[#1a2f5a] bg-transparent"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password} className="mt-1 text-xs" />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                    className="text-gray-500 text-sm mb-1"
                                />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="w-full border-0 border-b border-gray-300 rounded-none px-0 py-1 text-sm text-gray-800 focus:ring-0 focus:border-[#1a2f5a] bg-transparent"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password_confirmation} className="mt-1 text-xs" />
                            </div>

                            {/* Submit */}
                            <div className="pt-2">
                                <PrimaryButton
                                    className="w-full justify-center bg-[#1a2f5a] hover:bg-[#0d1f3c] text-white py-3 rounded-lg text-sm font-medium tracking-wide transition-colors"
                                    disabled={processing}
                                >
                                    Create Account
                                </PrimaryButton>
                            </div>
                        </form>

                        {/* Divider */}
                        <div className="my-5 flex items-center gap-3">
                            <div className="flex-1 h-px bg-gray-200" />
                            <span className="text-xs text-gray-400 uppercase tracking-wider">or</span>
                            <div className="flex-1 h-px bg-gray-200" />
                        </div>

                        {/* Already have account */}
                        <p className="text-center text-sm text-gray-500">
                            Already have an account?{' '}
                            <Link
                                href={route('login')}
                                className="text-[#1a3a6e] hover:text-[#0d2247] underline underline-offset-2 transition-colors"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}